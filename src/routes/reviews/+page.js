// src/routes/reviews/+page.js
import { getByUID } from '$lib/prismic.js';
import { currentLanguage } from '$lib/stores/i18n.js';
import { get } from 'svelte/store';

export async function load({ fetch, url }) {
  const lang = get(currentLanguage) || 'de';
  
  // Fetch reviews page from Prismic
  let prismicPage = null;
  try {
    prismicPage = await getByUID('page', 'reviews', lang);
  } catch (error) {
    console.log('Reviews page not found in Prismic, using fallback content');
  }
  try {
    const response = await fetch('/api/reviews');
    const data = await response.json();
    
    if (!data.success) {
      return {
        reviews: [],
        error: 'Unable to load reviews at this time.',
        averageRating: 0,
        totalReviews: 0
      };
    }
    
    // Calculate average rating
    const averageRating = data.reviews.length > 0
      ? (data.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / data.reviews.length).toFixed(1)
      : 0;
    
    return {
      prismicPage,
      reviews: data.reviews,
      error: null,
      averageRating: parseFloat(averageRating),
      totalReviews: data.total
    };
  } catch (error) {
    console.error('Error loading reviews:', error);
    return {
      prismicPage: null,
      reviews: [],
      error: 'Unable to load reviews. Please try again later.',
      averageRating: 0,
      totalReviews: 0
    };
  }
}