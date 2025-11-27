# Veyt Assignment - Financial Data Visualization

A SvelteKit application that displays financial data visualizations for publicly traded companies using the Financial Modeling Prep (FMP) API.

## Features

- **Smart Company Search**:
  - Search by company name (e.g., "Microsoft", "Apple")
  - Search by stock symbol (e.g., "MSFT", "AAPL")
  - Auto-resolves company names to stock symbols
  - Prioritizes US exchanges (NASDAQ, NYSE, AMEX) for better data coverage
  - Loading states and error handling

- **Basic Stats Card**: Displays key metrics including:
  - Current Price
  - 52 Week Low/High
  - Market Cap
  - Shares Outstanding
  - Free Float
  - Average Trading Volume

- **Interactive Price Chart**:
  - Historical price visualization with Chart.js
  - Time period filters: 1D, 5D, 1M, 3M, 6M, 1Y, 5Y, ALL
  - Responsive design with tooltips

- **Acquisition of Beneficial Ownership Table**:
  - Insider trading data with transaction details
  - Paginated view (10 items per page)
  - Transaction type badges (Acquisition/Disposition)
  - Displays reporting name, shares owned, transaction type, price, and filing date

- **User Experience**:
  - Custom error pages with helpful suggestions
  - Loading indicators during data fetching
  - Resolution info banner when company name is auto-resolved
  - Fully responsive design

## Tech Stack

- **Framework**: SvelteKit v2.48.5 with TypeScript
- **Svelte**: Svelte 5 (with new runes syntax)
- **Charting**: Chart.js v4.4.8
- **API**: Financial Modeling Prep API
- **Styling**: Scoped CSS with custom design
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd veyt-assignment
```

2. Install dependencies:

```bash
pnpm install
```

### Environment Setup

3. Create your environment file by copying the example:

```bash
cp .env.example .env
```

4. Get your FMP API key:
   - Visit [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs)
   - Sign up for a free account
   - Navigate to your dashboard to get your API key
   - Free tier includes 250 API calls per day

5. Add your API key to the `.env` file:

```env
PUBLIC_FMP_API_KEY=your-api-key-here
```

Replace `your-api-key-here` with your actual FMP API key.

### Development

Start the development server:

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Building

To create a production build:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte              # Global layout with fonts and styles
│   ├── +page.svelte                 # Search page
│   └── company/
│       └── [symbol]/
│           ├── +page.svelte         # Company details page
│           ├── +page.server.ts      # Server-side data loading with symbol resolution
│           └── +error.svelte        # Custom error page
├── lib/
│   ├── api/
│   │   ├── fmp.ts                   # FMP API integration with symbol resolution
│   │   └── types.ts                 # TypeScript type definitions
│   └── components/
│       ├── BasicStats.svelte        # Basic stats card component
│       ├── PriceChart.svelte        # Price chart with time filters
│       ├── OwnershipTable.svelte    # Ownership data table with pagination
│       └── Loading.svelte           # Loading spinner component
```

## How It Works

### Symbol Resolution

The application uses a two-phase resolution strategy for optimal performance:

1. **Fast Path** (0ms overhead): When you enter a direct stock symbol (e.g., "MSFT"), the app immediately validates it against the FMP quote API.

2. **Slow Path** (+100-300ms): When you enter a company name (e.g., "Microsoft"), the app:
   - Searches the FMP search API for matching companies
   - Prioritizes US exchanges (NASDAQ, NYSE, AMEX) for better data availability
   - Automatically resolves to the best matching symbol
   - Shows a resolution banner to inform you of the selected company

### Data Fetching

Once a valid symbol is resolved:

- Quote data is fetched for basic statistics
- Historical price data is fetched for the chart (up to 5 years)
- Insider trading data is fetched for the ownership table (up to 100 recent transactions)

## API Documentation

The application uses the following FMP API endpoints:

- **[Search API](https://site.financialmodelingprep.com/developer/docs#search)**: `/api/v3/search` - Company name to symbol resolution
- **[Company Quote](https://site.financialmodelingprep.com/developer/docs#chart)**: `/api/v3/quote/{symbol}` - Basic company information and real-time stats
- **[Historical Prices](https://site.financialmodelingprep.com/developer/docs#chart)**: `/api/v3/historical-price-full/{symbol}` - Historical price data for charting
- **[Insider Trading](https://site.financialmodelingprep.com/developer/docs#acquisition-ownership)**: `/api/v4/insider-trading` - Acquisition of beneficial ownership data

## Important Notes

- **API Rate Limits**: Free tier FMP accounts have a limit of 250 API calls per day. Each company lookup makes 3-4 API calls (search/quote + historical + ownership).

- **Data Availability**: Insider trading/ownership data is primarily available for US-listed stocks (NASDAQ, NYSE, AMEX). International exchange listings may have limited or no ownership data.

- **Exchange Prioritization**: When searching by company name, the app prioritizes US exchanges to ensure better data coverage, especially for ownership information.

## Troubleshooting

### No Ownership Data Displayed

- Ensure you're searching for US-listed companies (e.g., "MSFT" instead of international variants)
- Some smaller companies may have limited or no insider trading data
- Try searching by direct symbol (e.g., "AAPL") instead of company name

### API Key Errors

- Verify your API key is correctly set in the `.env` file
- Ensure the variable name is exactly `PUBLIC_FMP_API_KEY`
- Restart the development server after changing environment variables

### Port Already in Use

If port 5173 is already in use, the server will automatically use the next available port. Check the terminal output for the actual URL.

## Type Checking

Run TypeScript and Svelte type checking:

```bash
pnpm run check
```

## Linting & Formatting

Format code:

```bash
pnpm run format
```

Lint code:

```bash
pnpm run lint
```

## License

This project is for assignment purposes.
