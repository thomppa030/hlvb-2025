// src/lib/stores/i18n.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

// Create language store
function createLanguageStore() {
  const { subscribe, set, update } = writable('de');

  return {
    subscribe,
    set,
    update,
    // Initialize language from localStorage or browser preference
    init: () => {
      if (!browser) return;
      
      const stored = localStorage.getItem('language');
      if (stored && ['de', 'en'].includes(stored)) {
        set(stored);
      } else {
        // Detect browser language
        const browserLang = navigator.language.substring(0, 2);
        set(['de', 'en'].includes(browserLang) ? browserLang : 'de');
      }
    },
    // Switch language and persist
    switchTo: (lang) => {
      if (['de', 'en'].includes(lang)) {
        set(lang);
        if (browser) {
          localStorage.setItem('language', lang);
        }
      }
    }
  };
}

export const currentLanguage = createLanguageStore();

// Prismic language utilities
export function getPrismicLang(lang) {
  return lang === 'de' ? 'de-de' : `${lang}-${lang}`;
}

export function getLanguageFromPrismic(prismicLang) {
  return prismicLang.split('-')[0];
}

// Create a store for Prismic document language
export const prismicLanguage = derived(currentLanguage, ($currentLanguage) => {
  return getPrismicLang($currentLanguage);
});

// Function to switch language with URL navigation
export async function switchLanguage(newLang, currentPath = '/') {
  if (!['de', 'en'].includes(newLang)) return;
  
  currentLanguage.switchTo(newLang);
  
  if (browser) {
    // Handle URL changes for language switching
    let newPath = currentPath;
    
    // Remove existing language prefix
    if (currentPath.startsWith('/en/')) {
      newPath = currentPath.substring(3) || '/';
    } else if (currentPath === '/en') {
      newPath = '/';
    } else if (currentPath.startsWith('/de/')) {
      newPath = currentPath.substring(3) || '/';
    } else if (currentPath === '/de') {
      newPath = '/';
    }
    
    // Add new language prefix (except for German which is default)
    if (newLang === 'en') {
      newPath = `/en${newPath === '/' ? '' : newPath}`;
    }
    
    // Navigate to new URL
    await goto(newPath);
  }
}

