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
    padding: var(--space-5xl) 0;
    min-height: 80vh;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }


  h1.heading-accent {
    font-family: var(--font-display);
    font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4xl);
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-top: var(--space-4xl);
    margin-bottom: var(--space-xl);
    letter-spacing: -0.01em;
  }

  section {
    padding: var(--space-3xl) 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  section:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    max-width: 70ch;
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
    color: var(--color-secondary-light);
    border-bottom-color: var(--color-secondary-light);
    transform: translateY(-1px);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .impressum-page {
      padding: var(--space-4xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    section {
      padding: var(--space-2xl) 0;
    }

    h1.heading-accent {
      margin-bottom: var(--space-3xl);
    }

    h2.heading-accent {
      font-size: var(--font-size-xl);
      margin-top: var(--space-3xl);
    }

    p {
      font-size: var(--font-size-base);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }
  }
</style>