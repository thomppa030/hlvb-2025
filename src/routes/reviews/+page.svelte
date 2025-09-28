<!-- src/routes/reviews/+page.svelte -->
<script>
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';
  import ReviewCard from "$lib/components/ui/ReviewCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { t } from '$lib/stores/i18n.js';
  
  export let data;
  
  let displayCount = 6;
  let selectedRating = 'all';
  
  // Filter reviews based on selected rating, minimum word count, and minimum star rating
  $: filteredReviews = (selectedRating === 'all' 
    ? data.reviews 
    : data.reviews.filter((review) => review.rating === parseInt(selectedRating)))
    .filter((review) => {
      // Filter out reviews with less than 10 words
      const wordCount = review.comment ? review.comment.trim().split(/\s+/).length : 0;
      // For "all" ratings, only show 3+ stars. For explicit selection, show any rating.
      const rating = review.rating || 0;
      const meetsRatingCriteria = selectedRating === 'all' ? rating >= 3 : true;
      return wordCount >= 10 && meetsRatingCriteria;
    });
  
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
  
  // Get page title from Prismic or fallback
  $: pageTitle = data.prismicPage?.data?.title?.[0]?.text || $t('reviews.title');
  $: pageMetaDescription = data.prismicPage?.data?.meta_description || $t('reviews.meta_description');
</script>

<svelte:head>
  <title>{pageTitle} | Hotel Ludwig van Beethoven</title>
  <meta name="description" content={pageMetaDescription} />
</svelte:head>

<div class="reviews-page">
  <!-- Prismic Content (if available) -->
  {#if data.prismicPage?.data?.slices}
    <SliceZone slices={data.prismicPage.data.slices} {components} />
  {:else}
    <!-- Fallback Hero Section -->
    <section class="reviews-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title heading-accent">{$t('reviews.title')}</h1>
          <p class="hero-subtitle">
            {$t('reviews.text')}
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
              <span class="review-count">{$t('reviews.based_on')} {data.totalReviews} {$t('reviews.reviews_count')}</span>
            </div>
          </div>
        {/if}
        </div>
      </div>
    </section>
  {/if}
  
  <!-- Rating Summary (always show if we have reviews) -->
  {#if data.totalReviews > 0}
    <section class="rating-summary-section">
      <div class="container">
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
            <span class="review-count">{$t('reviews.based_on')} {data.totalReviews} {$t('reviews.reviews_count')}</span>
          </div>
        </div>
      </div>
    </section>
  {/if}
  
  <!-- Filters Section -->
  {#if data.reviews.length > 0}
    <section class="filters-section">
      <div class="container">
        <div class="filters-wrapper">
          <div class="filter-group">
            <label class="filter-label" for="rating-filter">{$t('reviews.filter_by_rating')}:</label>
            <select 
              id="rating-filter"
              class="filter-select" 
              bind:value={selectedRating}
              on:change={() => displayCount = 6}
            >
              <option value="all">{$t('reviews.all_ratings')} (3+ {$t('reviews.stars')})</option>
              <option value="5">5 {$t('reviews.stars')} ({ratingDistribution[5] || 0})</option>
              <option value="4">4 {$t('reviews.stars')} ({ratingDistribution[4] || 0})</option>
              <option value="3">3 {$t('reviews.stars')} ({ratingDistribution[3] || 0})</option>
              <option value="2">2 {$t('reviews.stars')} ({ratingDistribution[2] || 0})</option>
              <option value="1">1 {$t('reviews.star')} ({ratingDistribution[1] || 0})</option>
            </select>
          </div>
          
          <div class="results-info">
            {$t('reviews.showing')} {displayedReviews.length} {$t('reviews.of')} {filteredReviews.length} {$t('reviews.reviews_count')}
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
          <p>{$t('reviews.no_reviews_found')}</p>
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
              {$t('reviews.load_more')}
            </Button>
          </div>
        {/if}
      {/if}
    </div>
  </section>
</div>

<style>
  .reviews-page {
    background-color: var(--color-background);
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }
  
  /* Hero Section */
  .reviews-hero {
    background: var(--color-background);
    color: var(--color-text);
    padding: var(--space-4xl) 0;
    position: relative;
  }
  
  .hero-content {
    position: relative;
    text-align: center;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
    font-family: var(--font-display);
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-3xl);
    color: var(--color-text);
    font-weight: var(--font-weight-normal);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: var(--line-height-relaxed);
  }
  
  .rating-summary {
    display: flex;
    justify-content: center;
  }
  
  .average-rating {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);
    padding: var(--space-xl) var(--space-2xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }
  
  .rating-number {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
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
    color: var(--color-rating);
  }
  
  .review-count {
    font-size: var(--font-size-base);
    color: var(--color-text-light);
    font-weight: var(--font-weight-medium);
  }
  
  /* Standalone Rating Summary Section */
  .rating-summary-section {
    background-color: var(--color-background);
    padding: var(--space-4xl) 0;
  }
  
  .rating-summary-section .rating-summary {
    display: flex;
    justify-content: center;
  }
  
  /* Filters Section */
  .filters-section {
    background-color: var(--color-background-alt);
    padding: var(--space-4xl) 0;
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
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    background-color: var(--color-background-elevated);
    color: var(--color-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-normal);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: var(--space-3xl);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }
  
  .filter-select:hover {
    border-color: var(--color-secondary-light);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.12);
  }
  
  .filter-select:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }
  
  .results-info {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-weight: var(--font-weight-medium);
  }
  
  /* Reviews Section */
  .reviews-section {
    padding: var(--space-4xl) 0;
    background: var(--color-background);
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: var(--space-2xl);
    margin-bottom: var(--space-4xl);
    max-width: var(--container-xl);
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
  
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .filters-wrapper {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-lg);
    }

    .filter-group {
      justify-content: center;
    }

    .results-info {
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    .reviews-hero {
      padding: var(--space-3xl) 0 var(--space-2xl);
    }

    .hero-title {
      font-size: var(--font-size-3xl);
    }

    .hero-subtitle {
      font-size: var(--font-size-base);
    }

    .rating-number {
      font-size: var(--font-size-2xl);
    }

    .reviews-grid {
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }

    .filter-group {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-sm);
    }

    .filter-select {
      text-align: center;
    }
  }
</style>