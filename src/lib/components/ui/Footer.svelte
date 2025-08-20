<!-- src/lib/components/ui/Footer.svelte -->
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="hotel-info">
        <h3 class="brand-name">Hotel Ludwig van Beethoven</h3>
        <p class="address">Hasenheide 14, 10967 Berlin</p>
        <p class="contact">
          <a href="tel:+49306957000">+49 (0)30 69 57 00-0</a> •
          <a href="mailto:info@hotellvb.de">info@hotellvb.de</a>
        </p>
      </div>

      <div class="footer-links">
        <a href="/impressum">Impressum</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>
        &copy; {new Date().getFullYear()} Hotel Ludwig van Beethoven - Berlin
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-background-alt);
    border-top: 1px solid var(--color-border-light);
    margin-top: var(--space-4xl);
    padding: var(--space-3xl) 0 var(--space-xl);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
  }

  .brand-name {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xs);
  }

  .address,
  .contact {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin: 0;
  }

  .contact {
    margin-top: var(--space-xs);
  }

  .contact a {
    color: var(--color-text-light);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .contact a:hover {
    color: var(--color-secondary);
  }

  .footer-links a {
    color: var(--color-text-light);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }

  .footer-links a:hover {
    color: var(--color-secondary);
  }

  .footer-bottom {
    border-top: 1px solid var(--color-border-light);
    padding-top: var(--space-lg);
    text-align: center;
  }

  .footer-bottom p {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin: 0;
  }


  /* Responsive Design */
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: var(--space-md);
      text-align: center;
    }
  }
</style>

