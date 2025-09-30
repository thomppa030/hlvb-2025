<!-- src/lib/components/ui/Footer.svelte -->
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { currentLanguage, t } from '$lib/stores/i18n.js';
  import { fetchContactInfo } from '$lib/utils/content.js';

  let contactInfo = null;

  onMount(async () => {
    contactInfo = await fetchContactInfo();
  });

  $: isEnglish = $page.url.pathname.startsWith('/en') || $currentLanguage === 'en';
  $: impressumLink = isEnglish ? '/en/impressum' : '/impressum';
  $: privacyLink = isEnglish ? '/en/datenschutz' : '/datenschutz';
  $: privacyText = isEnglish ? 'Privacy' : 'Datenschutz';
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="hotel-info">
        {#if contactInfo}
          <h3 class="brand-name">{contactInfo.hotelName}</h3>
          <p class="address">{contactInfo.address.street}, {contactInfo.address.city}</p>
          <p class="contact">
            <a href="tel:{contactInfo.phone.main}">{contactInfo.phone.display}</a> •
            <a href="mailto:{contactInfo.email.main}">{contactInfo.email.main}</a>
          </p>
        {/if}
      </div>

      <div class="footer-links">
        <a href={impressumLink}>{$t('footer.impressum')}</a>
        <span class="separator">•</span>
        <a href={privacyLink}>{privacyText}</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>
        {#if contactInfo}
          &copy; {new Date().getFullYear()} {contactInfo.hotelName} - Berlin
        {:else}
          &copy; {new Date().getFullYear()} Hotel Ludwig van Beethoven - Berlin
        {/if}
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

  .footer-links .separator {
    color: var(--color-text-light);
    font-size: var(--font-size-sm);
    margin: 0 var(--space-xs);
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
