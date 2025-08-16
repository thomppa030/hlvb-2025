// src/routes/reviews/+page.js

export async function load({ fetch }) {
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
      reviews: data.reviews,
      error: null,
      averageRating: parseFloat(averageRating),
      totalReviews: data.total
    };
  } catch (error) {
    console.error('Error loading reviews:', error);
    return {
      reviews: [],
      error: 'Unable to load reviews. Please try again later.',
      averageRating: 0,
      totalReviews: 0
    };
  }
}