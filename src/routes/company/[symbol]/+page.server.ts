import { PUBLIC_FMP_API_KEY, PUBLIC_FMP_API_BASE_URL_V3, PUBLIC_FMP_API_BASE_URL_V4 } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolveToSymbol } from '$lib/api/fmp';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { symbol: rawInput } = params;
	const API_KEY = PUBLIC_FMP_API_KEY;
	const BASE_URL_V3 = PUBLIC_FMP_API_BASE_URL_V3;
	const BASE_URL_V4 = PUBLIC_FMP_API_BASE_URL_V4;

	console.log('Processing input:', rawInput);
	console.log('API Key available:', !!API_KEY);

	// Resolve input to symbol (handles both symbols and company names)
	const { symbol, wasResolved, originalInput } = await resolveToSymbol(rawInput, API_KEY, fetch);

	console.log(
		wasResolved
			? `Resolved "${originalInput}" to symbol: ${symbol}`
			: `Using direct symbol: ${symbol}`
	);

	try {
		// Fetch quote data for basic stats
		const quoteUrl = `${BASE_URL_V3}/quote/${symbol}?apikey=${API_KEY}`;
		console.log('Fetching quote from:', quoteUrl.replace(API_KEY, 'HIDDEN'));

		const quoteResponse = await fetch(quoteUrl);

		if (!quoteResponse.ok) {
			console.error('Quote fetch failed:', quoteResponse.status, quoteResponse.statusText);
			const errorText = await quoteResponse.text();
			console.error('Error response:', errorText);
			throw error(quoteResponse.status, `Failed to fetch quote: ${quoteResponse.statusText}`);
		}

		const quoteData = await quoteResponse.json();
		console.log('Quote data received:', quoteData.length, 'items');

		if (!quoteData || quoteData.length === 0) {
			throw error(404, 'Company not found');
		}

		const quote = quoteData[0];

		// Fetch historical price data (5 years)
		const historicalResponse = await fetch(
			`${BASE_URL_V3}/historical-price-full/${symbol}?apikey=${API_KEY}`
		);

		if (!historicalResponse.ok) {
			console.error('Historical fetch failed:', historicalResponse.status);
		}

		const historicalData = await historicalResponse.json();
		console.log('Historical data received:', historicalData.historical?.length || 0, 'items');

		// Fetch ownership data
		const ownershipResponse = await fetch(
			`${BASE_URL_V4}/insider-trading?symbol=${symbol}&limit=100&apikey=${API_KEY}`
		);

		if (!ownershipResponse.ok) {
			console.error('Ownership fetch failed:', ownershipResponse.status);
		}

		const ownershipData = await ownershipResponse.json();
		console.log('Ownership data received:', ownershipData?.length || 0, 'items');

		return {
			symbol,
			quote,
			historical: historicalData.historical || [],
			ownership: ownershipData || [],
			wasResolved,
			originalInput: wasResolved ? originalInput : undefined
		};
	} catch (e) {
		console.error('Error fetching data:', e);
		if (e && typeof e === 'object' && 'status' in e) {
			throw e;
		}
		throw error(500, 'Failed to fetch company data');
	}
};
