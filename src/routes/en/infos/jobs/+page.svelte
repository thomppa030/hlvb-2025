<!-- src/routes/en/infos/jobs/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import JobCard from "$lib/components/ui/JobCard.svelte";
  import Icon from "$lib/components/ui/Icon.svelte";
  import { currentLanguage, t } from "$lib/stores/i18n.js";
  import {
    fetchJobs,
    getJobDepartments,
    fetchContactInfo,
  } from "$lib/utils/content.js";

  let jobs = [];
  let selectedCategory = "all";
  let expandedJobs = new Set();
  let loading = true;
  let categories = ["all"];
  let contactInfo = null;

  $: filteredJobs =
    selectedCategory === "all"
      ? jobs
      : jobs.filter((job) => job.department === selectedCategory);

  onMount(async () => {
    await loadJobs();
  });

  async function loadJobs() {
    loading = true;
    try {
      const lang = $currentLanguage;

      // Fetch jobs and contact info in parallel
      const [jobsData, contact, departments] = await Promise.all([
        fetchJobs(lang),
        fetchContactInfo(),
        getJobDepartments(lang),
      ]);

      jobs = jobsData;
      contactInfo = contact;
      categories = ["all", ...departments];

      loading = false;
    } catch (error) {
      console.error("Error loading jobs:", error);
      jobs = [];
      loading = false;
    }
  }

  function toggleJobExpansion(jobId) {
    if (expandedJobs.has(jobId)) {
      expandedJobs.delete(jobId);
    } else {
      expandedJobs.add(jobId);
    }
    expandedJobs = expandedJobs;
  }

  // React to language changes
  $: if ($currentLanguage) {
    loadJobs();
  }
</script>

<svelte:head>
  <title>Job Opportunities - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Current job openings at Hotel Ludwig van Beethoven Berlin. Applications for reception, service and housekeeping positions."
  />
</svelte:head>

