<!-- src/routes/en/datenschutz/+page.svelte -->
<script>
  import { currentLanguage } from "$lib/stores/i18n.js";
  import { onMount } from "svelte";
  import { fetchContactInfo } from "$lib/utils/content.js";

  let contactInfo = null;

  onMount(async () => {
    // Redirect German users to German version
    if ($currentLanguage === "de") {
      window.location.href = "/datenschutz";
    }

    contactInfo = await fetchContactInfo();
  });
</script>

<svelte:head>
  <title>Privacy Policy - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Privacy Policy of Hotel Ludwig van Beethoven Berlin. Information about the handling of your personal data."
  />
</svelte:head>

<div class="privacy-container">
  <div class="container">
    <div class="privacy-content">
      <h1 class="heading-accent-center">Privacy Policy</h1>

      <section>
        <h2 class="heading-accent">1. Data Controller</h2>
        <p>
          Responsible for data processing on this website:<br /><br />
          {#if contactInfo}
            {contactInfo.hotelName}<br />
            {#if contactInfo.ownerName}
              Owner: {contactInfo.ownerName}<br />
            {/if}
            {contactInfo.address.street}<br />
            {contactInfo.address.city}<br />
            {contactInfo.address.countryEn}<br /><br />
            Phone: {contactInfo.phone.display}<br />
            Email: {contactInfo.email.main}
          {/if}
        </p>
      </section>

      <section>
        <h2 class="heading-accent">2. General Information</h2>
        <p>
          The protection of your personal data is of particular concern to us.
          We therefore process your data exclusively on the basis of legal
          provisions (GDPR, German Telemedia Act). In this privacy policy, we
          inform you about the most important aspects of data processing within
          the scope of our website.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">3. Collection of General Information</h2>
        <p>
          When you access our website, information of a general nature is
          automatically recorded. This information (server log files) includes
          the type of web browser, the operating system used, the domain name of
          your Internet service provider, and similar. This is exclusively
          information that does not allow any conclusions to be drawn about your
          person.
        </p>
        <p>
          This information is technically necessary to correctly deliver the
          content of web pages requested by you and is mandatory when using the
          internet. Anonymous information of this kind is statistically
          evaluated by us to optimize our website and the underlying technology.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">4. Storage of Settings (localStorage)</h2>
        <p>
          Our website uses your browser's local storage (localStorage) to save
          your language preference. This function serves exclusively to display
          your preferred language when you visit our website repeatedly.
        </p>
        <p>
          <strong>Legal basis:</strong> Processing is carried out in accordance with
          Art. 6 para. 1 lit. f GDPR based on our legitimate interest in a user-friendly
          design of our website.
        </p>
        <p>
          You can delete the stored data at any time in your browser settings.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">
          5. Service Worker (Offline Functionality)
        </h2>
        <p>
          Our website uses a Service Worker to cache certain content and improve
          performance. The Service Worker stores static resources such as images
          and stylesheets locally in your browser cache.
        </p>
        <p>
          This technology allows parts of our website to remain available even
          with a poor internet connection. No personal data is processed or
          transmitted.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">6. Integration of External Services</h2>

        <h3 class="heading-accent">6.1 Google Fonts</h3>
        <p>
          Our website uses web fonts provided by Google for uniform display of
          fonts. When you access a page, your browser loads the required web
          fonts into your browser cache to display texts and fonts correctly.
        </p>
        <p>
          For this purpose, the browser you use must connect to Google's
          servers. This gives Google knowledge that our website has been
          accessed via your IP address.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6 para. 1 lit. f GDPR (legitimate interest
          in the optimized presentation of our website).
        </p>

        <h3 class="heading-accent">6.2 Prismic (Content Management)</h3>
        <p>
          We use Prismic as a content management system. When loading images and
          content, these are retrieved from Prismic servers. Your IP address is
          transmitted to Prismic, which is technically necessary to provide the
          content.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6 para. 1 lit. f GDPR (legitimate interest
          in efficient content management).
        </p>

        <h3 class="heading-accent">6.3 Customer Alliance (Reviews)</h3>
        <p>
          On our reviews page, we display guest reviews retrieved via Customer
          Alliance. When you access the reviews page, the review data is loaded
          from Customer Alliance servers. Your IP address is transmitted for
          technical reasons.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6 para. 1 lit. f GDPR (legitimate interest
          in displaying authentic guest reviews).
        </p>
      </section>

      <section>
        <h2 class="heading-accent">7. Your Rights</h2>
        <p>
          You generally have the rights to information, correction, deletion,
          restriction, data portability, revocation and objection regarding your
          data stored by us.
        </p>
        <p>You have the following rights:</p>
        <ul>
          <li>
            <strong>Right to information (Art. 15 GDPR):</strong> You can request
            information about your personal data processed by us.
          </li>
          <li>
            <strong>Right to rectification (Art. 16 GDPR):</strong> You can demand
            the correction of incorrect or completion of your personal data stored
            by us.
          </li>
          <li>
            <strong>Right to erasure (Art. 17 GDPR):</strong> You can demand the
            deletion of your personal data stored by us.
          </li>
          <li>
            <strong>Right to restriction (Art. 18 GDPR):</strong> You can demand
            the restriction of the processing of your personal data.
          </li>
          <li>
            <strong>Right to data portability (Art. 20 GDPR):</strong> You can request
            that we provide you with your personal data in a structured, common and
            machine-readable format.
          </li>
          <li>
            <strong>Right to object (Art. 21 GDPR):</strong> You can object to the
            processing of your personal data.
          </li>
          <li>
            <strong>Right to complain:</strong> You have the right to complain to
            a data protection supervisory authority.
          </li>
        </ul>
        <p>
          If you believe that the processing of your data violates data
          protection law or your data protection rights have been violated in
          any other way, you can complain to us or to the data protection
          authority.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">8. Contact</h2>
        <p>
          If you have any questions about the collection, processing or use of
          your personal data, for information, correction, restriction or
          deletion of data, as well as revocation of consent granted, please
          contact us at:
        </p>
        {#if contactInfo}
          <p>
            {contactInfo.hotelName}<br />
            {#if contactInfo.ownerName}
              Owner: {contactInfo.ownerName}<br />
            {/if}
            {contactInfo.address.street}<br />
            {contactInfo.address.city}<br />
            Email: {contactInfo.email.main}<br />
            Phone: {contactInfo.phone.display}
          </p>
        {/if}
      </section>

      <section>
        <h2 class="heading-accent">9. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to adapt this privacy policy so that it always
          complies with current legal requirements or to implement changes to
          our services in the privacy policy, e.g. when introducing new
          services. The new privacy policy will then apply to your next visit.
        </p>
      </section>

      <p class="privacy-date">Last updated: November 2024</p>
    </div>
  </div>
</div>

<style>
  .privacy-container {
    background-color: var(--color-background);
    padding: var(--space-3xl) 0;
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
    margin-bottom: var(--space-2xl);
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-top: var(--space-2xl);
    margin-bottom: var(--space-lg);
    letter-spacing: -0.01em;
  }

  h3.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);
    letter-spacing: -0.01em;
  }

  section {
    padding: var(--space-xl) 0;
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
    margin-bottom: var(--space-md);
    max-width: 70ch;
  }

  ul {
    margin: var(--space-lg) 0;
    padding-left: var(--space-xl);
    max-width: 70ch;
  }

  li {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  strong {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  .privacy-date {
    margin-top: var(--space-2xl);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--color-border-light);
    font-style: italic;
    color: var(--color-text-light);
    text-align: center;
    font-size: var(--font-size-base);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .privacy-container {
      padding: var(--space-2xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    section {
      padding: var(--space-lg) 0;
    }

    h1.heading-accent {
      margin-bottom: var(--space-xl);
    }

    h2.heading-accent {
      font-size: var(--font-size-xl);
      margin-top: var(--space-xl);
    }

    h3.heading-accent {
      font-size: var(--font-size-lg);
      margin-top: var(--space-lg);
    }

    p,
    li {
      font-size: var(--font-size-base);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }
  }
</style>
