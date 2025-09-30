<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import { onMount } from 'svelte';
  import { currentLanguage } from '$lib/stores/i18n.js';
  import { fetchJobs, getJobDepartments } from '$lib/utils/content.js';
  import JobCard from '$lib/components/ui/JobCard.svelte';

  export let slice;

  let jobs = [];
  let filteredJobs = [];
  let selectedDepartment = 'all';
  let departments = [];
  let loading = true;
  let usingCMS = false;

  onMount(async () => {
    await loadJobs();
  });

  async function loadJobs() {
    loading = true;
    try {
      const lang = $currentLanguage;

      // Fetch jobs using the new content utility
      jobs = await fetchJobs(lang);
      filteredJobs = jobs;

      // Check if we got data from Prismic (has _prismic metadata)
      usingCMS = jobs.length > 0 && jobs[0]._prismic;

      // Get unique departments
      departments = ['all', ...(await getJobDepartments(lang))];

      loading = false;
    } catch (error) {
      console.error('Error loading jobs:', error);
      loading = false;
    }
  }

  function filterByDepartment(department) {
    selectedDepartment = department;
    if (department === 'all') {
      filteredJobs = jobs;
    } else {
      filteredJobs = jobs.filter(job => job.department === department);
    }
  }

  // React to language changes
  $: if ($currentLanguage) {
    loadJobs();
  }
</script>

<section class="jobs-section">
  <div class="container">
    <div class="section-header">
      <PrismicRichText field={slice.primary.title} />
      <PrismicRichText field={slice.primary.description} />
    </div>

    {#if slice.primary.show_filters && departments.length > 1}
      <div class="filters">
        {#each departments as department}
          <button
            class="filter-btn"
            class:active={selectedDepartment === department}
            on:click={() => filterByDepartment(department)}
          >
            {department === 'all' ? 'Alle Bereiche' : department}
          </button>
        {/each}
      </div>
    {/if}

    {#if loading}
      <div class="loading">
        <p>Stellenanzeigen werden geladen...</p>
      </div>
    {:else if filteredJobs.length > 0}
      <div class="jobs-grid">
        {#each filteredJobs as job}
          <JobCard {job} />
        {/each}
      </div>
    {:else if jobs.length === 0}
      <div class="no-jobs">
        <p>Derzeit sind keine Stellenanzeigen verfügbar.</p>
        <p class="sub-message">Schauen Sie gerne regelmäßig vorbei oder kontaktieren Sie uns für Initiativbewerbungen.</p>
      </div>
    {:else}
      <div class="no-jobs">
        <p>Keine Stellenanzeigen in der Kategorie "{selectedDepartment}" verfügbar.</p>
        <p class="sub-message">Wählen Sie eine andere Kategorie oder schauen Sie unter "Alle Bereiche".</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .jobs-section {
    padding: var(--space-4xl) 0;
    background-color: var(--color-background);
  }

  .container {
    max-width: var(--container-xl);
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

  .filters {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    margin-bottom: var(--space-3xl);
    flex-wrap: wrap;
  }

  .filter-btn {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    color: var(--color-text);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .filter-btn:hover {
    background: var(--color-background-alt);
    border-color: var(--color-secondary);
  }

  .filter-btn.active {
    background: var(--color-secondary);
    border-color: var(--color-secondary);
    color: white;
  }

  .jobs-grid {
    display: grid;
    gap: var(--space-xl);
  }

  .loading,
  .no-jobs {
    text-align: center;
    padding: var(--space-4xl) var(--space-lg);
  }

  .loading p,
  .no-jobs p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    color: var(--color-text-muted);
    margin: 0;
  }

  .no-jobs .sub-message {
    font-size: var(--font-size-base);
    color: var(--color-text-light);
    margin-top: var(--space-sm);
  }

  @media (max-width: 768px) {
    .jobs-section {
      padding: var(--space-2xl) 0;
    }

    .section-header :global(h2) {
      font-size: var(--font-size-3xl);
    }

    .filters {
      margin-bottom: var(--space-2xl);
    }

    .filter-btn {
      font-size: var(--font-size-xs);
      padding: var(--space-xs) var(--space-md);
    }
  }
</style>