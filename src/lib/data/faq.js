// src/lib/data/faq.js

export const faqItems = [
  {
    id: 'check-in-out',
    question: 'Wann sind die Check-in und Check-out Zeiten?',
    answer: '<p>Der Check-in ist ab <strong>15:00 Uhr</strong> möglich, der Check-out bis <strong>11:00 Uhr</strong>.</p><p>Früher Check-in oder später Check-out können je nach Verfügbarkeit arrangiert werden. Bitte kontaktieren Sie uns im Voraus.</p>',
    category: 'Allgemein'
  },
  {
    id: 'parking',
    question: 'Gibt es Parkmöglichkeiten am Hotel?',
    answer: '<p>Wir haben leider <strong>keine eigenen Parkplätze</strong>, aber es gibt öffentliche Parkplätze in der Nähe:</p><ul><li>Straßenparkplätze (gebührenpflichtig)</li><li>Parkhaus Hasenheide (5 Gehminuten)</li><li>Park & Ride am U-Bahnhof Hermannplatz</li></ul><p>Gerne helfen wir Ihnen bei der Suche nach einem geeigneten Parkplatz.</p>',
    category: 'Anreise'
  },
  {
    id: 'wifi',
    question: 'Ist WLAN im Hotel verfügbar?',
    answer: '<p>Ja, wir bieten <strong>kostenloses WLAN</strong> in allen Zimmern und öffentlichen Bereichen.</p><p>Die Zugangsdaten erhalten Sie an der Rezeption bei Ihrem Check-in.</p>',
    category: 'Ausstattung'
  },
  {
    id: 'breakfast',
    question: 'Welche Frühstücksoptionen gibt es?',
    answer: '<p>Wir servieren täglich von <strong>7:00 bis 10:30 Uhr</strong> ein reichhaltiges Frühstücksbuffet mit:</p><ul><li>Frische Brötchen und Brot</li><li>Aufschnitt, Käse und vegane Alternativen</li><li>Müsli, Joghurt und frisches Obst</li><li>Kaffee, Tee und frische Säfte</li><li>Warme Speisen wie Rührei und Bacon</li></ul><p>Spezielle Diätwünsche können auf Anfrage berücksichtigtigt werden.</p>',
    category: 'Service'
  },
  {
    id: 'public-transport',
    question: 'Wie erreiche ich das Hotel mit öffentlichen Verkehrsmitteln?',
    answer: '<p>Unser Hotel ist sehr gut an das öffentliche Verkehrsnetz angebunden:</p><ul><li><strong>U-Bahn:</strong> U8 Hermannplatz (5 Gehminuten)</li><li><strong>Bus:</strong> Linien M29, M41, 104 (Haltestelle Fontanestraße)</li><li><strong>S-Bahn:</strong> S41/S42 Hermannstraße (10 Gehminuten)</li></ul><p>Vom Flughafen BER: S-Bahn S9 bis Hermannstraße, dann Bus M41 bis Fontanestraße</p>',
    category: 'Anreise'
  },
  {
    id: 'room-amenities',
    question: 'Welche Ausstattung haben die Zimmer?',
    answer: '<p>Alle unsere Zimmer sind ausgestattet mit:</p><ul><li>Privates Badezimmer mit Dusche</li><li>Kostenloses WLAN</li><li>Flachbild-TV</li><li>Schreibtisch</li><li>Kleiderschrank</li><li>Haartrockner</li><li>Kostenloses Toilettenpapier und Handtücher</li></ul><p>Zusätzliche Ausstattung variiert je nach Zimmerkategorie.</p>',
    category: 'Ausstattung'
  },
  {
    id: 'pets',
    question: 'Sind Haustiere erlaubt?',
    answer: '<p>Ja, <strong>Haustiere sind willkommen!</strong></p><p>Wir berechnen eine geringe Gebühr von <strong>10€ pro Nacht</strong> für Haustiere.</p><p>Bitte informieren Sie uns bei der Buchung über Ihr Haustier, damit wir ein geeignetes Zimmer für Sie reservieren können.</p>',
    category: 'Service'
  },
  {
    id: 'cancellation',
    question: 'Wie sind die Stornierungsbedingungen?',
    answer: '<p>Unsere Standard-Stornierungsbedingungen:</p><ul><li><strong>Kostenlose Stornierung</strong> bis 18:00 Uhr am Tag vor der Anreise</li><li>Bei späteren Stornierungen wird eine Nacht berechnet</li><li>No-Show: Vollständige Buchung wird berechnet</li></ul><p>Spezielle Tarife können abweichende Bedingungen haben. Details finden Sie in Ihrer Buchungsbestätigung.</p>',
    category: 'Buchung'
  },
  {
    id: 'luggage-storage',
    question: 'Kann ich mein Gepäck vor Check-in oder nach Check-out aufbewahren?',
    answer: '<p>Ja, gerne können Sie Ihr Gepäck <strong>kostenlos</strong> an der Rezeption aufbewahren:</p><ul><li>Vor dem Check-in ab 8:00 Uhr</li><li>Nach dem Check-out bis 20:00 Uhr</li></ul><p>Unser Gepäckraum ist sicher und wird überwacht.</p>',
    category: 'Service'
  },
  {
    id: 'payment-methods',
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer: '<p>Wir akzeptieren folgende Zahlungsmethoden:</p><ul><li>Bargeld (Euro)</li><li>EC-Karte (Girocard)</li><li>Kreditkarten: Visa, Mastercard, American Express</li><li>Kontaktlose Zahlung (NFC)</li></ul><p>Eine Vorauszahlung bei Online-Buchungen ist möglich aber nicht erforderlich.</p>',
    category: 'Buchung'
  }
];

export const faqByCategory = {
  'Allgemein': faqItems.filter(item => item.category === 'Allgemein'),
  'Anreise': faqItems.filter(item => item.category === 'Anreise'),
  'Ausstattung': faqItems.filter(item => item.category === 'Ausstattung'),
  'Service': faqItems.filter(item => item.category === 'Service'),
  'Buchung': faqItems.filter(item => item.category === 'Buchung')
};

export const faqCategories = [
  'Allgemein',
  'Anreise',
  'Ausstattung',
  'Service',
  'Buchung'
];