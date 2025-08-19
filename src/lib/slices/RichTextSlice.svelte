<!-- src/lib/slices/RichTextSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  
  export let slice;
</script>

<section class="rich-text-slice">
  <div class="container">
    <div class="rich-text-content">
      <PrismicRichText field={slice.primary.content} />
    </div>
  </div>
</section>

<style>
  .rich-text-slice {
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .rich-text-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .rich-text-content :global(h1) {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    line-height: var(--line-height-tight);
  }

  .rich-text-content :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    margin-top: var(--space-2xl);
    line-height: var(--line-height-tight);
  }

  .rich-text-content :global(h3) {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    margin-bottom: var(--space-md);
    margin-top: var(--space-xl);
    line-height: var(--line-height-tight);
  }

  .rich-text-content :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    color: var(--color-text);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-lg);
  }

  .rich-text-content :global(ul),
  .rich-text-content :global(ol) {
    margin-bottom: var(--space-lg);
    padding-left: var(--space-xl);
  }

  .rich-text-content :global(li) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    color: var(--color-text);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-sm);
  }

  .rich-text-content :global(strong) {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .rich-text-content :global(em) {
    font-style: italic;
  }

  .rich-text-content :global(a) {
    color: var(--color-secondary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-fast);
  }

  .rich-text-content :global(a:hover) {
    color: var(--color-secondary-light);
    text-decoration: underline;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .rich-text-slice {
      padding: var(--space-3xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .rich-text-content :global(h1) {
      font-size: var(--font-size-3xl);
    }

    .rich-text-content :global(h2) {
      font-size: var(--font-size-2xl);
    }

    .rich-text-content :global(h3) {
      font-size: var(--font-size-xl);
    }

    .rich-text-content :global(p),
    .rich-text-content :global(li) {
      font-size: var(--font-size-base);
    }
  }
</style>