// Translation dictionaries
const translations = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.reviews': 'Bewertungen',
    'nav.style': 'Style',
    'nav.book_now': 'Jetzt buchen',
    
    // Hero Section
    'hero.title': 'Hotel Ludwig van Beethoven',
    'hero.subtitle': 'Ein persönliches 3-Sterne-Garni-Hotel-Erlebnis im Herzen von Berlin Kreuzberg',
    'hero.highlights.rooms': '68 komfortable Zimmer',
    'hero.highlights.wifi': 'Kostenloses WLAN',
    'hero.highlights.art': 'Kunstsammlung',
    'hero.highlights.since': 'Seit 1999',
    'hero.guest_reviews': 'Gästebewertungen',
    
    // About Section
    'about.title': 'Ihr Zuhause in Berlin Kreuzberg',
    'about.text1': 'Seit 1999 heißt das Hotel Ludwig van Beethoven Gäste in einem der lebhaftesten Stadtteile Berlins willkommen. Unser familiengeführtes Hotel bietet 68 komfortable Zimmer mit eigenen Bädern und modernen Annehmlichkeiten, alle bereichert durch eine umfangreiche Kunstsammlung.',
    'about.text2': 'In der Hasenheide 14 gelegen, sind wir perfekt positioniert, um die authentische Berliner Kultur zu erkunden, während wir die persönliche Note bieten, die jeden Aufenthalt unvergesslich macht.',
    'about.stats.rooms': 'Komfortable Zimmer',
    'about.stats.since': 'Seit',
    'about.stats.hotel': 'Garni Hotel',
    
    // Amenities
    'amenities.title': 'Hotel-Ausstattung',
    'amenities.wifi.title': 'Kostenloses WLAN',
    'amenities.wifi.desc': 'Hochgeschwindigkeits-Internet in allen Zimmern und öffentlichen Bereichen',
    'amenities.parking.title': 'Kostenlose Parkplätze',
    'amenities.parking.desc': 'Begrenzte Plätze mit Parkausweis von der Rezeption',
    'amenities.art.title': 'Kunstsammlung',
    'amenities.art.desc': 'Kunstwerke von Maxim und Milan D. Vukotic im ganzen Hotel',
    
    // Location
    'location.title': 'Entdecken Sie Kreuzberg',
    'location.text': 'Erleben Sie einen der dynamischsten Stadtteile Berlins, bekannt für seine alternative Kultur, reiche Geschichte und lebendige Straßenszene. Kreuzberg bietet hervorragende Verkehrsanbindungen, einzigartige lokale Attraktionen und authentische Berliner Erfahrungen direkt vor Ihrer Haustür.',
    'location.highlights.culture': 'Alternative Kultur',
    'location.highlights.history': 'Reiche Geschichte',
    'location.highlights.transport': 'Gute Verkehrsanbindung',
    'location.highlights.attractions': 'Lokale Attraktionen',
    
    // Reviews
    'reviews.title': 'Was unsere Gäste sagen',
    'reviews.text': 'Entdecken Sie, was unsere Gäste über ihre Erfahrungen sagen',
    'reviews.read_all': 'Alle Bewertungen lesen',
    'reviews.meta_description': 'Lesen Sie authentische Gästebewertungen und Erfahrungen unserer geschätzten Kunden',
    'reviews.based_on': 'Basierend auf',
    'reviews.reviews_count': 'Bewertungen',
    'reviews.filter_by_rating': 'Nach Bewertung filtern',
    'reviews.all_ratings': 'Alle Bewertungen',
    'reviews.stars': 'Sterne',
    'reviews.star': 'Stern',
    'reviews.showing': 'Zeige',
    'reviews.of': 'von',
    'reviews.no_reviews_found': 'Keine Bewertungen gefunden, die Ihren Kriterien entsprechen.',
    'reviews.load_more': 'Mehr Bewertungen laden',
    
    // Booking Widget
    'booking.title': 'Buchen Sie Ihren Aufenthalt',
    'booking.subtitle': 'Erleben Sie Berlin im Hotel Ludwig van Beethoven',
    'booking.check_availability': 'Verfügbarkeit prüfen',
    'booking.checkin': 'Anreise',
    'booking.checkout': 'Abreise',
    'booking.adults': 'Erwachsene',
    'booking.rooms': 'Zimmer',
    'booking.children': 'Kinder',
    'booking.book_now': 'Jetzt buchen',
    'booking.adults_1': '1 Erwachsener',
    'booking.adults_2': '2 Erwachsene',
    'booking.adults_3': '3 Erwachsene',
    'booking.adults_4': '4 Erwachsene',
    'booking.rooms_1': '1 Zimmer',
    'booking.rooms_2': '2 Zimmer',
    'booking.rooms_3': '3 Zimmer',
    'booking.children_0': 'Keine Kinder',
    'booking.children_1': '1 Kind',
    'booking.children_2': '2 Kinder',
    'booking.children_3': '3 Kinder',

    // Footer
    'footer.impressum': 'Impressum'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.reviews': 'Reviews',
    'nav.style': 'Style',
    'nav.book_now': 'Book Now',
    
    // Hero Section
    'hero.title': 'Hotel Ludwig van Beethoven',
    'hero.subtitle': 'A personalized 3-star garni hotel experience in the heart of Berlin Kreuzberg',
    'hero.highlights.rooms': '68 Comfortable Rooms',
    'hero.highlights.wifi': 'Free WiFi',
    'hero.highlights.art': 'Art Collection',
    'hero.highlights.since': 'Since 1999',
    'hero.guest_reviews': 'Guest Reviews',
    
    // About Section
    'about.title': 'Your Home in Berlin Kreuzberg',
    'about.text1': 'Since 1999, Hotel Ludwig van Beethoven has been welcoming guests to one of Berlin\'s most vibrant neighborhoods. Our family-owned hotel offers 68 comfortable rooms, each featuring private bathrooms and modern amenities, all enhanced by an extensive art collection.',
    'about.text2': 'Located at Hasenheide 14, we\'re perfectly positioned for exploring authentic Berlin culture while providing the personal touch that makes every stay memorable.',
    'about.stats.rooms': 'Comfortable Rooms',
    'about.stats.since': 'Since',
    'about.stats.hotel': 'Garni Hotel',
    
    // Amenities
    'amenities.title': 'Hotel Amenities',
    'amenities.wifi.title': 'Free WiFi',
    'amenities.wifi.desc': 'High-speed internet in all rooms and public areas',
    'amenities.parking.title': 'Free Parking',
    'amenities.parking.desc': 'Limited spaces with parking pass from reception',
    'amenities.art.title': 'Art Collection',
    'amenities.art.desc': 'Artwork by Maxim and Milan D. Vukotic throughout the hotel',
    
    // Location
    'location.title': 'Discover Kreuzberg',
    'location.text': 'Experience one of Berlin\'s most dynamic neighborhoods, known for its alternative culture, rich history, and vibrant street life. Kreuzberg offers excellent transport connections, unique local attractions, and authentic Berlin experiences right at your doorstep.',
    'location.highlights.culture': 'Alternative Culture',
    'location.highlights.history': 'Rich History',
    'location.highlights.transport': 'Great Transport',
    'location.highlights.attractions': 'Local Attractions',
    
    // Reviews
    'reviews.title': 'What Our Guests Say',
    'reviews.text': 'Discover what our guests are saying about their experiences',
    'reviews.read_all': 'Read All Reviews',
    'reviews.meta_description': 'Read authentic guest reviews and experiences from our valued customers',
    'reviews.based_on': 'Based on',
    'reviews.reviews_count': 'reviews',
    'reviews.filter_by_rating': 'Filter by rating',
    'reviews.all_ratings': 'All Ratings',
    'reviews.stars': 'Stars',
    'reviews.star': 'Star',
    'reviews.showing': 'Showing',
    'reviews.of': 'of',
    'reviews.no_reviews_found': 'No reviews found matching your criteria.',
    'reviews.load_more': 'Load More Reviews',
    
    // Booking Widget
    'booking.title': 'Book Your Stay',
    'booking.subtitle': 'Experience Berlin at Hotel Ludwig van Beethoven',
    'booking.check_availability': 'Check Availability',
    'booking.checkin': 'Check-in',
    'booking.checkout': 'Check-out',
    'booking.adults': 'Adults',
    'booking.rooms': 'Rooms',
    'booking.children': 'Children',
    'booking.book_now': 'Book Now',
    'booking.adults_1': '1 Adult',
    'booking.adults_2': '2 Adults',
    'booking.adults_3': '3 Adults',
    'booking.adults_4': '4 Adults',
    'booking.rooms_1': '1 Room',
    'booking.rooms_2': '2 Rooms',
    'booking.rooms_3': '3 Rooms',
    'booking.children_0': 'No Children',
    'booking.children_1': '1 Child',
    'booking.children_2': '2 Children',
    'booking.children_3': '3 Children',

    // Footer
    'footer.impressum': 'Legal Notice'
  }
};

// Create translation function
export const t = derived(currentLanguage, ($currentLanguage) => {
  return (key) => {
    return translations[$currentLanguage]?.[key] || key;
  };
});

// Export available languages for the switcher
export const languages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];