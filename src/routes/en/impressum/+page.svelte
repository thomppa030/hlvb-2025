<script>
  import { t } from '$lib/stores/i18n.js';
</script>

<svelte:head>
  <title>Legal Notice | Hotel Ludwig van Beethoven</title>
</svelte:head>

<div class="impressum-page">
  <div class="container">
    <div class="impressum-content">
      <h1 class="heading-accent">Legal Notice</h1>

      <section>
        <h2 class="heading-accent">Information according to § 5 TMG</h2>
        <p>
          <strong>Hotel Ludwig van Beethoven</strong><br>
          Hasenheide 14<br>
          10967 Berlin<br>
          Germany
        </p>
      </section>

      <section>
        <h2 class="heading-accent">Contact</h2>
        <p>
          Phone: +49 30 695 066 0<br>
          Email: info@hotel-ludwig-van-beethoven.de<br>
          Website: <a href="https://hotellvb.de">hotellvb.de</a>
        </p>
      </section>

      <section>
        <h2 class="heading-accent">VAT ID</h2>
        <p>
          VAT identification number according to § 27 a VAT Act:<br>
          DE123456789
        </p>
      </section>

      <section>
        <h2 class="heading-accent">Responsible for content according to § 55 Abs. 2 RStV</h2>
        <p>
          Hotel Ludwig van Beethoven<br>
          Hasenheide 14<br>
          10967 Berlin
        </p>
      </section>
    </div>
  </div>
</div>

<style>
  .impressum-page {
    background-color: var(--color-background);
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .impressum-content {
    background: var(--color-background-elevated);
    padding: var(--space-3xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-2xl);
    padding-bottom: var(--space-lg);
    border-bottom: 2px solid var(--color-border);
  }

  h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-top: var(--space-2xl);
    margin-bottom: var(--space-lg);
  }

  section {
    margin-bottom: var(--space-2xl);
  }

  p {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  strong {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  a {
    color: var(--color-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-secondary-light);
    transition: var(--transition-fast);
  }

  a:hover {
    color: var(--color-accent);
    border-bottom-color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .impressum-page {
      padding: var(--space-2xl) 0;
    }

    .impressum-content {
      padding: var(--space-xl);
    }

    h1 {
      font-size: var(--font-size-2xl);
    }

    h2 {
      font-size: var(--font-size-lg);
    }
  }
</style>