<script lang="ts">
  import IconChevronLeft from '$lib/icons/IconChevronLeft.svelte';
  import IconChevronRight from '$lib/icons/IconChevronRight.svelte';
  import {
    type InsiderTrading,
    type SortColumn,
    type SortDirection,
    ITEMS_PER_PAGE,
    filterData,
    sortData,
    paginateData,
    calculateTotalPages,
    formatNumber,
    formatDate,
    handleSortColumnChange
  } from './script';

  export let ownership: InsiderTrading[];

  let currentPage = 1;
  let searchQuery = '';
  let sortColumn: SortColumn | null = null;
  let sortDirection: SortDirection = 'asc';

  // Filter data based on search query
  $: filteredData = filterData(ownership, searchQuery);

  // Sort data
  $: sortedData = sortData(filteredData, sortColumn, sortDirection);

  // Reset to page 1 when search query changes
  $: if (searchQuery) {
    currentPage = 1;
  }

  $: totalPages = calculateTotalPages(sortedData.length, ITEMS_PER_PAGE);
  $: paginatedData = paginateData(sortedData, currentPage, ITEMS_PER_PAGE);

  function handleSort(column: SortColumn) {
    const result = handleSortColumnChange(sortColumn, column, sortDirection);
    sortColumn = result.column;
    sortDirection = result.direction;
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }
</script>

