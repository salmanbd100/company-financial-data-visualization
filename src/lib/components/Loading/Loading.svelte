<script lang="ts">
  export let message = 'Loading...';
</script>

<div class="loading-container">
  <div class="loading-content">
    <div class="spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p class="loading-message">{message}</p>
  </div>
</div>

<style>
  .loading-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);
  }

  .loading-content {
    text-align: center;
  }

  .spinner {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
  }

  .spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  .spinner-ring:nth-child(1) {
    animation-delay: -0.45s;
    border-top-color: #3b82f6;
  }

  .spinner-ring:nth-child(2) {
    animation-delay: -0.3s;
    border-top-color: #60a5fa;
  }

  .spinner-ring:nth-child(3) {
    animation-delay: -0.15s;
    border-top-color: #93c5fd;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-message {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.125rem;
    font-weight: 500;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
