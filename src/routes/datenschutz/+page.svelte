<!-- src/routes/datenschutz/+page.svelte -->
<script>
  import { currentLanguage } from "$lib/stores/i18n.js";
  import { onMount } from "svelte";
  import { fetchContactInfo } from "$lib/utils/content.js";

  let contactInfo = null;

  onMount(async () => {
    // Redirect English users to English version
    if ($currentLanguage === "en") {
      window.location.href = "/en/datenschutz";
    }

    contactInfo = await fetchContactInfo();
  });
</script>

<svelte:head>
  <title>Datenschutzerklärung - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Datenschutzerklärung des Hotel Ludwig van Beethoven Berlin. Informationen zum Umgang mit Ihren personenbezogenen Daten."
  />
</svelte:head>

<div class="privacy-container">
  <div class="container">
    <div class="privacy-content">
      <h1 class="heading-accent-center">Datenschutzerklärung</h1>

      <section>
        <h2 class="heading-accent">1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br
          /><br />
          {#if contactInfo}
            {contactInfo.hotelName}<br />
            {#if contactInfo.ownerName}
              Inhaber: {contactInfo.ownerName}<br />
            {/if}
            {contactInfo.address.street}<br />
            {contactInfo.address.city}<br />
            {contactInfo.address.countryDe}<br /><br />
            Telefon: {contactInfo.phone.display}<br />
            E-Mail: {contactInfo.email.main}
          {/if}
        </p>
      </section>

      <section>
        <h2 class="heading-accent">2. Allgemeine Hinweise</h2>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
          Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der
          gesetzlichen Bestimmungen (DSGVO, TKG). In dieser Datenschutzerklärung
          informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung
          im Rahmen unserer Website.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">3. Erfassung allgemeiner Informationen</h2>
        <p>
          Wenn Sie auf unsere Website zugreifen, werden automatisch
          Informationen allgemeiner Natur erfasst. Diese Informationen
          (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das
          verwendete Betriebssystem, den Domainnamen Ihres Internet Service
          Providers und Ähnliches. Hierbei handelt es sich ausschließlich um
          Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.
        </p>
        <p>
          Diese Informationen sind technisch notwendig, um von Ihnen
          angeforderte Inhalte von Webseiten korrekt auszuliefern und fallen bei
          Nutzung des Internets zwingend an. Anonyme Informationen dieser Art
          werden von uns statistisch ausgewertet, um unseren Internetauftritt
          und die dahinterstehende Technik zu optimieren.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">
          4. Speicherung von Einstellungen (localStorage)
        </h2>
        <p>
          Unsere Website verwendet die lokale Speicherung Ihres Browsers
          (localStorage), um Ihre Spracheinstellung zu speichern. Diese Funktion
          dient ausschließlich dazu, Ihnen bei wiederholten Besuchen unserer
          Website die von Ihnen bevorzugte Sprache anzuzeigen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt gemäß Art. 6
          Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an einer
          nutzerfreundlichen Gestaltung unserer Website.
        </p>
        <p>
          Sie können die gespeicherten Daten jederzeit in Ihren
          Browsereinstellungen löschen.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">
          5. Service Worker (Offline-Funktionalität)
        </h2>
        <p>
          Unsere Website verwendet einen Service Worker, um bestimmte Inhalte
          zwischenzuspeichern und die Performance zu verbessern. Der Service
          Worker speichert statische Ressourcen wie Bilder und Stylesheets lokal
          in Ihrem Browser-Cache.
        </p>
        <p>
          Diese Technologie ermöglicht es, dass Teile unserer Website auch bei
          schlechter Internetverbindung verfügbar bleiben. Es werden dabei keine
          personenbezogenen Daten verarbeitet oder übertragen.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">6. Einbindung externer Dienste</h2>

        <h3 class="heading-accent">6.1 Google Fonts</h3>
        <p>
          Unsere Website nutzt zur einheitlichen Darstellung von Schriftarten so
          genannte Web Fonts, die von Google bereitgestellt werden. Beim Abrufen
          einer Seite lädt Ihr Browser die benötigten Web Fonts in Ihren
          Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
        </p>
        <p>
          Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu
          den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis
          darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der optimierten Darstellung unserer Website).
        </p>

        <h3 class="heading-accent">6.2 Prismic (Content Management)</h3>
        <p>
          Wir verwenden Prismic als Content-Management-System. Beim Laden von
          Bildern und Inhalten werden diese von Prismic-Servern abgerufen. Dabei
          wird Ihre IP-Adresse an Prismic übertragen, was technisch notwendig
          ist, um die Inhalte bereitzustellen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an effizienter Content-Verwaltung).
        </p>

        <h3 class="heading-accent">6.3 Customer Alliance (Bewertungen)</h3>
        <p>
          Auf unserer Bewertungsseite zeigen wir Gästebewertungen an, die über
          Customer Alliance abgerufen werden. Beim Aufruf der Bewertungsseite
          werden die Bewertungsdaten von Customer Alliance-Servern geladen.
          Dabei wird Ihre IP-Adresse technisch bedingt übertragen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Darstellung authentischer Gästebewertungen).
        </p>
      </section>

      <section>
        <h2 class="heading-accent">7. Ihre Rechte</h2>
        <p>
          Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich
          die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
          Datenübertragbarkeit, Widerruf und Widerspruch zu.
        </p>
        <p>Sie haben folgende Rechte:</p>
        <ul>
          <li>
            <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft
            über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die
            Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten
            personenbezogenen Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung
            Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Einschränkung (Art. 18 DSGVO):</strong> Sie können
            die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie
            können verlangen, dass wir Ihnen Ihre personenbezogenen Daten in einem
            strukturierten, gängigen und maschinenlesbaren Format zur Verfügung stellen.
          </li>
          <li>
            <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung
            Ihrer personenbezogenen Daten widersprechen.
          </li>
          <li>
            <strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde zu beschweren.
          </li>
        </ul>
        <p>
          Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das
          Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche
          sonst in einer Weise verletzt worden sind, können Sie sich bei uns
          oder bei der Datenschutzbehörde beschweren.
        </p>
      </section>

      <section>
        <h2 class="heading-accent">8. Kontakt</h2>
        <p>
          Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
          personenbezogenen Daten, bei Auskünften, Berichtigung, Einschränkung
          oder Löschung von Daten sowie Widerruf erteilter Einwilligungen
          kontaktieren Sie uns bitte unter:
        </p>
        {#if contactInfo}
          <p>
            {contactInfo.hotelName}<br />
            {#if contactInfo.ownerName}
              Inhaber: {contactInfo.ownerName}<br />
            {/if}
            {contactInfo.address.street}<br />
            {contactInfo.address.city}<br />
            E-Mail: {contactInfo.email.main}<br />
            Telefon: {contactInfo.phone.display}
          </p>
        {/if}
      </section>

      <section>
        <h2 class="heading-accent">
          9. Änderungen dieser Datenschutzerklärung
        </h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
          stets den aktuellen rechtlichen Anforderungen entspricht oder um
          Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
          z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt
          dann die neue Datenschutzerklärung.
        </p>
      </section>

      <p class="privacy-date">Stand: November 2024</p>
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

