<!-- src/routes/reviews/+page.svelte -->
<script>
  import ReviewCard from "$lib/components/ui/ReviewCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  
  export let data;
  
  let displayCount = 6;
  let selectedRating = 'all';
  
  // Filter reviews based on selected rating
  $: filteredReviews = selectedRating === 'all' 
    ? data.reviews 
    : data.reviews.filter(review => review.rating === parseInt(selectedRating));
  
  // Paginate reviews
  $: displayedReviews = filteredReviews.slice(0, displayCount);
  $: hasMore = displayedReviews.length < filteredReviews.length;
  
  function loadMore() {
    displayCount += 6;
  }
  
  // Rating distribution
  $: ratingDistribution = data.reviews.reduce((acc, review) => {
    const rating = review.rating || 0;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});
</script>

<svelte:head>
  <title>Guest Reviews | Luxury Hotel</title>
  <meta name="description" content="Read authentic guest reviews and experiences from our valued customers" />
</svelte:head>

<div class="reviews-page">
  <!-- Hero Section -->
  <section class="reviews-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Guest Reviews</h1>
        <p class="hero-subtitle">
          Discover what our guests are saying about their experiences
        </p>
        
        {#if data.totalReviews > 0}
          <div class="rating-summary">
            <div class="average-rating">
              <span class="rating-number">{data.averageRating}</span>
              <div class="rating-stars">
                {#each Array(5) as _, i}
                  <span class="star" class:filled={i < Math.round(data.averageRating)}>
                    ★
                  </span>
                {/each}
              </div>
              <span class="review-count">Based on {data.totalReviews} reviews</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </section>
  
  <!-- Filters Section -->
  {#if data.reviews.length > 0}
    <section class="filters-section">
      <div class="container">
        <div class="filters-wrapper">
          <div class="filter-group">
            <label class="filter-label" for="rating-filter">Filter by rating:</label>
            <select 
              id="rating-filter"
              class="filter-select" 
              bind:value={selectedRating}
              on:change={() => displayCount = 6}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars ({ratingDistribution[5] || 0})</option>
              <option value="4">4 Stars ({ratingDistribution[4] || 0})</option>
              <option value="3">3 Stars ({ratingDistribution[3] || 0})</option>
              <option value="2">2 Stars ({ratingDistribution[2] || 0})</option>
              <option value="1">1 Star ({ratingDistribution[1] || 0})</option>
            </select>
          </div>
          
          <div class="results-info">
            Showing {displayedReviews.length} of {filteredReviews.length} reviews
          </div>
        </div>
      </div>
    </section>
  {/if}
  
  <!-- Reviews Grid -->
  <section class="reviews-section">
    <div class="container">
      {#if data.error}
        <div class="error-message">
          <p>{data.error}</p>
        </div>
      {:else if filteredReviews.length === 0}
        <div class="no-reviews">
          <p>No reviews found matching your criteria.</p>
        </div>
      {:else}
        <div class="reviews-grid">
          {#each displayedReviews as review}
            <ReviewCard
              rating={review.rating}
              comment={review.comment}
              author={review.author || "Anonymous"}
              date={review.date}
              source={review.source || "Customer Alliance"}
            />
          {/each}
        </div>
        
        {#if hasMore}
          <div class="load-more-wrapper">
            <Button 
              variant="primary" 
              size="large" 
              on:click={loadMore}
            >
              Load More Reviews
            </Button>
          </div>
        {/if}
      {/if}
    </div>
  </section>
</div>

<style>
  .reviews-page {
    min-height: 100vh;
    background-color: var(--color-background);
  }
  
  /* Hero Section */
  .reviews-hero {
    background: var(--color-background);
    color: var(--color-text);
    padding: var(--space-4xl) 0 var(--space-3xl);
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }
  
  .hero-content {
    position: relative;
    text-align: center;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
    font-family: var(--font-display);
    margin-bottom: var(--space-lg);
    color: var(--color-text);
    font-weight: var(--font-weight-light);
    letter-spacing: -0.02em;
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
    opacity: 0.7;
    margin-bottom: var(--space-3xl);
    color: var(--color-text-light);
    font-weight: var(--font-weight-light);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .rating-summary {
    display: flex;
    justify-content: center;
  }
  
  .average-rating {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-2xl);
    padding: var(--space-xl) var(--space-2xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  }
  
  .rating-number {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-light);
    color: var(--color-text);
    letter-spacing: -0.01em;
  }
  
  .rating-stars {
    display: flex;
    gap: 6px;
    font-size: var(--font-size-xl);
  }
  
  .star {
    color: var(--color-border);
    transition: color var(--transition-fast);
  }
  
  .star.filled {
    color: #C8A882; /* Warm gold that complements the taupe palette */
  }
  
  .review-count {
    font-size: var(--font-size-sm);
    opacity: 0.6;
    color: var(--color-text-light);
    font-weight: var(--font-weight-light);
  }
  
  /* Filters Section */
  .filters-section {
    background-color: var(--color-background);
    padding: var(--space-lg) 0 var(--space-2xl);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .filters-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-lg);
    flex-wrap: wrap;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .filter-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }
  
  .filter-select {
    padding: var(--space-sm) var(--space-lg);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-xl);
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-weight: var(--font-weight-light);
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: var(--space-3xl);
  }
  
  .filter-select:hover {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  
  .filter-select:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.08);
  }
  
  .results-info {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
  }
  
  /* Reviews Section */
  .reviews-section {
    padding: var(--space-4xl) 0;
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: var(--space-2xl);
    margin-bottom: var(--space-4xl);
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .load-more-wrapper {
    text-align: center;
    margin-top: var(--space-3xl);
  }
  
  .error-message,
  .no-reviews {
    text-align: center;
    padding: var(--space-4xl);
    color: var(--color-text-light);
  }
  
  .error-message p,
  .no-reviews p {
    font-size: var(--font-size-lg);
  }
  
  /* Dark mode adjustments */
  :global([data-theme="dark"]) .reviews-hero {
    background: var(--color-background);
    border-bottom-color: rgba(255, 255, 255, 0.03);
  }
  
  :global([data-theme="dark"]) .average-rating {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  :global([data-theme="dark"]) .filters-section {
    background-color: var(--color-background);
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }
  
  :global([data-theme="dark"]) .filter-select {
    background-color: var(--color-background);
    border-color: rgba(255, 255, 255, 0.08);
  }
  
  :global([data-theme="dark"]) .filter-select:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  :global([data-theme="dark"]) .filter-select:focus {
    box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.2);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--font-size-4xl);
    }
    
    .hero-subtitle {
      font-size: var(--font-size-base);
    }
    
    .rating-number {
      font-size: var(--font-size-3xl);
    }
    
    .reviews-grid {
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      max-width: none;
    }
    
    .filters-wrapper {
      flex-direction: column;
      align-items: stretch;
    }
    
    .filter-group {
      flex-direction: column;
      align-items: stretch;
    }
    
    .results-info {
      text-align: center;
    }
  }
</style>