<!-- src/lib/slices/CarouselSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import ImageCarousel from '$lib/components/ui/ImageCarousel.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  export let slice;

  let currentSlide = 0;

  // Extract carousel configuration from slice primary fields
  $: carouselConfig = {
    autoplay: slice.primary.autoplay ?? false,
    autoplayInterval: slice.primary.autoplay_interval || 5000,
    showThumbnails: slice.primary.show_thumbnails ?? true,
    showIndicators: slice.primary.show_indicators ?? true,
    showNavigation: slice.primary.show_navigation ?? true,
    aspectRatio: slice.primary.aspect_ratio || '16/9'
  };

  // Convert Prismic image items to carousel format and include room data
  $: carouselImages = slice.items?.map(item => ({
    src: item.image?.url || '',
    alt: item.image?.alt || item.caption?.[0]?.text || 'Carousel image',
    caption: item.caption?.[0]?.text || ''
  })).filter(img => img.src) || [];

  // Extract room information from items
  $: roomData = slice.items?.map(item => ({
    title: item.room_title || '',
    description: item.room_description || '',
    bedType: item.room_bed_type || '',
    features: item.room_features
      ? item.room_features.split(',').map(f => f.trim()).filter(f => f.length > 0)
      : [],
    bookingButtonText: item.booking_button_text || '',
    bookingUrl: item.booking_url || ''
  })) || [];

  // Current room info based on slide
  $: currentRoom = roomData[currentSlide] || {};
  $: hasRoomInfo = currentRoom.title || currentRoom.description || currentRoom.bedType || (currentRoom.features && currentRoom.features.length > 0);

  // Section content
  $: sectionData = {
    heading: slice.primary.section_heading,
    subheading: slice.primary.section_subheading,
    description: slice.primary.section_description
  };

  // Check if we have any content to show
  $: hasContent = carouselImages.length > 0;
  $: hasHeading = sectionData.heading?.[0]?.text;
  $: hasSubheading = sectionData.subheading?.[0]?.text;
  $: hasDescription = sectionData.description?.[0]?.text;

  function handleSlideChange(event) {
    currentSlide = event.detail.index;
  }
</script>

