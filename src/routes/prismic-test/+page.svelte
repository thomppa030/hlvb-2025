<script>
  import JobSlice from '$lib/slices/JobSlice.svelte';
  import FAQSlice from '$lib/slices/FAQSlice.svelte';

  // Mock slice data for testing
  const jobSliceData = {
    primary: {
      title: [{ type: 'heading2', text: 'Stellenanzeigen' }],
      description: [{ type: 'paragraph', text: 'Werden Sie Teil unseres Teams im Hotel Ludwig van Beethoven' }],
      show_filters: true
    },
    items: []
  };

  const faqSliceData = {
    primary: {
      title: [{ type: 'heading2', text: 'Häufig gestellte Fragen' }],
      description: [{ type: 'paragraph', text: 'Finden Sie Antworten auf die häufigsten Fragen zu unserem Hotel' }],
      show_categories: true
    },
    items: []
  };
</script>

<svelte:head>
  <title>Prismic Integration Test - Hotel Ludwig van Beethoven</title>
</svelte:head>

<main class="test-page">
  <div class="container">
    <h1>Prismic Integration Test</h1>
    <p>Diese Seite testet die Integration von Job- und FAQ-Inhalten mit Prismic CMS und Fallback-Funktionalität.</p>

    <div class="status-indicator">
      <h2>Integration Status</h2>
      <p><strong>Jobs:</strong> Nur Prismic-Daten (keine Fallback-Daten für echte Stellenanzeigen)</p>
      <p><strong>FAQ:</strong> Prismic-Daten mit Fallback zu statischen Daten</p>
    </div>

    <!-- Test Job Slice -->
    <JobSlice slice={jobSliceData} />

    <!-- Test FAQ Slice -->
    <FAQSlice slice={faqSliceData} />
  </div>
</main>

<style>
  .test-page {
    background-color: var(--color-background);
    min-height: 100vh;
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    text-align: center;
  }

  .test-page > .container > p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-normal);
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .status-indicator {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-4xl);
    text-align: center;
  }

  .status-indicator h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .status-indicator p {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
    color: var(--color-text-muted);
    margin: 0;
  }

  @media (max-width: 768px) {
    .test-page {
      padding: var(--space-2xl) 0;
    }

    h1 {
      font-size: var(--font-size-3xl);
    }
  }
</style>