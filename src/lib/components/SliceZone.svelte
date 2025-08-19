<!-- src/lib/components/SliceZone.svelte -->
<script>
  import { components, NotFound } from '../slices/index.js';
  
  export let slices = [];

  function getSliceComponent(sliceType) {
    return components[sliceType] || NotFound;
  }
</script>

{#if slices && slices.length > 0}
  {#each slices as slice (slice.id)}
    <svelte:component this={getSliceComponent(slice.slice_type)} {slice} />
  {/each}
{:else}
  <div class="no-content">
    <div class="container">
      <p>No content available.</p>
    </div>
  </div>
{/if}

<style>
  .no-content {
    padding: var(--space-4xl) 0;
    text-align: center;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .no-content p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    color: var(--color-text-light);
  }
</style>