<div class="jobs-container">
  <div class="container">
    <header class="jobs-header">
      <h1 class="heading-accent-center">Job Opportunities</h1>
      <p class="intro-text">
        Become part of our team! We offer you a family-friendly working
        environment in one of Berlin's most charming hotels. Discover our
        current job openings and apply today.
      </p>
    </header>

    <div class="jobs-content">
      <!-- Filter Section -->
      <div class="filter-section">
        <h2>Filter by Department</h2>
        <div class="filter-buttons">
          {#each categories as category}
            <button
              class="filter-btn"
              class:active={selectedCategory === category}
              on:click={() => (selectedCategory = category)}
            >
              {#if category === "all"}
                All Positions
              {:else}
                {category}
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Jobs List -->
      <div class="jobs-list">
        {#if loading}
          <div class="loading-jobs">
            <h3>Loading job opportunities...</h3>
            <p>Please wait a moment.</p>
          </div>
        {:else if filteredJobs.length > 0}
          {#each filteredJobs as job}
            <JobCard
              {job}
              expanded={expandedJobs.has(job.id)}
              on:click={() => toggleJobExpansion(job.id)}
            />
          {/each}
        {:else if jobs.length === 0}
          <div class="no-jobs">
            <h3>No Job Opportunities Available</h3>
            <p>
              Currently there are no open positions available. Please check back
              regularly or send us a speculative application!
            </p>
          </div>
        {:else}
          <div class="no-jobs">
            <h3>No Positions in This Category</h3>
            <p>
              There are currently no positions available in the "{selectedCategory}"
              category. Please select another category or check "All Positions".
            </p>
          </div>
        {/if}
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <h2 class="heading-accent-center">Speculative Applications</h2>
        <div class="contact-content">
          <div class="contact-text">
            <p>
              Didn't find the right position? We also welcome speculative
              applications! Send us your complete application documents and we
              will get back to you as soon as a suitable position becomes
              available.
            </p>
            <p>
              <strong>What we offer:</strong>
            </p>
            <ul>
              <li>
                Family-like working atmosphere in a traditional Berlin hotel
              </li>
              <li>Flexible working hours and work-life balance</li>
              <li>Training opportunities and career development</li>
              <li>Attractive compensation according to tariff</li>
              <li>Company benefits</li>
            </ul>
          </div>
          <div class="contact-info">
            <h3>Application Contact</h3>
            <div class="contact-details">
              {#if contactInfo}
                <div class="contact-detail-item">
                  <div class="contact-icon">
                    <Icon name="email" size={24} />
                  </div>
                  <div class="contact-detail-text">
                    <strong>Email:</strong><br />
                    <a href="mailto:{contactInfo.email.jobsEn}">
                      {contactInfo.email.jobsEn}
                    </a>
                  </div>
                </div>
                <div class="contact-detail-item">
                  <div class="contact-icon">
                    <Icon name="phone" size={24} />
                  </div>
                  <div class="contact-detail-text">
                    <strong>Phone:</strong><br />
                    <a href="tel:{contactInfo.phone.main}"
                      >{contactInfo.phone.display}</a
                    >
                  </div>
                </div>
                <div class="contact-detail-item">
                  <div class="contact-icon">
                    <Icon name="address" size={24} />
                  </div>
                  <div class="contact-detail-text">
                    <strong>Mail:</strong><br />
                    {contactInfo.hotelName}<br />
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}<br />
                    {contactInfo.address.countryEn}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .jobs-container {
    background-color: var(--color-background);
    padding: var(--space-5xl) 0;
    min-height: 80vh;
  }

  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .jobs-header {
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
  }

  .filter-section h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
  }

  .filter-buttons {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }

  .filter-btn {
    background: var(--color-background-elevated);
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

  .jobs-list {
    margin-bottom: var(--space-5xl);
  }

  .no-jobs,
  .loading-jobs {
    text-align: center;
    padding: var(--space-5xl) var(--space-xl);
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .no-jobs h3,
  .loading-jobs h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .no-jobs p,
  .loading-jobs p {
    font-family: var(--font-primary);
    color: var(--color-text-light);
    line-height: var(--line-height-relaxed);
  }

  .loading-jobs {
    border-color: var(--color-secondary-light);
    background: var(--color-background-alt);
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
    grid-template-columns: 1fr 350px;
    gap: var(--space-4xl);
    align-items: start;
  }

  .contact-text p {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
  }

  .contact-text ul {
    margin: var(--space-lg) 0;
    padding-left: var(--space-xl);
  }

  .contact-text li {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-sm);
  }

  .contact-info {
    background: var(--color-background-alt);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .contact-info h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
  }

  .contact-detail-item {
    display: flex;
    gap: var(--space-md);
    align-items: flex-start;
    margin-bottom: var(--space-lg);
  }

  .contact-detail-item:last-child {
    margin-bottom: 0;
  }

  .contact-icon {
    flex-shrink: 0;
    color: var(--color-secondary);
    margin-top: 2px;
  }

  .contact-detail-text {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
  }

  .contact-details a {
    color: var(--color-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-secondary-light);
    transition: var(--transition-fast);
  }

  .contact-details a:hover {
    color: var(--color-secondary-light);
    border-bottom-color: var(--color-secondary-light);
  }

  strong {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .jobs-container {
      padding: var(--space-4xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .jobs-header {
      margin-bottom: var(--space-4xl);
    }

    .contact-content {
      grid-template-columns: 1fr;
      gap: var(--space-3xl);
    }

    .contact-section {
      padding: var(--space-3xl);
    }

    .filter-buttons {
      justify-content: center;
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

    .contact-section {
      padding: var(--space-2xl);
    }

    .contact-info {
      padding: var(--space-lg);
    }

    .filter-btn {
      padding: var(--space-xs) var(--space-md);
      font-size: var(--font-size-xs);
    }
  }
</style>

