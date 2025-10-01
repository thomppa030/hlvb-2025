// src/routes/infos/faq/+page.js
import { getByUID } from '$lib/prismic.js';

export async function load({ url }) {
  try {
    // Determine language from URL
    const pathname = url.pathname;
    const lang = pathname.startsWith('/en') ? 'en' : 'de';

    // Fetch the FAQ page document from Prismic by UID
    const page = await getByUID('page', 'faq', lang);

    // If no Prismic content, return fallback data (still keep FAQ logic)
    if (!page) {
      console.warn(`No Prismic content found for FAQ page in ${lang}, using fallback`);
      return {
        page: null,
        slices: [],
        lang,
        meta: {
          title: lang === 'de'
            ? 'Häufig gestellte Fragen - Hotel Ludwig van Beethoven'
            : 'Frequently Asked Questions - Hotel Ludwig van Beethoven',
          description: lang === 'de'
            ? 'Häufig gestellte Fragen zum Hotel Ludwig van Beethoven Berlin. Antworten zu Anreise, Check-in, Ausstattung und Services.'
            : 'Frequently asked questions about Hotel Ludwig van Beethoven Berlin. Answers about arrival, check-in, facilities and services.'
        }
      };
    }

    return {
      page,
      slices: page.data.slices || [],
      lang,
      meta: {
        title: page.data.title?.[0]?.text || 'FAQ',
        description: page.data.meta_description || '',
        image: page.data.meta_image?.url || null
      }
    };
  } catch (err) {
    console.error('Error loading FAQ page from Prismic:', err);

    const lang = url.pathname.startsWith('/en') ? 'en' : 'de';
    return {
      page: null,
      slices: [],
      lang,
      meta: {
        title: lang === 'de'
          ? 'Häufig gestellte Fragen - Hotel Ludwig van Beethoven'
          : 'Frequently Asked Questions - Hotel Ludwig van Beethoven',
        description: ''
      }
    };
  }
}
