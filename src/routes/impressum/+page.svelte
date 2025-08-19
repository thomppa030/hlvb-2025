<script>
  import { t } from '$lib/stores/i18n.js';
</script>

<svelte:head>
  <title>Impressum | Hotel Ludwig van Beethoven</title>
</svelte:head>

<div class="impressum-page">
  <div class="container">
    <h1>Impressum</h1>
    <p>Hotel Ludwig van Beethoven</p>
    <p>Hasenheide 14</p>
    <p>10967 Berlin</p>
    <p>Deutschland</p>
  </div>
</div>

<style>
  .impressum-page {
    min-height: 60vh;
    padding: var(--space-4xl) 0;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }
  
  h1 {
    margin-bottom: var(--space-2xl);
  }
  
  p {
    margin-bottom: var(--space-sm);
    color: var(--color-text);
  }
</style>