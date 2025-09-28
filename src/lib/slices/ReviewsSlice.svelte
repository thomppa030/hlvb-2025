<!-- src/lib/slices/ReviewsSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import Button from '../components/ui/Button.svelte';
  
  export let slice;

  $: reviewsData = {
    title: slice.primary.title || [{ type: 'heading2', text: 'What Our Guests Say', spans: [] }],
    description: slice.primary.description || [{ type: 'paragraph', text: 'Highly rated across all major booking platforms.', spans: [] }],
    button_text: slice.primary.button_text || 'Read All Reviews',
    button_link: slice.primary.button_link?.url || '/reviews',
    ratings: slice.items || []
  };

  // Default ratings if none provided
  $: defaultRatings = reviewsData.ratings.length > 0 ? reviewsData.ratings : [
    { platform: 'Google', score: '4.3/5' },
    { platform: 'TripAdvisor', score: '4.5/5' },
    { platform: 'HRS', score: '8.6/10' },
    { platform: 'Booking.com', score: '8.5/10' }
  ];
</script>

<section class="reviews-slice">
  <div class="container">
    <div class="reviews-content">
      <div class="reviews-text">
        <div class="reviews-title">
          <PrismicRichText field={reviewsData.title} />
        </div>
        
        <div class="reviews-description">
          <PrismicRichText field={reviewsData.description} />
        </div>
        
        <Button 
          variant="secondary" 
          size="large" 
          href={reviewsData.button_link}
        >
          {reviewsData.button_text}
        </Button>
      </div>
      
      <div class="ratings-grid">
        {#each defaultRatings as rating}
          <div class="rating-item">
            <div class="rating-score">{rating.score}</div>
            <div class="rating-source">{rating.platform}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .reviews-slice {
    padding: var(--space-4xl) 0;
    background: var(--color-background-alt);
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .reviews-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: center;
  }

  .reviews-title :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    position: relative;
    padding-bottom: var(--space-lg);
  }

  .reviews-title :global(h2)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--color-secondary);
    border-radius: var(--radius-sm);
  }

  .reviews-description :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
  }

  .ratings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .rating-item {
    background: var(--color-background-elevated);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    text-align: center;
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
    transition: transform var(--transition-fast);
  }

  .rating-item:hover {
    transform: translateY(-2px);
  }

  .rating-score {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    margin-bottom: var(--space-xs);
    font-family: var(--font-display);
  }

  .rating-source {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-weight: var(--font-weight-medium);
    font-family: var(--font-primary);
  }


  /* Mobile responsive */
  @media (max-width: 1024px) {
    .reviews-content {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
  }

  @media (max-width: 768px) {
    .reviews-slice {
      padding: var(--space-3xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .reviews-title :global(h2) {
      font-size: var(--font-size-2xl);
    }

    .reviews-description :global(p) {
      font-size: var(--font-size-base);
    }

    .ratings-grid {
      grid-template-columns: 1fr;
    }
  }
</style>