<!-- src/routes/en/infos/faq/+page.svelte -->
<script>
  import FAQItem from "$lib/components/ui/FAQItem.svelte";
  import { faqItems, faqByCategory, faqCategories } from "$lib/data/faq-en.js";
  import { t } from "$lib/stores/i18n.js";

  let selectedCategory = 'all';
  let searchQuery = '';
  let expandedItems = new Set();

  $: filteredItems = filterFAQItems();

  function filterFAQItems() {
    let items = selectedCategory === 'all'
      ? faqItems
      : faqByCategory[selectedCategory] || [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
      );
    }

    return items;
  }

  function toggleItemExpansion(itemId) {
    if (expandedItems.has(itemId)) {
      expandedItems.delete(itemId);
    } else {
      expandedItems.add(itemId);
    }
    expandedItems = expandedItems;
  }

  function clearSearch() {
    searchQuery = '';
  }

  $: allCategories = ['all', ...faqCategories];
</script>

<svelte:head>
  <title>Frequently Asked Questions - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Frequently asked questions about Hotel Ludwig van Beethoven Berlin. Answers about arrival, check-in, amenities and services."
  />
</svelte:head>

<div class="faq-container">
  <div class="container">
    <header class="faq-header">
      <h1 class="heading-accent">Frequently Asked Questions</h1>
      <p class="intro-text">
        Here you'll find answers to the most common questions about our hotel.
        If you have additional questions, please feel free to contact us directly.
      </p>
    </header>

    <div class="faq-content">
      <!-- Search and Filter Section -->
      <div class="filter-section">
        <div class="search-box">
          <div class="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for a topic..."
              bind:value={searchQuery}
              class="search-input"
            />
            {#if searchQuery}
              <button
                class="clear-search"
                on:click={clearSearch}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            {/if}
          </div>
        </div>

        <div class="category-filters">
          <h2>Filter by Category</h2>
          <div class="filter-buttons">
            {#each allCategories as category}
              <button
                class="filter-btn"
                class:active={selectedCategory === category}
                on:click={() => selectedCategory = category}
              >
                {#if category === 'all'}
                  All Categories
                {:else}
                  {category}
                {/if}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- FAQ Items -->
      <div class="faq-items">
        {#if filteredItems.length > 0}
          <div class="items-count">
            {filteredItems.length} {filteredItems.length === 1 ? 'question' : 'questions'} found
          </div>

          {#each filteredItems as item}
            <FAQItem
              question={item.question}
              answer={item.answer}
              category={item.category}
              expanded={expandedItems.has(item.id)}
              id={item.id}
              on:click={() => toggleItemExpansion(item.id)}
            />
          {/each}
        {:else}
          <div class="no-results">
            <h3>No Results Found</h3>
            <p>
              {#if searchQuery}
                Your search for "<strong>{searchQuery}</strong>" returned no results.
              {:else}
                No questions are available in this category.
              {/if}
            </p>
            <button class="reset-btn" on:click={() => { searchQuery = ''; selectedCategory = 'all'; }}>
              Reset Filters
            </button>
          </div>
        {/if}
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <h2 class="heading-accent">More Questions?</h2>
        <div class="contact-content">
          <div class="contact-text">
            <p>
              Do you have a question that wasn't answered here? Our friendly
              team is happy to help! Contact us by phone, email or simply
              visit us at our reception.
            </p>
          </div>
          <div class="contact-info">
            <div class="contact-item">
              <h3>📞 Phone</h3>
              <p><a href="tel:+4930695066-0">+49 30 695 066 0</a></p>
              <p class="hours">Available 24 hours daily</p>
            </div>
            <div class="contact-item">
              <h3>✉️ Email</h3>
              <p><a href="mailto:info@hotel-ludwig-van-beethoven.de">info@hotel-ludwig-van-beethoven.de</a></p>
              <p class="hours">We respond within 24 hours</p>
            </div>
            <div class="contact-item">
              <h3>🏨 On-site</h3>
              <p>Hasenheide 14<br>10967 Berlin<br>Germany</p>
              <p class="hours">Reception: Open 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .faq-container {
    background-color: var(--color-background);
    padding: var(--space-5xl) 0;
    min-height: 80vh;
  }

  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .faq-header {
    text-align: center;
    margin-bottom: var(--space-5xl);
  }

  h1.heading-accent {
    font-family: var(--font-display);
    font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .intro-text {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto;
  }

  .filter-section {
    margin-bottom: var(--space-4xl);
    background: var(--color-background-elevated);
    padding: var(--space-2xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .search-box {
    margin-bottom: var(--space-xl);
  }

  .search-input-wrapper {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
  }

  .search-input {
    width: 100%;
    padding: var(--space-md) var(--space-lg);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    background: var(--color-background);
    color: var(--color-text);
    transition: border-color var(--transition-fast);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(158, 139, 123, 0.1);
  }

  .clear-search {
    position: absolute;
    right: var(--space-md);
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--color-text-light);
    cursor: pointer;
    padding: var(--space-xs);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .clear-search:hover {
    color: var(--color-text);
    background: var(--color-background-alt);
  }

  .category-filters h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    text-align: center;
  }

  .filter-buttons {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    justify-content: center;
  }

  .filter-btn {
    background: var(--color-background);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-full);
    padding: var(--space-sm) var(--space-lg);
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .filter-btn:hover {
    background: var(--color-background-alt);
    border-color: var(--color-secondary-light);
  }

  .filter-btn.active {
    background: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--color-text-inverse);
  }

  .faq-items {
    margin-bottom: var(--space-5xl);
  }

  .items-count {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin-bottom: var(--space-xl);
    text-align: center;
  }

  .no-results {
    text-align: center;
    padding: var(--space-5xl) var(--space-xl);
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .no-results h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .no-results p {
    font-family: var(--font-primary);
    color: var(--color-text-light);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-lg);
  }

  .reset-btn {
    background: var(--color-secondary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-md) var(--space-lg);
    font-family: var(--font-primary);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-inverse);
    cursor: pointer;
    transition: background-color var(--transition-fast);
  }

  .reset-btn:hover {
    background: var(--color-secondary-light);
  }

  .contact-section {
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    padding: var(--space-4xl);
    border: 1px solid var(--color-border-light);
  }

  .contact-section h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    text-align: center;
    letter-spacing: -0.01em;
  }

  .contact-content {
    display: grid;
    gap: var(--space-4xl);
  }

  .contact-text p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-xl);
  }

  .contact-item {
    background: var(--color-background-alt);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    text-align: center;
  }

  .contact-item h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .contact-item p {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    color: var(--color-text);
    margin-bottom: var(--space-sm);
  }

  .contact-item .hours {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin-bottom: 0;
  }

  .contact-item a {
    color: var(--color-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-secondary-light);
    transition: var(--transition-fast);
  }

  .contact-item a:hover {
    color: var(--color-secondary-light);
    border-bottom-color: var(--color-secondary-light);
  }

  strong {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .faq-container {
      padding: var(--space-4xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .faq-header {
      margin-bottom: var(--space-4xl);
    }

    .filter-section {
      padding: var(--space-xl);
    }

    .contact-section {
      padding: var(--space-3xl);
    }

    .filter-buttons {
      gap: var(--space-xs);
    }

    .filter-btn {
      padding: var(--space-xs) var(--space-md);
      font-size: var(--font-size-xs);
    }

    h1.heading-accent {
      margin-bottom: var(--space-lg);
    }

    .intro-text {
      font-size: var(--font-size-base);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .filter-section {
      padding: var(--space-lg);
    }

    .contact-section {
      padding: var(--space-2xl);
    }

    .contact-item {
      padding: var(--space-lg);
    }

    .search-input {
      padding: var(--space-sm) var(--space-md);
    }
  }
</style>