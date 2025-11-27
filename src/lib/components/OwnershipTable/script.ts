// OwnershipTable component logic - handles filtering, sorting, and pagination

// Re-export types for convenience
export type { InsiderTrading } from './types';
import type { InsiderTrading } from './types';

export type SortDirection = 'asc' | 'desc';
export type SortColumn =
  | 'name'
  | 'sharesOwned'
  | 'ownership'
  | 'transactionType'
  | 'shares'
  | 'price'
  | 'filingDate';

export const ITEMS_PER_PAGE = 10;

/**
 * Filter ownership data by name search query
 */
export function filterData(data: InsiderTrading[], searchQuery: string): InsiderTrading[] {
  if (!searchQuery.trim()) return data;

  const query = searchQuery.toLowerCase();
  return data.filter((item) => {
    const name = (item.reportingName || item.ownerName || '').toLowerCase();
    return name.includes(query);
  });
}

/**
 * Sort ownership data by column
 */
export function sortData(
  data: InsiderTrading[],
  sortColumn: SortColumn | null,
  sortDirection: SortDirection
): InsiderTrading[] {
  if (!sortColumn) return data;

  return [...data].sort((a, b) => {
    let aVal, bVal;

    switch (sortColumn) {
      case 'name':
        aVal = (a.reportingName || a.ownerName || '').toLowerCase();
        bVal = (b.reportingName || b.ownerName || '').toLowerCase();
        break;
      case 'sharesOwned':
        aVal = a.securitiesOwned || 0;
        bVal = b.securitiesOwned || 0;
        break;
      case 'ownership':
        aVal = a.ownershipPercent || 0;
        bVal = b.ownershipPercent || 0;
        break;
      case 'transactionType':
        aVal = (a.transactionType || '').toLowerCase();
        bVal = (b.transactionType || '').toLowerCase();
        break;
      case 'shares':
        aVal = a.securitiesTransacted || 0;
        bVal = b.securitiesTransacted || 0;
        break;
      case 'price':
        aVal = a.price || 0;
        bVal = b.price || 0;
        break;
      case 'filingDate':
        aVal = a.filingDate ? new Date(a.filingDate).getTime() : 0;
        bVal = b.filingDate ? new Date(b.filingDate).getTime() : 0;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Paginate data
 */
export function paginateData(data: InsiderTrading[], currentPage: number, itemsPerPage: number): InsiderTrading[] {
  return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
}

/**
 * Calculate total pages
 */
export function calculateTotalPages(dataLength: number, itemsPerPage: number): number {
  return Math.ceil(dataLength / itemsPerPage);
}

/**
 * Format number with locale string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Format date string
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Handle sort column change
 */
export function handleSortColumnChange(
  currentColumn: SortColumn | null,
  newColumn: SortColumn,
  currentDirection: SortDirection
): { column: SortColumn; direction: SortDirection } {
  if (currentColumn === newColumn) {
    return {
      column: newColumn,
      direction: currentDirection === 'asc' ? 'desc' : 'asc'
    };
  }
  return {
    column: newColumn,
    direction: 'asc'
  };
}