{#if hasContent}
  <section class="carousel-slice">
    <div class="container">
      {#if hasHeading || hasSubheading || hasDescription}
        <div class="carousel-header">
          {#if hasHeading}
            <div class="carousel-heading">
              <PrismicRichText field={sectionData.heading} />
            </div>
          {/if}
          
          {#if hasSubheading}
            <div class="carousel-subheading">
              <PrismicRichText field={sectionData.subheading} />
            </div>
          {/if}
          
          {#if hasDescription}
            <div class="carousel-description">
              <PrismicRichText field={sectionData.description} />
            </div>
          {/if}
          
          <div class="carousel-divider"></div>
        </div>
      {/if}
      
      <div class="carousel-wrapper">
        <ImageCarousel
          images={carouselImages}
          autoplay={carouselConfig.autoplay}
          autoplayInterval={carouselConfig.autoplayInterval}
          showThumbnails={carouselConfig.showThumbnails}
          showIndicators={carouselConfig.showIndicators}
          showNavigation={carouselConfig.showNavigation}
          aspectRatio={carouselConfig.aspectRatio}
          on:slideChange={handleSlideChange}
        />
      </div>

      {#if hasRoomInfo}
        <div class="room-info">
          <div class="room-info-grid">
            <div class="room-header">
              {#if currentRoom.title}
                <h3 class="room-title">{currentRoom.title}</h3>
              {/if}
              {#if currentRoom.description}
                <p class="room-description">{currentRoom.description}</p>
              {/if}
            </div>

            <div class="room-details">
              {#if currentRoom.bedType}
                <div class="room-bed-info">
                  <span class="bed-label">Bett:</span>
                  <span class="bed-value">{currentRoom.bedType}</span>
                </div>
              {/if}

              {#if currentRoom.features && currentRoom.features.length > 0}
                <div class="room-features">
                  <span class="features-label">Ausstattung:</span>
                  <ul class="features-list">
                    {#each currentRoom.features as feature}
                      <li>{feature}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>

            {#if currentRoom.bookingUrl && currentRoom.bookingButtonText}
              <div class="room-booking">
                <Button variant="primary" size="medium" href={currentRoom.bookingUrl}>
                  {currentRoom.bookingButtonText}
                </Button>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </section>
{/if}

<style>
  .carousel-slice {
    padding: var(--space-4xl) 0;
    background: var(--color-background);
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .carousel-header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .carousel-heading :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    letter-spacing: -0.02em;
    line-height: var(--line-height-tight);
  }

  .carousel-subheading :global(h3) {
    font-family: var(--font-primary);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    color: var(--color-secondary);
    margin-bottom: var(--space-lg);
    letter-spacing: 0.01em;
  }

  .carousel-description :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto var(--space-xl);
  }

  /* Decorative divider */
  .carousel-divider {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    margin: 0 auto;
    border-radius: var(--radius-full);
  }

  .carousel-wrapper {
    position: relative;
  }

  /* Enhanced carousel styling for slice context */
  .carousel-wrapper :global(.carousel) {
    max-width: 100%;
    margin: 0 auto;
  }

  /* Room Information Panel */
  .room-info {
    margin-top: var(--space-xl);
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);
  }

  .room-info-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--space-xl);
    align-items: center;
    padding: var(--space-xl) var(--space-2xl);
  }

  .room-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .room-title {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    margin: 0;
    letter-spacing: -0.02em;
    line-height: var(--line-height-tight);
  }

  .room-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin: 0;
    font-style: italic;
  }

  .room-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .room-bed-info {
    display: flex;
    gap: var(--space-sm);
    align-items: baseline;
  }

  .bed-label {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    font-size: var(--font-size-sm);
  }

  .bed-value {
    color: var(--color-text-light);
    font-size: var(--font-size-sm);
  }

  .room-features {
    display: flex;
    gap: var(--space-sm);
  }

  .features-label {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    font-size: var(--font-size-sm);
    flex-shrink: 0;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs) var(--space-md);
  }

  .features-list li {
    position: relative;
    padding-left: var(--space-md);
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
  }

  .features-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
  }

  .room-booking {
    display: flex;
    justify-content: flex-end;
  }

  /* Responsive design */
  @media (max-width: 1024px) {
    .carousel-slice {
      padding: var(--space-3xl) 0;
    }

    .carousel-header {
      margin-bottom: var(--space-2xl);
    }

    .carousel-heading :global(h2) {
      font-size: var(--font-size-3xl);
    }

    .carousel-subheading :global(h3) {
      font-size: var(--font-size-lg);
    }

    .carousel-description :global(p) {
      font-size: var(--font-size-base);
    }

    .carousel-divider {
      width: 100px;
      height: 2px;
    }

    .room-info-grid {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
      padding: var(--space-lg);
    }

    .room-booking {
      justify-content: stretch;
    }

    .room-booking :global(a) {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .carousel-slice {
      padding: var(--space-2xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .carousel-header {
      margin-bottom: var(--space-xl);
    }

    .carousel-heading :global(h2) {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-md);
    }

    .carousel-subheading :global(h3) {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-md);
    }

    .carousel-description :global(p) {
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-lg);
    }

    .carousel-divider {
      width: 80px;
    }

    .room-info-grid {
      padding: var(--space-md);
      gap: var(--space-md);
    }

    .room-title {
      font-size: var(--font-size-xl);
    }

    .features-list {
      flex-direction: column;
      gap: var(--space-xs);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .carousel-heading :global(h2) {
      font-size: var(--font-size-xl);
    }

    .carousel-divider {
      width: 60px;
    }

    .room-info {
      margin-top: var(--space-md);
    }

    .room-title {
      font-size: var(--font-size-lg);
    }

    .room-description {
      font-size: var(--font-size-xs);
    }
  }
</style>