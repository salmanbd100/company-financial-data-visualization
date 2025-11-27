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
  - Real-time search by owner name (filters as you type)
  - Paginated view (10 items per page) with top-right controls
  - Transaction type badges (Acquisition/Disposition)
  - Displays reporting name, shares owned, transaction type, price, and filing date
  - Search input positioned at top-left, pagination at top-right

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
- **Code Formatting**: Prettier with 2-space indentation
- **Icons**: Centralized SVG icon components with TypeScript types

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
│   ├── +page.svelte                 # Search page with company lookup
│   ├── +error.svelte                # Global error page
│   └── company/
│       ├── +layout.svelte           # Company section layout
│       └── [symbol]/
│           ├── +page.svelte         # Company details page
│           ├── +page.server.ts      # Server-side data loading with symbol resolution
│           └── +error.svelte        # Company-specific error page
├── lib/
│   ├── api/
│   │   ├── fmp.ts                   # FMP API integration with symbol resolution
│   │   └── types.ts                 # TypeScript type definitions
│   ├── components/
│   │   ├── BasicStats.svelte        # Basic stats card component
│   │   ├── PriceChart.svelte        # Interactive price chart with time filters
│   │   ├── OwnershipTable.svelte    # Ownership table with search & pagination
│   │   └── Loading.svelte           # Loading spinner component
│   └── icons/
│       ├── IconAlert.svelte         # Alert/error icon
│       ├── IconArrowLeft.svelte     # Arrow left navigation icon
│       ├── IconChevronLeft.svelte   # Chevron left pagination icon
│       ├── IconChevronRight.svelte  # Chevron right pagination icon
│       ├── IconClose.svelte         # Close/dismiss icon
│       ├── IconExternalLink.svelte  # External link indicator icon
│       ├── IconHome.svelte          # Home navigation icon
│       └── IconSpinner.svelte       # Loading spinner icon with animation
└── .vscode/
    └── settings.json                # VS Code workspace settings (format on save)
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

## Development

### Code Quality

Run TypeScript and Svelte type checking:

```bash
pnpm run check
```

Format code with Prettier (2-space indentation):

```bash
pnpm run format
```

Lint code:

```bash
pnpm run lint
```
