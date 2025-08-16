// src/routes/api/reviews/+server.js

function parseXMLReviews(xmlText) {
  // Simple XML parsing for Customer Alliance API
  const reviews = [];
  
  // Extract review blocks
  const reviewMatches = xmlText.match(/<review>[\s\S]*?<\/review>/g) || [];
  
  for (const reviewXml of reviewMatches) {
    const review = {};
    
    // Extract basic fields
    const getTextContent = (tag) => {
      const match = reviewXml.match(new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 's'));
      return match ? match[1].trim() : '';
    };
    
    review.id = getTextContent('id');
    review.author = getTextContent('author') || 'Anonymous';
    review.date = getTextContent('date');
    review.rating = parseInt(getTextContent('overallRating')) || 0;
    review.netPromoterScore = parseInt(getTextContent('netPromoterScore')) || 0;
    review.comment = getTextContent('overallComment');
    review.arrivalDate = getTextContent('arrivalDate');
    review.departureDate = getTextContent('departureDate');
    review.reviewerType = getTextContent('reviewerType');
    review.language = getTextContent('language');
    
    // Only include reviews with comments
    if (review.comment && review.comment.trim().length > 0) {
      reviews.push(review);
    }
  }
  
  return { reviews };
}

export async function GET() {
  const API_URL = 'https://api.customer-alliance.com/reviews/list?version=4&id=9cf7a1240c751f97&access_key=8bdz923ziig42hs8vrzeru0b3y67twchh2x6gr1j';

  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/xml',
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const xmlText = await response.text();
    const data = parseXMLReviews(xmlText);
    
    // Filter reviews to only include those with comments
    const reviewsWithComments = data.reviews?.filter(review => 
      review.comment && review.comment.trim().length > 0
    ) || [];

    return new Response(JSON.stringify({
      success: true,
      reviews: reviewsWithComments,
      total: reviewsWithComments.length
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch reviews',
      reviews: [],
      total: 0
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}