// src/routes/infos/anreise/+page.js
import { getByUID } from '$lib/prismic.js';

export async function load({ url }) {
  try {
    // Determine language from URL
    const pathname = url.pathname;
    const lang = pathname.startsWith('/en') ? 'en' : 'de';

    // Fetch the arrival page document from Prismic by UID
    const page = await getByUID('page', 'anreise', lang);

    // If no Prismic content, return fallback data
    if (!page) {
      console.warn(`No Prismic content found for anreise page in ${lang}, using fallback`);
      return {
        page: null,
        slices: [],
        lang,
        meta: {
          title: lang === 'de'
            ? 'Anreise - Hotel Ludwig van Beethoven'
            : 'Arrival - Hotel Ludwig van Beethoven',
          description: lang === 'de'
            ? 'Anreise zum Hotel Ludwig van Beethoven Berlin. Informationen zu öffentlichen Verkehrsmitteln, Parkmöglichkeiten und Standort.'
            : 'Arrival to Hotel Ludwig van Beethoven Berlin. Information about public transport, parking, and location.'
        }
      };
    }

    return {
      page,
      slices: page.data.slices || [],
      lang,
      meta: {
        title: page.data.title?.[0]?.text || 'Arrival Information',
        description: page.data.meta_description || '',
        image: page.data.meta_image?.url || null
      }
    };
  } catch (err) {
    console.error('Error loading anreise page from Prismic:', err);

    const lang = url.pathname.startsWith('/en') ? 'en' : 'de';
    return {
      page: null,
      slices: [],
      lang,
      meta: {
        title: lang === 'de'
          ? 'Anreise - Hotel Ludwig van Beethoven'
          : 'Arrival - Hotel Ludwig van Beethoven',
        description: ''
      }
    };
  }
}
