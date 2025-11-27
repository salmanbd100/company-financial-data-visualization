<script lang="ts">
  import IconChevronLeft from '$lib/icons/IconChevronLeft.svelte';
  import IconChevronRight from '$lib/icons/IconChevronRight.svelte';

  export let ownership: any[];

  let currentPage = 1;
  let searchQuery = '';
  const itemsPerPage = 10;

  // Filter data based on search query
  $: filteredData = ownership.filter((item) => {
    if (!searchQuery.trim()) return true;
    const name = (item.reportingName || item.ownerName || '').toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  // Reset to page 1 when search query changes
  $: if (searchQuery) {
    currentPage = 1;
  }

  $: totalPages = Math.ceil(filteredData.length / itemsPerPage);
  $: paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function formatNumber(num: number): string {
    return num.toLocaleString();
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
              <th>Name</th>
              <th>Shares Owned</th>
              <th>Ownership %</th>
              <th>Transaction Type</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Filing Date</th>
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
  }

  .name-cell {
    font-weight: 500;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

    table {
      font-size: 0.75rem;
    }

    th,
    td {
      padding: 0.5rem;
    }

    .name-cell {
      max-width: 120px;
    }
  }
</style>
