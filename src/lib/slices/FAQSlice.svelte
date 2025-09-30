<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import { onMount } from 'svelte';
  import { currentLanguage } from '$lib/stores/i18n.js';
  import { fetchFAQ, getFAQCategories } from '$lib/utils/content.js';
  import FAQItem from '$lib/components/ui/FAQItem.svelte';

  export let slice;

  let faqItems = [];
  let filteredFAQ = [];
  let selectedCategory = 'all';
  let categories = [];
  let loading = true;
  let usingCMS = false;

  onMount(async () => {
    await loadFAQ();
  });

  async function loadFAQ() {
    loading = true;
    try {
      const lang = $currentLanguage;

      // Fetch FAQ using the new content utility
      faqItems = await fetchFAQ(lang);
      filteredFAQ = faqItems;

      // Check if we got data from Prismic (has _prismic metadata)
      usingCMS = faqItems.length > 0 && faqItems[0]._prismic;

      // Get unique categories
      categories = ['all', ...(await getFAQCategories(lang))];

      loading = false;
    } catch (error) {
      console.error('Error loading FAQ:', error);
      loading = false;
    }
  }

  function filterByCategory(category) {
    selectedCategory = category;
    if (category === 'all') {
      filteredFAQ = faqItems;
    } else {
      filteredFAQ = faqItems.filter(item => item.category === category);
    }
  }

  // React to language changes
  $: if ($currentLanguage) {
    loadFAQ();
  }
</script>

<section class="faq-section">
  <div class="container">
    <div class="section-header">
      <PrismicRichText field={slice.primary.title} />
      <PrismicRichText field={slice.primary.description} />
    </div>

    {#if slice.primary.show_categories && categories.length > 1}
      <div class="category-filters">
        {#each categories as category}
          <button
            class="category-btn"
            class:active={selectedCategory === category}
            on:click={() => filterByCategory(category)}
          >
            {category === 'all' ? 'Alle Kategorien' : category}
          </button>
        {/each}
      </div>
    {/if}

    {#if loading}
      <div class="loading">
        <p>FAQ werden geladen...</p>
      </div>
    {:else if filteredFAQ.length > 0}
      <div class="faq-list">
        {#each filteredFAQ as faqItem, index}
          <FAQItem {faqItem} />
        {/each}
      </div>
    {:else}
      <div class="no-faq">
        <p>Keine FAQ-Einträge in dieser Kategorie gefunden.</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .faq-section {
    padding: var(--space-4xl) 0;
    background-color: var(--color-background);
  }

  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .section-header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .section-header :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    line-height: var(--line-height-tight);
  }

  .section-header :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-normal);
    color: var(--color-text-muted);
    margin: 0;
  }

  .category-filters {
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-3xl);
    flex-wrap: wrap;
  }

  .category-btn {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    color: var(--color-text);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .category-btn:hover {
    background: var(--color-background-alt);
    border-color: var(--color-secondary);
  }

  .category-btn.active {
    background: var(--color-secondary);
    border-color: var(--color-secondary);
    color: white;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .loading,
  .no-faq {
    text-align: center;
    padding: var(--space-4xl) var(--space-lg);
  }

  .loading p,
  .no-faq p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    color: var(--color-text-muted);
    margin: 0;
  }

  @media (max-width: 768px) {
    .faq-section {
      padding: var(--space-2xl) 0;
    }

    .section-header :global(h2) {
      font-size: var(--font-size-3xl);
    }

    .category-filters {
      margin-bottom: var(--space-2xl);
    }

    .category-btn {
      font-size: var(--font-size-xs);
      padding: var(--space-xs) var(--space-sm);
    }
  }
</style>