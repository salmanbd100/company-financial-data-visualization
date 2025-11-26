import { error } from '@sveltejs/kit';
import { PUBLIC_FMP_API_BASE_URL_V3 } from '$env/static/public';
import type { FMPSearchResult, SymbolResolution } from './types';

/**
 * Sanitize user input to prevent injection attacks
 * Allows only alphanumeric characters, spaces, dots, and hyphens
 */
function sanitizeInput(input: string): string {
	return input.replace(/[^a-zA-Z0-9\s.\-]/g, '').trim();
}

/**
 * Search for companies by name using FMP search API
 * @param query - Company name or partial name to search for
 * @param apiKey - FMP API key
 * @param fetch - Fetch function (allows SSR compatibility)
 * @returns Array of matching companies
 */
export async function searchCompany(
	query: string,
	apiKey: string,
	fetchFn: typeof fetch
): Promise<FMPSearchResult[]> {
	try {
		const url = `${PUBLIC_FMP_API_BASE_URL_V3}/search?query=${encodeURIComponent(query)}&limit=10&apikey=${apiKey}`;
		const response = await fetchFn(url);

		if (!response.ok) {
			console.error('Search API failed:', response.status, response.statusText);
			throw error(500, 'Failed to search for company');
		}

		const results: FMPSearchResult[] = await response.json();
		return results;
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) {
			throw e;
		}
		console.error('Search API error:', e);
		throw error(500, 'Service temporarily unavailable');
	}
}

/**
 * Resolve user input to a valid stock symbol
 * Implements two-phase resolution:
 * 1. Fast path: Try input as direct symbol (0ms overhead for valid symbols)
 * 2. Slow path: Search by company name if direct lookup fails
 *
 * @param input - User input (company name or stock symbol)
 * @param apiKey - FMP API key
 * @param fetchFn - Fetch function (allows SSR compatibility)
 * @returns Resolved symbol with metadata
 */
export async function resolveToSymbol(
	input: string,
	apiKey: string,
	fetchFn: typeof fetch
): Promise<SymbolResolution> {
	// Validate and sanitize input
	const sanitized = sanitizeInput(input);

	if (!sanitized || sanitized.length < 1) {
		throw error(400, 'Invalid search input');
	}

	if (sanitized.length > 50) {
		throw error(400, 'Search input too long');
	}

	const normalized = sanitized.toUpperCase();

	console.log('Resolving input:', normalized);

	// FAST PATH: Try as direct symbol first
	// This ensures existing symbol-based searches have zero overhead
	try {
		const quickCheckUrl = `${PUBLIC_FMP_API_BASE_URL_V3}/quote/${normalized}?apikey=${apiKey}`;
		const quickCheckResponse = await fetchFn(quickCheckUrl);

		if (quickCheckResponse.ok) {
			const data = await quickCheckResponse.json();

			// Check if we got valid data back
			if (data && Array.isArray(data) && data.length > 0) {
				console.log('Fast path: Using direct symbol:', normalized);
				return {
					symbol: normalized,
					wasResolved: false,
					originalInput: input
				};
			}
		}
	} catch (e) {
		// Fast path failed, fall through to search API
		console.log('Fast path failed, trying search API');
	}

	// SLOW PATH: Search by company name
	console.log('Searching for company:', normalized);

	const searchResults = await searchCompany(normalized, apiKey, fetchFn);

	if (!searchResults || searchResults.length === 0) {
		throw error(404, `No company found for "${input}"`);
	}

	// Prioritize US exchanges (NASDAQ, NYSE, AMEX) since they have better data coverage
	// especially for insider trading/ownership data
	const US_EXCHANGES = ['NASDAQ', 'NYSE', 'AMEX', 'NYSE ARCA', 'NYSE MKT'];

	const usResults = searchResults.filter(r =>
		US_EXCHANGES.includes(r.exchangeShortName)
	);

	// Pick first US exchange result if available, otherwise use first overall result
	const bestMatch = usResults.length > 0 ? usResults[0] : searchResults[0];

	// Log if multiple matches found
	if (searchResults.length > 1) {
		console.log(
			`Multiple matches found for "${input}":`,
			searchResults.map((r) => `${r.symbol} (${r.exchangeShortName})`).join(', ')
		);
		console.log(`Selected: ${bestMatch.symbol} (${bestMatch.exchangeShortName}) - ${bestMatch.name}`);
	}

	console.log(`Resolved "${input}" to ${bestMatch.symbol}`);

	return {
		symbol: bestMatch.symbol,
		wasResolved: true,
		originalInput: input
	};
}
