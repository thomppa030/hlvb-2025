<!-- src/routes/infos/faq/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import SliceZone from "$lib/components/SliceZone.svelte";
  import FAQItem from "$lib/components/ui/FAQItem.svelte";
  import { currentLanguage, t } from "$lib/stores/i18n.js";
  import {
    fetchFAQ,
    getFAQCategories,
    fetchContactInfo,
  } from "$lib/utils/content.js";
  import Icon from "$lib/components/ui/Icon.svelte";

  export let data;

  let faqItems = [];
  let selectedCategory = "all";
  let searchQuery = "";
  let expandedItems = new Set();
  let loading = true;
  let categories = [];
  let contactInfo = null;

  onMount(async () => {
    await loadFAQ();
  });

  async function loadFAQ() {
    loading = true;
    try {
      const lang = $currentLanguage;

      // Fetch FAQ and contact info in parallel
      const [faqData, contact] = await Promise.all([
        fetchFAQ(lang),
        fetchContactInfo(),
      ]);

      faqItems = faqData;
      contactInfo = contact;

      // Get unique categories
      categories = ["all", ...(await getFAQCategories(lang))];

      loading = false;
    } catch (error) {
      console.error("Error loading FAQ:", error);
      loading = false;
    }
  }

  $: filteredItems = filterFAQItems();

  function filterFAQItems() {
    let items =
      selectedCategory === "all"
        ? faqItems
        : faqItems.filter((item) => item.category === selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query),
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
    searchQuery = "";
  }

  // React to language changes
  $: if ($currentLanguage) {
    loadFAQ();
  }

  $: allCategories = categories;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  {#if data.meta.description}
    <meta name="description" content={data.meta.description} />
  {/if}
</svelte:head>

{#if data.slices && data.slices.length > 0}
  <SliceZone slices={data.slices} />
{:else}
  <!-- Fallback to existing FAQ functionality when no Prismic data -->
<div class="faq-container">
  <div class="container">
    <header class="faq-header">
      <h1 class="heading-accent-center">Häufig gestellte Fragen</h1>
      <p class="intro-text">
        Hier finden Sie Antworten auf die häufigsten Fragen zu unserem Hotel.
        Falls Sie weitere Fragen haben, kontaktieren Sie uns gerne direkt.
      </p>
    </header>

    <div class="faq-content">
      <!-- Search and Filter Section -->
      <div class="filter-section">
        <div class="search-box">
          <div class="search-input-wrapper">
            <input
              type="text"
              placeholder="Suchen Sie nach einem Thema..."
              bind:value={searchQuery}
              class="search-input"
            />
            {#if searchQuery}
              <button
                class="clear-search"
                on:click={clearSearch}
                aria-label="Suche löschen"
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
          <h2>Nach Kategorie filtern</h2>
          <div class="filter-buttons">
            {#each allCategories as category}
              <button
                class="filter-btn"
                class:active={selectedCategory === category}
                on:click={() => (selectedCategory = category)}
              >
                {#if category === "all"}
                  Alle Kategorien
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
        {#if loading}
          <div class="loading">
            <h3>FAQ werden geladen...</h3>
            <p>Bitte warten Sie einen Moment.</p>
          </div>
        {:else if filteredItems.length > 0}
          <div class="items-count">
            {filteredItems.length}
            {filteredItems.length === 1 ? "Frage" : "Fragen"} gefunden
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
        {:else if faqItems.length === 0}
          <div class="no-results">
            <h3>Derzeit keine FAQ-Einträge verfügbar</h3>
            <p>
              Die häufig gestellten Fragen werden in Kürze hinzugefügt. Bei
              weiteren Fragen kontaktieren Sie uns gerne direkt.
            </p>
          </div>
        {:else}
          <div class="no-results">
            <h3>Keine Ergebnisse gefunden</h3>
            <p>
              {#if searchQuery}
                Ihre Suche nach "<strong>{searchQuery}</strong>" ergab keine
                Treffer.
              {:else}
                In dieser Kategorie sind keine Fragen verfügbar.
              {/if}
            </p>
            <button
              class="reset-btn"
              on:click={() => {
                searchQuery = "";
                selectedCategory = "all";
              }}
            >
              Filter zurücksetzen
            </button>
          </div>
        {/if}
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <h2 class="heading-accent-center">Weitere Fragen?</h2>
        <div class="contact-content">
          <div class="contact-text">
            <p>
              Haben Sie eine Frage, die hier nicht beantwortet wurde? Unser
              freundliches Team hilft Ihnen gerne weiter! Kontaktieren Sie uns
              per Telefon, E-Mail oder kommen Sie einfach an unserer Rezeption
              vorbei.
            </p>
          </div>
          <div class="contact-info">
            {#if contactInfo}
              <div class="contact-item">
                <h3><Icon name="phone" size={32} />Phone</h3>
                <p>
                  <a href="tel:{contactInfo.phone.main}"
                    >{contactInfo.phone.display}</a
                  >
                </p>
                <p class="hours">{contactInfo.hours.phoneAvailableDe}</p>
              </div>
              <div class="contact-item">
                <h3><Icon name="email" size={32} /> Email</h3>
                <p>
                  <a href="mailto:{contactInfo.email.main}"
                    >{contactInfo.email.main}</a
                  >
                </p>
                <p class="hours">{contactInfo.hours.emailResponseDe}</p>
              </div>
              <div class="contact-item">
                <h3><Icon name="address" size={32} /> Adresse</h3>
                <p>
                  {#if contactInfo.ownerName}
                    Inhaber: {contactInfo.ownerName}<br />
                  {/if}
                  {contactInfo.address.street}<br />{contactInfo.address.city}
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

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

  .loading,
  .no-results {
    text-align: center;
    padding: var(--space-5xl) var(--space-xl);
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .loading h3,
  .no-results h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .loading p,
  .no-results p {
    font-family: var(--font-primary);
    color: var(--color-text-light);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-lg);
  }

  .loading {
    border-color: var(--color-secondary-light);
    background: var(--color-background-alt);
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
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
