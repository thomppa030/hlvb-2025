<!-- src/lib/slices/RoomsSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import Button from '$lib/components/ui/Button.svelte';

  export let slice;

  // Extract primary data with fallbacks
  $: primaryData = {
    heading: slice.primary.heading || [{ type: 'heading2', text: 'Our Rooms', spans: [] }],
    description: slice.primary.description || [{ type: 'paragraph', text: '68 comfortable rooms', spans: [] }],
    noteHeading: slice.primary.note_heading || '',
    bookingButtonText: slice.primary.booking_button_text || 'Book Now',
    bookingUrl: slice.primary.booking_url || '/booking'
  };

  // Build rooms array from primary fields
  $: rooms = [
    {
      title: slice.primary.single_room_title,
      description: slice.primary.single_room_description,
      bed: slice.primary.single_room_bed
    },
    {
      title: slice.primary.double_room_title,
      description: slice.primary.double_room_description,
      bed: slice.primary.double_room_bed
    },
    {
      title: slice.primary.triple_room_title,
      description: slice.primary.triple_room_description,
      bed: slice.primary.triple_room_bed
    },
    {
      title: slice.primary.quad_room_title,
      description: slice.primary.quad_room_description,
      bed: slice.primary.quad_room_bed
    }
  ].filter(room => room.title);

  // Note features from items (repeatable)
  $: noteFeatures = (slice.items || []).filter(item => item.note_feature).map(item => item.note_feature);
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
            <h3>{room.title}</h3>
            {#if room.description}
              <p class="room-description">{room.description}</p>
            {/if}
            {#if room.bed}
              <p class="room-bed-info">{room.bed}</p>
            {/if}
            {#if primaryData.bookingUrl}
              <Button variant="primary" href={primaryData.bookingUrl}>
                {primaryData.bookingButtonText}
              </Button>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if noteFeatures.length > 0}
      <div class="rooms-note">
        {#if primaryData.noteHeading}
          <p class="note-heading">{primaryData.noteHeading}</p>
        {/if}
        <ul class="note-features">
          {#each noteFeatures as feature}
            <li>{feature}</li>
          {/each}
        </ul>
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
    margin-bottom: var(--space-md);
    font-style: italic;
  }

  .room-bed-info {
    color: var(--color-text);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-xl);
    flex-grow: 1;
  }

  .rooms-note {
    text-align: center;
    margin-top: var(--space-2xl);
    padding: var(--space-xl);
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .note-heading {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .note-features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm) var(--space-lg);
  }

  .note-features li {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    position: relative;
    padding-left: var(--space-lg);
  }

  .note-features li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
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