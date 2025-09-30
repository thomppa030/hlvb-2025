<!-- src/lib/slices/RoomsSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import Button from '$lib/components/ui/Button.svelte';

  export let slice;

  // Extract primary data with fallbacks
  $: primaryData = {
    heading: slice.primary.heading || [{ type: 'heading2', text: 'Our Rooms', spans: [] }],
    description: slice.primary.description || [{ type: 'paragraph', text: '68 comfortable rooms', spans: [] }],
    note: slice.primary.note || [{ type: 'paragraph', text: '', spans: [] }]
  };

  // Room items from repeatable zone
  $: rooms = slice.items || [];
</script>

<section class="rooms-section">
  <div class="container">
    <div class="rooms-header">
      <div class="rooms-heading">
        <PrismicRichText field={primaryData.heading} />
      </div>
      <div class="rooms-description">
        <PrismicRichText field={primaryData.description} />
      </div>
    </div>

    {#if rooms.length > 0}
      <div class="rooms-grid">
        {#each rooms as room}
          <div class="room-card">
            <h3>{room.room_title || 'Room'}</h3>
            <p class="room-description">{room.room_description || ''}</p>
            <ul class="room-features">
              {#if room.feature_1}
                <li>{room.feature_1}</li>
              {/if}
              {#if room.feature_2}
                <li>{room.feature_2}</li>
              {/if}
              {#if room.feature_3}
                <li>{room.feature_3}</li>
              {/if}
              {#if room.feature_4}
                <li>{room.feature_4}</li>
              {/if}
            </ul>
            {#if room.booking_url}
              <Button variant="primary" href={room.booking_url}>
                {room.button_text || 'Book Now'}
              </Button>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if primaryData.note && primaryData.note[0]?.text}
      <div class="rooms-note">
        <PrismicRichText field={primaryData.note} />
      </div>
    {/if}
  </div>
</section>

<style>
  .rooms-section {
    padding: var(--space-4xl) 0;
    background: var(--color-background-alt);
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .rooms-header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .rooms-heading :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    letter-spacing: -0.01em;
  }

  .rooms-description :global(p) {
    font-size: var(--font-size-lg);
    color: var(--color-text-light);
    max-width: 700px;
    margin: 0 auto;
    line-height: var(--line-height-relaxed);
  }

  .rooms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  .room-card {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  }

  .room-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(90, 78, 71, 0.12);
  }

  .room-card h3 {
    font-family: var(--font-primary);
    color: var(--color-secondary);
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
  }

  .room-description {
    color: var(--color-text-light);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-lg);
    font-style: italic;
  }

  .room-features {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-xl) 0;
    flex-grow: 1;
  }

  .room-features li {
    padding: var(--space-sm) 0;
    color: var(--color-text);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    position: relative;
    padding-left: var(--space-lg);
  }

  .room-features li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
  }

  .rooms-note {
    text-align: center;
    margin-top: var(--space-xl);
  }

  .rooms-note :global(p) {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-style: italic;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .rooms-section {
      padding: var(--space-3xl) 0;
    }

    .rooms-grid {
      grid-template-columns: 1fr;
    }

    .rooms-heading :global(h2) {
      font-size: var(--font-size-2xl);
    }

    .rooms-description :global(p) {
      font-size: var(--font-size-base);
    }
  }

  @media (max-width: 480px) {
    .room-card h3 {
      font-size: var(--font-size-lg);
    }
  }
</style>