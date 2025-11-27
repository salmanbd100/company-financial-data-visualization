import {
  PUBLIC_FMP_API_KEY,
  PUBLIC_FMP_API_BASE_URL_V3,
  PUBLIC_FMP_API_BASE_URL_V4
} from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolveToSymbol } from '$lib/api/fmp';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { symbol: rawInput } = params;
  const API_KEY = PUBLIC_FMP_API_KEY;
  const BASE_URL_V3 = PUBLIC_FMP_API_BASE_URL_V3;
  const BASE_URL_V4 = PUBLIC_FMP_API_BASE_URL_V4;

  // Resolve input to symbol (handles both symbols and company names)
  const { symbol, wasResolved, originalInput } = await resolveToSymbol(rawInput, API_KEY, fetch);

  try {
    // Fetch quote data for basic stats
    const quoteUrl = `${BASE_URL_V3}/quote/${symbol}?apikey=${API_KEY}`;
    const quoteResponse = await fetch(quoteUrl);

    if (!quoteResponse.ok) {
      console.error('Quote fetch failed:', quoteResponse.status, quoteResponse.statusText);
      const errorText = await quoteResponse.text();
      console.error('Error response:', errorText);
      throw error(quoteResponse.status, `Failed to fetch quote: ${quoteResponse.statusText}`);
    }

    const quoteData = await quoteResponse.json();

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

    // Fetch ownership data
    const ownershipResponse = await fetch(
      `${BASE_URL_V4}/insider-trading?symbol=${symbol}&limit=100&apikey=${API_KEY}`
    );

    if (!ownershipResponse.ok) {
      console.error('Ownership fetch failed:', ownershipResponse.status);
    }

    const ownershipData = await ownershipResponse.json();

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
