// src/lib/data/jobs.js

export const jobs = [
  {
    id: 'rezeption-vollzeit',
    title: 'Rezeptionist/in',
    department: 'Front Office',
    type: 'Vollzeit',
    description: 'Wir suchen eine freundliche und serviceorientierte Person für unsere Rezeption. Sie sind das erste Gesicht unseres Hotels und sorgen für einen herzlichen Empfang unserer Gäste.',
    responsibilities: [
      'Check-in und Check-out der Gäste',
      'Telefonische Reservierungsannahme und -bearbeitung',
      'Gästebetreuung und Informationsservice',
      'Abrechnung und Kassenvorgänge',
      'Koordination mit anderen Abteilungen',
      'Bearbeitung von Beschwerden und Sonderwünschen'
    ],
    requirements: [
      'Abgeschlossene Ausbildung im Hotelfach oder vergleichbare Erfahrung',
      'Sehr gute Deutsch- und Englischkenntnisse',
      'Freundliches und professionelles Auftreten',
      'Teamfähigkeit und Belastbarkeit',
      'Flexibilität bei den Arbeitszeiten',
      'Grundkenntnisse in MS Office und Hotelsoftware'
    ],
    benefits: [
      'Unbefristeter Arbeitsvertrag',
      'Tarifliche Vergütung',
      'Betriebliche Altersvorsorge',
      'Kostenlose Getränke und Verpflegung',
      'Fortbildungsmöglichkeiten',
      'Familienfreundliche Arbeitszeiten'
    ],
    contact: 'bewerbung@hotel-ludwig-van-beethoven.de'
  },
  {
    id: 'zimmerservice-teilzeit',
    title: 'Zimmermädchen/Zimmerherr',
    department: 'Housekeeping',
    type: 'Teilzeit',
    description: 'Für unser Housekeeping-Team suchen wir zuverlässige Mitarbeiter, die unsere Zimmer und öffentlichen Bereiche in einwandfreiem Zustand halten.',
    responsibilities: [
      'Reinigung und Pflege der Hotelzimmer',
      'Bettwäsche- und Handtuchwechsel',
      'Auffüllung der Minibars und Amenities',
      'Kontrolle der Zimmerausstattung',
      'Reinigung der öffentlichen Bereiche',
      'Meldung von Reparaturbedarf'
    ],
    requirements: [
      'Erfahrung in der Hotelreinigung von Vorteil',
      'Sorgfältige und gewissenhafte Arbeitsweise',
      'Körperliche Belastbarkeit',
      'Teamfähigkeit',
      'Grundkenntnisse der deutschen Sprache',
      'Zuverlässigkeit und Pünktlichkeit'
    ],
    benefits: [
      'Flexible Arbeitszeiten',
      'Tarifliche Vergütung',
      'Kostenlose Arbeitskleidung',
      'Betriebsausflüge',
      'Urlaubsgeld',
      'Angenehmes Arbeitsklima'
    ],
    contact: 'bewerbung@hotel-ludwig-van-beethoven.de'
  },
  {
    id: 'service-minijob',
    title: 'Servicekraft Frühstück',
    department: 'Service',
    type: 'Minijob',
    description: 'Zur Verstärkung unseres Frühstücksteams suchen wir eine freundliche Servicekraft für die Morgenstunden.',
    responsibilities: [
      'Aufbau und Vorbereitung des Frühstücksbuffets',
      'Betreuung der Gäste während des Frühstücks',
      'Nachfüllen und Kontrolle des Buffets',
      'Abräumen und Reinigung der Tische',
      'Geschirrspülung und Küchenreinigung',
      'Unterstützung bei Sonderveranstaltungen'
    ],
    requirements: [
      'Erfahrung im Service wünschenswert',
      'Frühe Arbeitszeiten (ab 6:00 Uhr)',
      'Freundlicher Umgang mit Gästen',
      'Hygienebewusstsein',
      'Teamfähigkeit',
      'Belastbarkeit am Morgen'
    ],
    benefits: [
      'Flexible Stundeneinteilung',
      'Pünktliche Bezahlung',
      'Kostenlose Verpflegung',
      'Nettes Team',
      'Zentrale Lage in Berlin',
      'Keine Wochenendarbeit'
    ],
    contact: 'bewerbung@hotel-ludwig-van-beethoven.de'
  }
];

export const jobsByCategory = {
  'Front Office': jobs.filter(job => job.department === 'Front Office'),
  'Housekeeping': jobs.filter(job => job.department === 'Housekeeping'),
  'Service': jobs.filter(job => job.department === 'Service')
};

export const jobsByType = {
  'Vollzeit': jobs.filter(job => job.type === 'Vollzeit'),
  'Teilzeit': jobs.filter(job => job.type === 'Teilzeit'),
  'Minijob': jobs.filter(job => job.type === 'Minijob')
};