<!-- src/routes/en/datenschutz/+page.svelte -->
<script>
  import { currentLanguage } from "$lib/stores/i18n.js";
  import { onMount } from "svelte";

  onMount(() => {
    // Redirect German users to German version
    if ($currentLanguage === "de") {
      window.location.href = "/datenschutz";
    }
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
  <div class="privacy-content">
    <h1>Privacy Policy</h1>

    <section>
      <h2>1. Data Controller</h2>
      <p>
        Responsible for data processing on this website:<br /><br />
        Hotel Ludwig van Beethoven<br />
        Hasenheide 14<br />
        10967 Berlin<br />
        Germany<br /><br />
        Phone: +49 30 695 066 0<br />
        Email: info@hotel-ludwig-van-beethoven.de
      </p>
    </section>

    <section>
      <h2>2. General Information</h2>
      <p>
        The protection of your personal data is of particular concern to us. We
        therefore process your data exclusively on the basis of legal provisions
        (GDPR, German Telemedia Act). In this privacy policy, we inform you
        about the most important aspects of data processing within the scope of
        our website.
      </p>
    </section>

    <section>
      <h2>3. Collection of General Information</h2>
      <p>
        When you access our website, information of a general nature is
        automatically recorded. This information (server log files) includes the
        type of web browser, the operating system used, the domain name of your
        Internet service provider, and similar. This is exclusively information
        that does not allow any conclusions to be drawn about your person.
      </p>
      <p>
        This information is technically necessary to correctly deliver the
        content of web pages requested by you and is mandatory when using the
        internet. Anonymous information of this kind is statistically evaluated
        by us to optimize our website and the underlying technology.
      </p>
    </section>

    <section>
      <h2>4. Storage of Settings (localStorage)</h2>
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
      <h2>5. Service Worker (Offline Functionality)</h2>
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
      <h2>6. Integration of External Services</h2>

      <h3>6.1 Google Fonts</h3>
      <p>
        Our website uses web fonts provided by Google for uniform display of
        fonts. When you access a page, your browser loads the required web fonts
        into your browser cache to display texts and fonts correctly.
      </p>
      <p>
        For this purpose, the browser you use must connect to Google's servers.
        This gives Google knowledge that our website has been accessed via your
        IP address.
      </p>
      <p>
        <strong>Legal basis:</strong> Art. 6 para. 1 lit. f GDPR (legitimate interest
        in the optimized presentation of our website).
      </p>

      <h3>6.2 Prismic (Content Management)</h3>
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

      <h3>6.3 Customer Alliance (Reviews)</h3>
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
      <h2>7. Your Rights</h2>
      <p>
        You generally have the rights to information, correction, deletion,
        restriction, data portability, revocation and objection regarding your
        data stored by us.
      </p>
      <p>You have the following rights:</p>
      <ul>
        <li>
          <strong>Right to information (Art. 15 GDPR):</strong> You can request information
          about your personal data processed by us.
        </li>
        <li>
          <strong>Right to rectification (Art. 16 GDPR):</strong> You can demand
          the correction of incorrect or completion of your personal data stored
          by us.
        </li>
        <li>
          <strong>Right to erasure (Art. 17 GDPR):</strong> You can demand the deletion
          of your personal data stored by us.
        </li>
        <li>
          <strong>Right to restriction (Art. 18 GDPR):</strong> You can demand the
          restriction of the processing of your personal data.
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
          <strong>Right to complain:</strong> You have the right to complain to a
          data protection supervisory authority.
        </li>
      </ul>
      <p>
        If you believe that the processing of your data violates data protection
        law or your data protection rights have been violated in any other way,
        you can complain to us or to the data protection authority.
      </p>
    </section>

    <section>
      <h2>8. Contact</h2>
      <p>
        If you have any questions about the collection, processing or use of
        your personal data, for information, correction, restriction or deletion
        of data, as well as revocation of consent granted, please contact us at:
      </p>
      <p>
        Hotel Ludwig van Beethoven<br />
        Hasenheide 14<br />
        10967 Berlin<br />
        Email: info@hotel-ludwig-van-beethoven.de<br />
        Phone: +49 30 695 066 0
      </p>
    </section>

    <section>
      <h2>9. Changes to This Privacy Policy</h2>
      <p>
        We reserve the right to adapt this privacy policy so that it always
        complies with current legal requirements or to implement changes to our
        services in the privacy policy, e.g. when introducing new services. The
        new privacy policy will then apply to your next visit.
      </p>
    </section>

    <p class="privacy-date">Last updated: November 2024</p>
  </div>
</div>

<style>
  .privacy-container {
    min-height: calc(100vh - 200px);
    padding: var(--spacing-4xl) var(--spacing-xl);
    background-color: var(--color-surface);
  }

  .privacy-content {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: var(--spacing-3xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  h1 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--spacing-2xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 2px solid var(--color-border);
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-text);
    margin-top: var(--spacing-2xl);
    margin-bottom: var(--spacing-lg);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text);
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
  }

  section {
    margin-bottom: var(--spacing-2xl);
  }

  p {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-md);
  }

  ul {
    margin: var(--spacing-md) 0;
    padding-left: var(--spacing-xl);
  }

  li {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
  }

  strong {
    color: var(--color-text);
    font-weight: 600;
  }

  .privacy-date {
    margin-top: var(--spacing-3xl);
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--color-border);
    font-style: italic;
    color: var(--color-text-tertiary);
  }

  @media (max-width: 768px) {
    .privacy-container {
      padding: var(--spacing-2xl) var(--spacing-lg);
    }

    .privacy-content {
      padding: var(--spacing-xl);
    }

    h1 {
      font-size: var(--text-2xl);
    }

    h2 {
      font-size: var(--text-lg);
    }
  }
</style>

