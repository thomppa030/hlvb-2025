<!-- src/lib/components/ui/ReviewCard.svelte -->
<script>
  export let rating = 0;
  export let comment = "";
  export let author = "Anonymous";
  export let date = "";
  export let source = "";
  
  // Generate star rating display
  $: stars = Array(5).fill(0).map((_, i) => i < rating);
  
  // Anonymize author name
  function anonymizeName(name) {
    if (!name || name === "Anonymous") return "Guest";
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase() + '.';
    }
    return parts[0] + ' ' + parts[parts.length - 1].charAt(0).toUpperCase() + '.';
  }
  
  $: displayName = anonymizeName(author);
  
  // Format date
  function formatDate(dateString) {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  }
  
  $: formattedDate = formatDate(date);
</script>

<article class="review-card">
  <div class="review-header">
    <div class="rating-wrapper">
      <div class="stars" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
        {#each stars as filled, i}
          <span class="star" class:filled>
            {#if filled}
              ★
            {:else}
              ☆
            {/if}
          </span>
        {/each}
      </div>
      <span class="rating-text">{rating}/5</span>
    </div>
    {#if formattedDate}
      <time class="review-date" datetime={date}>{formattedDate}</time>
    {/if}
  </div>
  
  <blockquote class="review-comment">
    <p>{comment}</p>
  </blockquote>
  
  <footer class="review-footer">
    <cite class="review-author">— {displayName}</cite>
    {#if source}
      <span class="review-source">via {source}</span>
    {/if}
  </footer>
</article>

<style>
  .review-card {
    background-color: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    transition: all var(--transition-normal);
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
    position: relative;
    overflow: hidden;
  }
  
  
  .review-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(90, 78, 71, 0.12);
    border-color: var(--color-border);
  }
  
  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-lg);
    gap: var(--space-lg);
  }
  
  .rating-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
  
  .stars {
    display: flex;
    gap: 4px;
    font-size: var(--font-size-xl);
    line-height: 1;
    margin-bottom: var(--space-xs);
  }
  
  .star {
    color: var(--color-border);
    transition: color var(--transition-fast);
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
  }
  
  .star.filled {
    color: #D4AF37; /* More vibrant gold for better visibility */
  }
  
  .rating-text {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
    background: var(--color-background-alt);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-light);
  }
  
  .review-date {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-weight: var(--font-weight-normal);
    text-align: right;
  }
  
  .review-comment {
    flex: 1;
    margin: 0 0 var(--space-lg) 0;
    position: relative;
    background: rgba(124, 107, 101, 0.03);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
  }
  
  .review-comment p {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    font-style: normal;
    position: relative;
    padding: 0;
    font-weight: var(--font-weight-normal);
    letter-spacing: 0.01em;
    margin: 0;
  }
  
  .review-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-lg);
    border-top: 1px solid var(--color-border-light);
    margin-top: auto;
    background: var(--color-background-alt);
    margin-left: calc(-1 * var(--space-2xl));
    margin-right: calc(-1 * var(--space-2xl));
    margin-bottom: calc(-1 * var(--space-2xl));
    padding-left: var(--space-2xl);
    padding-right: var(--space-2xl);
    padding-bottom: var(--space-lg);
    border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  }
  
  .review-author {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    font-style: normal;
  }
  
  .review-source {
    font-size: var(--font-size-sm);
    color: var(--color-text-lighter);
    font-style: normal;
    font-weight: var(--font-weight-medium);
  }
  
  
  @media (max-width: 768px) {
    .review-card {
      padding: var(--space-lg);
    }
    
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-md);
    }
    
    .review-date {
      text-align: left;
      margin-top: var(--space-xs);
    }
    
    .review-comment {
      padding: var(--space-md);
      margin-left: calc(-1 * var(--space-lg));
      margin-right: calc(-1 * var(--space-lg));
    }
    
    .review-comment p {
      font-size: var(--font-size-base);
    }
    
    .review-footer {
      margin-left: calc(-1 * var(--space-lg));
      margin-right: calc(-1 * var(--space-lg));
      margin-bottom: calc(-1 * var(--space-lg));
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }
  }
</style>