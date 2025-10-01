// src/routes/infos/+page.js
import { getByUID } from '$lib/prismic.js';

export async function load({ url }) {
  try {
    // Determine language from URL
    const pathname = url.pathname;
    const lang = pathname.startsWith('/en') ? 'en' : 'de';

    // Fetch the info page document from Prismic by UID
    const page = await getByUID('page', 'infos', lang);

    // If no Prismic content, return fallback data
    if (!page) {
      console.warn(`No Prismic content found for infos page in ${lang}, using fallback`);
      return {
        page: null,
        slices: [],
        lang,
        meta: {
          title: lang === 'de'
            ? 'Hotel Informationen - Hotel Ludwig van Beethoven'
            : 'Hotel Information - Hotel Ludwig van Beethoven',
          description: lang === 'de'
            ? 'Informationen über das Hotel Ludwig van Beethoven in Berlin Kreuzberg.'
            : 'Information about Hotel Ludwig van Beethoven in Berlin Kreuzberg.'
        }
      };
    }

    return {
      page,
      slices: page.data.slices || [],
      lang,
      meta: {
        title: page.data.title?.[0]?.text || 'Hotel Information',
        description: page.data.meta_description || '',
        image: page.data.meta_image?.url || null
      }
    };
  } catch (err) {
    console.error('Error loading infos page from Prismic:', err);

    const lang = url.pathname.startsWith('/en') ? 'en' : 'de';
    return {
      page: null,
      slices: [],
      lang,
      meta: {
        title: lang === 'de'
          ? 'Hotel Informationen - Hotel Ludwig van Beethoven'
          : 'Hotel Information - Hotel Ludwig van Beethoven',
        description: ''
      }
    };
  }
}