<div class="table-wrapper">
  {#if ownership.length === 0}
    <p class="no-data">No ownership data available</p>
  {:else}
    <!-- Header with search and pagination -->
    <div class="table-header">
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search by name"
          bind:value={searchQuery}
        />
      </div>

      {#if totalPages > 1}
        <div class="pagination">
          <button
            class="pagination-btn"
            on:click={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <IconChevronLeft size={20} ariaLabel="Previous page" />
          </button>

          <span class="pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            class="pagination-btn"
            on:click={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <IconChevronRight size={20} ariaLabel="Next page" />
          </button>
        </div>
      {/if}
    </div>

    <!-- Table -->
    {#if filteredData.length === 0}
      <p class="no-results">No results found for "{searchQuery}"</p>
    {:else}
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="sortable" on:click={() => handleSort('name')}>
                <div class="th-content">
                  <span>Name</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'name'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
              <th class="sortable" on:click={() => handleSort('sharesOwned')}>
                <div class="th-content">
                  <span>Shares Owned</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'sharesOwned'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
              <th class="sortable" on:click={() => handleSort('ownership')}>
                <div class="th-content">
                  <span>Ownership Percentage</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'ownership'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
              <th class="sortable" on:click={() => handleSort('transactionType')}>
                <div class="th-content">
                  <span>Transaction Type</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'transactionType'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
              <th class="sortable" on:click={() => handleSort('shares')}>
                <div class="th-content">
                  <span>Shares</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'shares'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
              <th class="sortable" on:click={() => handleSort('price')}>
                <div class="th-content">
                  <span>Price</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'price'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
              <th class="sortable" on:click={() => handleSort('filingDate')}>
                <div class="th-content">
                  <span>Filing Date</span>
                  <span class="sort-indicator">
                    {#if sortColumn === 'filingDate'}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each paginatedData as item}
              <tr>
                <td class="name-cell">{item.reportingName || item.ownerName || 'N/A'}</td>
                <td>{item.securitiesOwned ? formatNumber(item.securitiesOwned) : '0'}</td>
                <td>{item.ownershipPercent ? item.ownershipPercent.toFixed(2) + '%' : 'N/A'}</td>
                <td>
                  <span
                    class="transaction-badge"
                    class:acquisition={item.transactionType?.includes('A')}
                    class:disposition={item.transactionType?.includes('D')}
                  >
                    {item.transactionType || 'N/A'}
                  </span>
                </td>
                <td>{item.securitiesTransacted ? formatNumber(item.securitiesTransacted) : '0'}</td>
                <td>{item.price ? '$' + item.price.toFixed(2) : 'N/A'}</td>
                <td>{item.filingDate ? formatDate(item.filingDate) : 'N/A'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/if}
</div>

<style>
  .table-wrapper {
    width: 100%;
  }

  .no-data {
    text-align: center;
    color: #64748b;
    padding: 2rem;
  }

  .no-results {
    text-align: center;
    color: #64748b;
    padding: 2rem;
    font-size: 0.875rem;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .search-container {
    flex: 0 0 auto;
  }

  .search-input {
    padding: 0.625rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #334155;
    background: white;
    transition: all 0.2s ease;
    min-width: 280px;
  }

  .search-input::placeholder {
    color: #94a3b8;
  }

  .search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    table-layout: fixed;
  }

  thead {
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
  }

  th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    color: #475569;
    white-space: nowrap;
  }

  /* Fixed column widths */
  th:nth-child(1),
  td:nth-child(1) {
    width: 18%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 14%;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 16%;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 14%;
  }

  th:nth-child(5),
  td:nth-child(5) {
    width: 12%;
  }

  th:nth-child(6),
  td:nth-child(6) {
    width: 12%;
  }

  th:nth-child(7),
  td:nth-child(7) {
    width: 14%;
  }

  th.sortable {
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
  }

  th.sortable:hover {
    background-color: #e2e8f0;
  }

  .th-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .sort-indicator {
    font-size: 0.75rem;
    color: #94a3b8;
    min-width: 1rem;
    text-align: center;
  }

  th.sortable:hover .sort-indicator {
    color: #64748b;
  }

  tbody tr {
    border-bottom: 1px solid #e2e8f0;
    transition: background-color 0.2s ease;
  }

  tbody tr:hover {
    background: #f8fafc;
  }

  td {
    padding: 0.75rem 1rem;
    color: #334155;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name-cell {
    font-weight: 500;
  }

  .transaction-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: #e2e8f0;
    color: #475569;
  }

  .transaction-badge.acquisition {
    background: #dcfce7;
    color: #16a34a;
  }

  .transaction-badge.disposition {
    background: #fee2e2;
    color: #dc2626;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-info {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .table-header {
      flex-direction: column;
      align-items: stretch;
    }

    .search-input {
      min-width: 100%;
    }

    .pagination {
      justify-content: center;
    }

    .table-container {
      /* Add scroll indicator shadow */
      background:
        linear-gradient(90deg, white 30%, rgba(255, 255, 255, 0)),
        linear-gradient(90deg, rgba(255, 255, 255, 0), white 70%) 100% 0,
        radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
        radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 100% 0;
      background-repeat: no-repeat;
      background-size:
        40px 100%,
        40px 100%,
        14px 100%,
        14px 100%;
      background-attachment: local, local, scroll, scroll;
    }

    table {
      font-size: 0.75rem;
      min-width: 800px; /* Ensure table is wide enough for all columns */
    }

    /* Mobile-optimized column widths (pixel-based) */
    th:nth-child(1),
    td:nth-child(1) {
      width: 140px; /* Name */
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 110px; /* Shares Owned */
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 120px; /* Ownership Percentage */
    }

    th:nth-child(4),
    td:nth-child(4) {
      width: 130px; /* Transaction Type */
    }

    th:nth-child(5),
    td:nth-child(5) {
      width: 90px; /* Shares */
    }

    th:nth-child(6),
    td:nth-child(6) {
      width: 80px; /* Price */
    }

    th:nth-child(7),
    td:nth-child(7) {
      width: 100px; /* Filing Date */
    }

    th,
    td {
      padding: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    table {
      min-width: 700px; /* Slightly smaller minimum for very small screens */
      font-size: 0.7rem;
    }

    th,
    td {
      padding: 0.375rem;
    }

    /* Adjust column widths for smallest screens */
    th:nth-child(1),
    td:nth-child(1) {
      width: 150px;
    }
    th:nth-child(2),
    td:nth-child(2) {
      width: 120px;
    }
    th:nth-child(3),
    td:nth-child(3) {
      width: 150px;
    }
    th:nth-child(4),
    td:nth-child(4) {
      width: 150px;
    } /* Transaction Type - increased width */
    th:nth-child(5),
    td:nth-child(5) {
      width: 80px;
    }
    th:nth-child(6),
    td:nth-child(6) {
      width: 70px;
    }
    th:nth-child(7),
    td:nth-child(7) {
      width: 90px;
    }
  }
</style>
