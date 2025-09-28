<!-- src/routes/datenschutz/+page.svelte -->
<script>
  import { currentLanguage } from '$lib/stores/i18n.js';
  import { onMount } from 'svelte';

  onMount(() => {
    // Redirect English users to English version
    if ($currentLanguage === 'en') {
      window.location.href = '/en/datenschutz';
    }
  });
</script>

<svelte:head>
  <title>Datenschutzerklärung - Hotel Ludwig van Beethoven</title>
  <meta name="description" content="Datenschutzerklärung des Hotel Ludwig van Beethoven Berlin. Informationen zum Umgang mit Ihren personenbezogenen Daten." />
</svelte:head>

<div class="privacy-container">
  <div class="privacy-content">
    <h1>Datenschutzerklärung</h1>

    <section>
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br><br>
        Hotel Ludwig van Beethoven<br>
        Hasenheide 14<br>
        10967 Berlin<br>
        Deutschland<br><br>
        Telefon: +49 30 695 066 0<br>
        E-Mail: info@hotel-ludwig-van-beethoven.de
      </p>
    </section>

    <section>
      <h2>2. Allgemeine Hinweise</h2>
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
      </p>
    </section>

    <section>
      <h2>3. Erfassung allgemeiner Informationen</h2>
      <p>
        Wenn Sie auf unsere Website zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet Service Providers und Ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.
      </p>
      <p>
        Diese Informationen sind technisch notwendig, um von Ihnen angeforderte Inhalte von Webseiten korrekt auszuliefern und fallen bei Nutzung des Internets zwingend an. Anonyme Informationen dieser Art werden von uns statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.
      </p>
    </section>

    <section>
      <h2>4. Speicherung von Einstellungen (localStorage)</h2>
      <p>
        Unsere Website verwendet die lokale Speicherung Ihres Browsers (localStorage), um Ihre Spracheinstellung zu speichern. Diese Funktion dient ausschließlich dazu, Ihnen bei wiederholten Besuchen unserer Website die von Ihnen bevorzugte Sprache anzuzeigen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an einer nutzerfreundlichen Gestaltung unserer Website.
      </p>
      <p>
        Sie können die gespeicherten Daten jederzeit in Ihren Browsereinstellungen löschen.
      </p>
    </section>

    <section>
      <h2>5. Service Worker (Offline-Funktionalität)</h2>
      <p>
        Unsere Website verwendet einen Service Worker, um bestimmte Inhalte zwischenzuspeichern und die Performance zu verbessern. Der Service Worker speichert statische Ressourcen wie Bilder und Stylesheets lokal in Ihrem Browser-Cache.
      </p>
      <p>
        Diese Technologie ermöglicht es, dass Teile unserer Website auch bei schlechter Internetverbindung verfügbar bleiben. Es werden dabei keine personenbezogenen Daten verarbeitet oder übertragen.
      </p>
    </section>

    <section>
      <h2>6. Einbindung externer Dienste</h2>

      <h3>6.1 Google Fonts</h3>
      <p>
        Unsere Website nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Abrufen einer Seite lädt Ihr Browser die benötigten Web Fonts in Ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
      </p>
      <p>
        Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der optimierten Darstellung unserer Website).
      </p>

      <h3>6.2 Prismic (Content Management)</h3>
      <p>
        Wir verwenden Prismic als Content-Management-System. Beim Laden von Bildern und Inhalten werden diese von Prismic-Servern abgerufen. Dabei wird Ihre IP-Adresse an Prismic übertragen, was technisch notwendig ist, um die Inhalte bereitzustellen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Content-Verwaltung).
      </p>

      <h3>6.3 Customer Alliance (Bewertungen)</h3>
      <p>
        Auf unserer Bewertungsseite zeigen wir Gästebewertungen an, die über Customer Alliance abgerufen werden. Beim Aufruf der Bewertungsseite werden die Bewertungsdaten von Customer Alliance-Servern geladen. Dabei wird Ihre IP-Adresse technisch bedingt übertragen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Darstellung authentischer Gästebewertungen).
      </p>
    </section>

    <section>
      <h2>7. Ihre Rechte</h2>
      <p>
        Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.
      </p>
      <p>
        Sie haben folgende Rechte:
      </p>
      <ul>
        <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
        <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.</li>
        <li><strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.</li>
        <li><strong>Recht auf Einschränkung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.</li>
        <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können verlangen, dass wir Ihnen Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zur Verfügung stellen.</li>
        <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer personenbezogenen Daten widersprechen.</li>
        <li><strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.</li>
      </ul>
      <p>
        Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei uns oder bei der Datenschutzbehörde beschweren.
      </p>
    </section>

    <section>
      <h2>8. Kontakt</h2>
      <p>
        Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Einschränkung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen kontaktieren Sie uns bitte unter:
      </p>
      <p>
        Hotel Ludwig van Beethoven<br>
        Hasenheide 14<br>
        10967 Berlin<br>
        E-Mail: info@hotel-ludwig-van-beethoven.de<br>
        Telefon: +49 30 695 066 0
      </p>
    </section>

    <section>
      <h2>9. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
      </p>
    </section>

    <p class="privacy-date">Stand: November 2024</p>
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