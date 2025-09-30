<!-- src/lib/components/ui/JobCard.svelte -->
<script>
  import { t } from "$lib/stores/i18n.js";
  import Button from "./Button.svelte";

  export let job = {
    id: '',
    title: '',
    department: '',
    type: '',        // full-time, part-time, mini-job
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    contact: ''
  };
  export let expanded = false;

  function toggleExpanded() {
    expanded = !expanded;
  }

  // Format job type for display
  $: jobTypeClass = job.type?.toLowerCase().replace(/[^a-z]/g, '-') || 'unknown';
</script>

<article class="job-card" class:expanded>
  <header class="job-header">
    <div class="job-title-section">
      <h3 class="job-title">{job.title}</h3>
      <div class="job-meta">
        <span class="job-department">{job.department}</span>
        <span class="job-type job-type--{jobTypeClass}">{job.type}</span>
      </div>
    </div>
    <Button
      variant="ghost"
      size="small"
      on:click={toggleExpanded}
      ariaLabel={expanded ? $t('jobs.show_less') : $t('jobs.show_more')}
    >
      <span class="button-text">
        {expanded ? $t('jobs.show_less') : $t('jobs.show_more')}
      </span>
      <svg
        class="expand-icon"
        class:expanded
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Button>
  </header>

  {#if expanded}
    <div class="job-details">
      {#if job.description}
        <section class="job-section">
          <h4>{$t('jobs.description')}</h4>
          <p class="job-description">{job.description}</p>
        </section>
      {/if}

      {#if job.responsibilities?.length}
        <section class="job-section">
          <h4>{$t('jobs.responsibilities')}</h4>
          <ul class="job-list">
            {#each job.responsibilities as item}
              <li>{item}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if job.requirements?.length}
        <section class="job-section">
          <h4>{$t('jobs.requirements')}</h4>
          <ul class="job-list">
            {#each job.requirements as item}
              <li>{item}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if job.benefits?.length}
        <section class="job-section">
          <h4>{$t('jobs.benefits')}</h4>
          <ul class="job-list">
            {#each job.benefits as item}
              <li>{item}</li>
            {/each}
          </ul>
        </section>
      {/if}

      <footer class="job-footer">
        <Button
          variant="primary"
          size="medium"
          tag="a"
          href="mailto:{job.contact}?subject={encodeURIComponent($t('jobs.application_subject', job.title))}"
        >
          {$t('jobs.apply_now')}
        </Button>

        {#if job.contact}
          <p class="contact-info">
            {$t('jobs.contact_email')}:
            <a href="mailto:{job.contact}" class="contact-link">
              {job.contact}
            </a>
          </p>
        {/if}
      </footer>
    </div>
  {/if}
</article>

<style>
  .job-card {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-lg);
    transition: all var(--transition-normal);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.06);
  }

  .job-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .job-card.expanded {
    box-shadow: var(--shadow-lg);
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-lg);
  }

  .job-title-section {
    flex: 1;
  }

  .job-title {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin: 0 0 var(--space-sm) 0;
    line-height: var(--line-height-tight);
  }

  .job-meta {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
  }

  .job-department {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-weight: var(--font-weight-medium);
  }

  .job-type {
    font-size: var(--font-size-xs);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-full);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .job-type--vollzeit,
  .job-type--full-time {
    background-color: var(--color-secondary);
    color: var(--color-text-inverse);
  }

  .job-type--teilzeit,
  .job-type--part-time {
    background-color: var(--color-accent);
    color: var(--color-text-inverse);
  }

  .job-type--minijob,
  .job-type--mini-job {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  .job-type--unknown {
    background-color: var(--color-background-alt);
    color: var(--color-text);
  }

  :global(.job-card .button-text) {
    margin-right: var(--space-xs);
  }

  .expand-icon {
    transition: transform var(--transition-fast);
  }

  .expand-icon.expanded {
    transform: rotate(180deg);
  }

  .job-details {
    margin-top: var(--space-xl);
    padding-top: var(--space-xl);
    border-top: 1px solid var(--color-border-light);
  }

  .job-section {
    margin-bottom: var(--space-xl);
  }

  .job-section:last-of-type {
    margin-bottom: var(--space-2xl);
  }

  .job-section h4 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin: 0 0 var(--space-md) 0;
  }

  .job-description {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin: 0;
  }

  .job-list {
    margin: 0;
    padding-left: var(--space-xl);
    list-style: none;
  }

  .job-list li {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-sm);
    position: relative;
  }

  .job-list li::before {
    content: "•";
    color: var(--color-secondary);
    font-weight: var(--font-weight-bold);
    position: absolute;
    left: -var(--space-lg);
  }

  .job-footer {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    align-items: flex-start;
    padding-top: var(--space-xl);
    border-top: 1px solid var(--color-border-light);
  }

  .contact-info {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin: 0;
  }

  .contact-link {
    color: var(--color-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-secondary-light);
    transition: var(--transition-fast);
  }

  .contact-link:hover {
    color: var(--color-secondary-light);
    border-bottom-color: var(--color-secondary-light);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .job-card {
      padding: var(--space-lg);
      margin-bottom: var(--space-md);
    }

    .job-header {
      flex-direction: column;
      gap: var(--space-md);
      align-items: stretch;
    }

    .job-title {
      font-size: var(--font-size-lg);
    }

    .job-meta {
      gap: var(--space-sm);
    }

    .job-details {
      margin-top: var(--space-lg);
      padding-top: var(--space-lg);
    }

    .job-section {
      margin-bottom: var(--space-lg);
    }

    .job-footer {
      padding-top: var(--space-lg);
    }
  }

  @media (max-width: 480px) {
    .job-card {
      padding: var(--space-md);
    }

    .job-title {
      font-size: var(--font-size-base);
    }

    .job-type {
      font-size: var(--font-size-xs);
      padding: var(--space-xs);
    }
  }
</style>