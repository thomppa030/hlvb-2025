<!-- src/routes/infos/jobs/+page.svelte -->
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
  <title>Stellenanzeigen - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Aktuelle Stellenanzeigen im Hotel Ludwig van Beethoven Berlin. Bewerbungen für Rezeption, Service und Housekeeping."
  />
</svelte:head>

<div class="jobs-container">
  <div class="container">
    <header class="jobs-header">
      <h1 class="heading-accent-center">Stellenanzeigen</h1>
      <p class="intro-text">
        Werden Sie Teil unseres Teams! Wir bieten Ihnen ein familiäres
        Arbeitsumfeld in einem der charmantesten Hotels Berlins. Entdecken Sie
        unsere aktuellen Stellenangebote und bewerben Sie sich noch heute.
      </p>
    </header>

    <div class="jobs-content">
      <!-- Filter Section -->
      <div class="filter-section">
        <h2>Filter nach Bereich</h2>
        <div class="filter-buttons">
          {#each categories as category}
            <button
              class="filter-btn"
              class:active={selectedCategory === category}
              on:click={() => (selectedCategory = category)}
            >
              {#if category === "all"}
                Alle Stellen
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
            <h3>Stellenanzeigen werden geladen...</h3>
            <p>Bitte warten Sie einen Moment.</p>
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
            <h3>Derzeit keine Stellenanzeigen verfügbar</h3>
            <p>
              Aktuell sind keine offenen Stellen ausgeschrieben. Schauen Sie
              gerne regelmäßig vorbei oder senden Sie uns eine
              Initiativbewerbung!
            </p>
          </div>
        {:else}
          <div class="no-jobs">
            <h3>Keine Stellen in dieser Kategorie</h3>
            <p>
              In der Kategorie "{selectedCategory}" sind aktuell keine Stellen
              verfügbar. Wählen Sie eine andere Kategorie oder schauen Sie unter
              "Alle Stellen".
            </p>
          </div>
        {/if}
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <h2 class="heading-accent-center">Initiativbewerbung</h2>
        <div class="contact-content">
          <div class="contact-text">
            <p>
              Sie haben die passende Stelle nicht gefunden? Wir freuen uns auch
              über Initiativbewerbungen! Senden Sie uns Ihre vollständigen
              Bewerbungsunterlagen und wir melden uns bei Ihnen, sobald eine
              passende Position frei wird.
            </p>
            <p>
              <strong>Was wir bieten:</strong>
            </p>
            <ul>
              <li>
                Familiäres Arbeitsklima in einem traditionellen Berliner Hotel
              </li>
              <li>Flexible Arbeitszeiten und Work-Life-Balance</li>
              <li>Fortbildungsmöglichkeiten und Karriereentwicklung</li>
              <li>Attraktive Vergütung nach Tarif</li>
              <li>Betriebliche Zusatzleistungen</li>
            </ul>
          </div>
          <div class="contact-info">
            <h3>Kontakt für Bewerbungen</h3>
            <div class="contact-details">
              {#if contactInfo}
                <div class="contact-detail-item">
                  <div class="contact-icon">
                    <Icon name="email" size={24} />
                  </div>
                  <div class="contact-detail-text">
                    <strong>E-Mail:</strong><br />
                    <a href="mailto:{contactInfo.email.jobs}">
                      {contactInfo.email.jobs}
                    </a>
                  </div>
                </div>
                <div class="contact-detail-item">
                  <div class="contact-icon">
                    <Icon name="phone" size={24} />
                  </div>
                  <div class="contact-detail-text">
                    <strong>Telefon:</strong><br />
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
                    <strong>Post:</strong><br />
                    {contactInfo.hotelName}<br />
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}
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

