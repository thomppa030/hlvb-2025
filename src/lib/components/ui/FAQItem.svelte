<!-- src/lib/components/ui/FAQItem.svelte -->
<script>
  export let question = '';
  export let answer = '';
  export let category = '';
  export let expanded = false;
  export let id = '';

  function toggleExpanded() {
    expanded = !expanded;
  }
</script>

<article class="faq-item" {id}>
  <button
    class="faq-question"
    class:expanded
    on:click={toggleExpanded}
    aria-expanded={expanded}
    aria-controls="faq-answer-{id}"
    type="button"
  >
    {#if category}
      <span class="faq-category">{category}</span>
    {/if}
    <h3 class="question-text">{question}</h3>
    <svg
      class="faq-icon"
      class:expanded
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  {#if expanded}
    <div
      class="faq-answer"
      id="faq-answer-{id}"
      role="region"
      aria-labelledby="faq-question-{id}"
    >
      {@html answer}
    </div>
  {/if}
</article>

<style>
  .faq-item {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-md);
    overflow: hidden;
    transition: all var(--transition-normal);
  }

  .faq-item:hover {
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  .faq-question {
    width: 100%;
    background: none;
    border: none;
    padding: var(--space-lg) var(--space-xl);
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    transition: all var(--transition-fast);
    position: relative;
  }

  .faq-question:hover {
    background-color: var(--color-background-alt);
  }

  .faq-question:focus {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }

  .faq-question.expanded {
    background-color: var(--color-background-alt);
    border-bottom: 1px solid var(--color-border-light);
  }

  .faq-category {
    font-size: var(--font-size-xs);
    color: var(--color-text-light);
    background-color: var(--color-background);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-full);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
    margin-top: var(--space-xs);
  }

  .question-text {
    flex: 1;
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin: 0;
    line-height: var(--line-height-relaxed);
    text-align: left;
  }

  .faq-icon {
    flex-shrink: 0;
    color: var(--color-text-light);
    transition: all var(--transition-fast);
    margin-top: var(--space-xs);
  }

  .faq-icon.expanded {
    transform: rotate(180deg);
    color: var(--color-secondary);
  }

  .faq-answer {
    padding: 0 var(--space-xl) var(--space-xl) var(--space-xl);
    animation: expand 0.3s ease-out;
  }

  @keyframes expand {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .faq-answer :global(p) {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .faq-answer :global(p:last-child) {
    margin-bottom: 0;
  }

  .faq-answer :global(ul),
  .faq-answer :global(ol) {
    margin: var(--space-md) 0;
    padding-left: var(--space-xl);
  }

  .faq-answer :global(li) {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-sm);
  }

  .faq-answer :global(strong) {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .faq-answer :global(a) {
    color: var(--color-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-secondary-light);
    transition: var(--transition-fast);
  }

  .faq-answer :global(a:hover) {
    color: var(--color-secondary-light);
    border-bottom-color: var(--color-secondary-light);
  }

  .faq-answer :global(code) {
    background-color: var(--color-background);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }

  .faq-answer :global(blockquote) {
    border-left: 3px solid var(--color-secondary);
    padding-left: var(--space-lg);
    margin: var(--space-lg) 0;
    font-style: italic;
    color: var(--color-text-light);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .faq-question {
      padding: var(--space-md) var(--space-lg);
      gap: var(--space-sm);
    }

    .question-text {
      font-size: var(--font-size-base);
    }

    .faq-answer {
      padding: 0 var(--space-lg) var(--space-lg) var(--space-lg);
    }

    .faq-category {
      display: none; /* Hide category on mobile to save space */
    }
  }

  @media (max-width: 480px) {
    .faq-question {
      padding: var(--space-md);
    }

    .faq-answer {
      padding: 0 var(--space-md) var(--space-md) var(--space-md);
    }

    .question-text {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-normal);
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .faq-icon,
    .faq-answer {
      animation: none;
      transition: none;
    }
  }

  @media (forced-colors: active) {
    .faq-item {
      border: 1px solid;
    }

    .faq-question.expanded {
      border-bottom: 1px solid;
    }
  }
</style>