<!-- src/routes/+page.svelte -->
<script>
  // Basic home page to test the setup
</script>

<svelte:head>
  <title>Luxury Hotel - Home</title>
  <meta name="description" content="Welcome to our luxury hotel" />
</svelte:head>

<div class="home-page">
  <div class="container">
    <section class="hero section">
      <h1>Welcome to Luxury Hotel</h1>
      <p>Experience unparalleled comfort and elegance</p>
      <div class="hero-actions">
        <a href="/reviews" class="btn btn--primary btn--large">Guest Reviews</a>
        <a href="/test" class="btn btn--outline btn--large">View Test Page</a>
      </div>
    </section>

    <section class="intro section">
      <div class="intro-content">
        <h2>Testing Your Setup</h2>
        <p>
          This is a basic homepage to verify your SvelteKit + Deno setup is
          working correctly.
        </p>
        <p>
          Navigate to <a href="/test">/test</a> to see the complete design system
          test page.
        </p>
      </div>
    </section>
  </div>
</div>

<style>
  .hero {
    text-align: center;
    padding: var(--space-5xl) 0;
  }

  .hero h1 {
    margin-bottom: var(--space-lg);
    color: var(--color-primary);
  }

  .hero p {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-2xl);
    color: var(--color-text-light);
  }

  .hero-actions {
    display: flex;
    gap: var(--space-lg);
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-md) var(--space-xl);
    font-family: var(--font-primary);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    border: none;
    cursor: pointer;
  }

  .btn--primary {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  .btn--primary:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn--outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn--outline:hover {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  .btn--large {
    font-size: var(--font-size-lg);
    padding: var(--space-lg) var(--space-2xl);
  }

  .intro {
    text-align: center;
  }

  .intro h2 {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .intro p {
    margin-bottom: var(--space-md);
  }

  .intro a {
    color: var(--color-secondary);
    font-weight: var(--font-weight-medium);
  }

  .intro a:hover {
    color: var(--color-secondary-light);
  }

  @media (max-width: 768px) {
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
