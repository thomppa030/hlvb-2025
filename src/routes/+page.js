// src/routes/+page.js
import { getLocalizedContent } from '$lib/prismic.js';
import { error } from '@sveltejs/kit';

export async function load({ url, params }) {
  try {
    // Determine language from URL or default to German
    const pathname = url.pathname;
    let lang = 'de'; // Default language
    
    if (pathname.startsWith('/en')) {
      lang = 'en';
    }

    // Fetch the homepage document from Prismic
    const homepage = await getLocalizedContent('homepage', lang);
    
    // If no Prismic content, return fallback data
    if (!homepage) {
      console.warn(`No Prismic content found for homepage in ${lang}, using fallback`);
      const isGerman = lang === 'de';
      return {
        homepage: null,
        slices: [],
        lang,
        meta: {
          title: isGerman 
            ? 'Hotel Ludwig van Beethoven Berlin | 3-Sterne Garni Hotel in Kreuzberg'
            : 'Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel in Kreuzberg',
          description: isGerman
            ? '3-Sterne Garni Hotel in Berlin Kreuzberg mit 68 komfortablen Zimmern, kostenlosem WLAN, Kunstsammlung und persönlichem Service.'
            : '3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, art collection, and personalized service.',
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
    console.error('Error loading homepage from Prismic:', err);
    
    // Return fallback data instead of throwing error
    const isGerman = lang === 'de';
    return {
      homepage: null,
      slices: [],
      lang,
      meta: {
        title: isGerman 
          ? 'Hotel Ludwig van Beethoven Berlin | 3-Sterne Garni Hotel in Kreuzberg'
          : 'Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel in Kreuzberg',
        description: isGerman
          ? '3-Sterne Garni Hotel in Berlin Kreuzberg mit 68 komfortablen Zimmern, kostenlosem WLAN, Kunstsammlung und persönlichem Service.'
          : '3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, art collection, and personalized service.',
        image: '/hlvb_backside_header.webp'
      }
    };
  }
}