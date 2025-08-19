// src/routes/en/+page.js
import { getLocalizedContent } from '$lib/prismic.js';

export async function load({ url, params }) {
  try {
    // Force English language for this route
    const lang = 'en';

    // Fetch the homepage document from Prismic
    const homepage = await getLocalizedContent('homepage', lang);
    
    // If no Prismic content, return fallback data
    if (!homepage) {
      console.warn(`No Prismic content found for homepage in ${lang}, using fallback`);
      return {
        homepage: null,
        slices: [],
        lang,
        meta: {
          title: 'Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel in Kreuzberg',
          description: '3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, art collection, and personalized service.',
          image: '/hlvb_backside_header.webp'
        }
      };
    }

    return {
      homepage,
      slices: homepage.data.slices || [],
      lang,
      meta: {
        title: homepage.data.meta_title || 'Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel in Kreuzberg',
        description: homepage.data.meta_description || '3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, art collection, and personalized service.',
        image: homepage.data.meta_image?.url || '/hlvb_backside_header.webp'
      }
    };
  } catch (err) {
    console.error('Error loading English homepage from Prismic:', err);
    
    // Return fallback data instead of throwing error
    return {
      homepage: null,
      slices: [],
      lang: 'en',
      meta: {
        title: 'Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel in Kreuzberg',
        description: '3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, art collection, and personalized service.',
        image: '/hlvb_backside_header.webp'
      }
    };
  }
}