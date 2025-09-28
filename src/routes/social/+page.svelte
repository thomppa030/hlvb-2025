<!-- src/routes/social/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let scriptLoaded = false;
  let showWidget = false;
  let debugMode = false;
  let widgetStructure = null;
  let showControls = false;
  let widgetTheme = "carousel";
  let currentSlide = 0;
  let totalSlides = 0;

  onMount(() => {
    if (browser) {
      // Check if this is the first visit (not a refresh)
      const hasRefreshed = sessionStorage.getItem("social-page-refreshed");
      console.log("Has refreshed:", hasRefreshed);

      if (!hasRefreshed) {
        console.log("First visit detected, refreshing page...");
        // First visit - set flag and refresh
        sessionStorage.setItem("social-page-refreshed", "true");
        location.reload();
        return;
      }

      console.log("Page already refreshed, loading Aadvanto widget script...");

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src*="aadvanto.com"]',
      );
      if (existingScript) {
        showWidget = true;
        return;
      }

      // Load the script
      const script = document.createElement("script");
      script.src =
        "https://app.aadvanto.com/widgets-assets/website-widgets.bundle.js";
      script.async = true;

      script.onload = () => {
        console.log("Aadvanto script loaded");
        scriptLoaded = true;

        // Wait a bit for initialization then show widget regardless
        showWidget = true;

        // Analyze widget structure after it loads
        setTimeout(() => {
          analyzeWidgetStructure();
        }, 3000);
      };

      script.onerror = (error) => {
        console.error("Failed to load Aadvanto script:", error);
        showWidget = false;
      };

      document.head.appendChild(script);
    }
  });

  // Clean up the flag when navigating away (not on refresh)
  onMount(() => {
    return () => {
      // This runs when component unmounts (navigating away)
      if (browser) {
        sessionStorage.removeItem("social-page-refreshed");
      }
    };
  });

  function analyzeWidgetStructure() {
    const widget = document.querySelector("ub-widget-social-post");
    if (!widget) {
      console.log("Widget not found");
      return;
    }

    console.log("🔍 Widget Analysis Starting...");

    // Basic widget info
    const analysis = {
      tagName: widget.tagName,
      id: widget.id,
      className: widget.className,
      shadowRoot: !!widget.shadowRoot,
      innerHTML:
        widget.innerHTML.slice(0, 500) +
        (widget.innerHTML.length > 500 ? "..." : ""),
      childElementCount: widget.childElementCount,
      elements: [],
    };

    // Find all nested elements
    const allElements = widget.querySelectorAll("*");
    const elementTypes = new Set();

    allElements.forEach((el, index) => {
      elementTypes.add(el.tagName.toLowerCase());
      if (index < 20) {
        // Limit to first 20 elements for readability
        analysis.elements.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          attributes: Array.from(el.attributes).map(
            (attr) => `${attr.name}="${attr.value}"`,
          ),
          textContent: el.textContent?.slice(0, 100) || "",
        });
      }
    });

    analysis.uniqueElements = Array.from(elementTypes);
    analysis.totalElements = allElements.length;

    console.log("📊 Widget Structure:", analysis);
    widgetStructure = analysis;

    // Check for Shadow DOM
    if (widget.shadowRoot) {
      console.log("🌑 Shadow DOM detected:", widget.shadowRoot);
    }

    // Monitor for changes
    setupWidgetMonitoring(widget);
  }

  function setupWidgetMonitoring(widget) {
    const observer = new MutationObserver((mutations) => {
      console.log(
        "🔄 Widget changed:",
        mutations.map((m) => ({
          type: m.type,
          target: m.target.tagName,
          addedNodes: m.addedNodes.length,
          removedNodes: m.removedNodes.length,
        })),
      );
    });

    observer.observe(widget, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }

  function toggleDebugMode() {
    debugMode = !debugMode;
    console.log("Debug mode:", debugMode ? "ON" : "OFF");
  }

  function refreshWidget() {
    showWidget = false;
    setTimeout(() => {
      showWidget = true;
      setTimeout(analyzeWidgetStructure, 3000);
    }, 100);
  }

  function initializeCarousel() {
    setTimeout(() => {
      const slides = document.querySelectorAll(".ubw-social-post-list > li");
      totalSlides = slides.length;
      currentSlide = 0;
      console.log(`Carousel initialized with ${totalSlides} slides`);
      updateCarousel();
    }, 200);
  }

  function updateCarousel() {
    const slides = document.querySelectorAll(".ubw-social-post-list > li");
    console.log(
      `Updating carousel to slide ${currentSlide}, found ${slides.length} slides`,
    );

    const wrapper = document.querySelector(".ubw-social-post-wrapper");
    const list = document.querySelector(".ubw-social-post-list");

    console.log("Container info:", {
      wrapper: wrapper ? "exists" : "missing",
      wrapperHeight: wrapper ? wrapper.offsetHeight + "px" : "N/A",
      list: list ? "exists" : "missing",
      listHeight: list ? list.offsetHeight + "px" : "N/A",
    });

    slides.forEach((slide, index) => {
      console.log(`Slide ${index}:`, {
        hasContent: slide.innerHTML.length > 0,
        height: slide.offsetHeight + "px",
        opacity: window.getComputedStyle(slide).opacity,
        visibility: window.getComputedStyle(slide).visibility,
        position: window.getComputedStyle(slide).position,
      });

      if (index === currentSlide) {
        slide.style.setProperty("opacity", "1", "important");
        slide.style.setProperty("visibility", "visible", "important");
        slide.style.setProperty("z-index", "10", "important");
        slide.style.setProperty("display", "block", "important");
        slide.classList.add("carousel-active");
        console.log(`✅ Made slide ${index} visible`);
      } else {
        slide.style.setProperty("opacity", "0", "important");
        slide.style.setProperty("visibility", "hidden", "important");
        slide.style.setProperty("z-index", "1", "important");
        slide.classList.remove("carousel-active");
        console.log(`❌ Made slide ${index} hidden`);
      }
    });
  }

  function nextSlide() {
    console.log(
      `Next: currentSlide=${currentSlide}, totalSlides=${totalSlides}`,
    );
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      console.log(`Moving to slide ${currentSlide}`);
      updateCarousel();
    } else {
      console.log("Already at last slide");
    }
  }

  function prevSlide() {
    console.log(
      `Prev: currentSlide=${currentSlide}, totalSlides=${totalSlides}`,
    );
    if (currentSlide > 0) {
      currentSlide--;
      console.log(`Moving to slide ${currentSlide}`);
      updateCarousel();
    } else {
      console.log("Already at first slide");
    }
  }

  function goToSlide(index) {
    console.log(`GoTo: currentSlide=${currentSlide} -> ${index}`);
    currentSlide = index;
    updateCarousel();
  }

  // Initialize carousel when widget is ready
  $: if (showWidget) {
    setTimeout(initializeCarousel, 100);
  }
</script>

<svelte:head>
  <title>Social Media - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Stay connected with Hotel Ludwig van Beethoven through our social media updates."
  />
</svelte:head>

<div class="social-page">
  <div class="container">
    <header class="page-header">
      <h1>Social Media</h1>
      <p>
        Stay connected with us and see what our guests are sharing about their
        experiences.
      </p>
    </header>

    <section class="social-widget-section">
      <div class="widget-container" class:debug-active={debugMode}>
        {#if !showWidget}
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading social media feed...</p>
          </div>
        {/if}

        <!-- Always render the widget HTML, just hide it while loading -->
        <div
          class="widget-wrapper theme-carousel"
          style="display: {showWidget ? 'flex' : 'none'}"
        >
          <ub-widget-social-post
            data-key="OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv"
            data-locationId="4973010"
          >
          </ub-widget-social-post>

          <!-- Carousel Navigation -->
          {#if totalSlides > 1}
            <div class="carousel-nav">
              <button
                class="carousel-btn carousel-btn-prev"
                on:click={prevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                ←
              </button>

              <div class="carousel-indicators">
                {#each Array(totalSlides) as _, index}
                  <button
                    class="carousel-indicator"
                    class:active={currentSlide === index}
                    on:click={() => goToSlide(index)}
                    aria-label="Go to slide {index + 1}"
                  ></button>
                {/each}
              </div>

              <button
                class="carousel-btn carousel-btn-next"
                on:click={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- Keep the iframe approach hidden but present -->
    <section class="alternative-widget-section" style="display: none;">
      <div class="widget-container">
        <iframe
          src="https://app.aadvanto.com/widget/social-post?key=OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv&locationId=4973010"
          width="100%"
          height="600"
          frameborder="0"
          style="border: none;"
        >
        </iframe>
      </div>
    </section>
  </div>
</div>

<style>
  .social-page {
    min-height: 100vh;
    background: var(--color-background);
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-4xl);
  }

  .page-header h1 {
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    font-family: var(--font-display);
  }

  .page-header p {
    color: var(--color-text-light);
    font-size: var(--font-size-lg);
    max-width: 600px;
    margin: 0 auto;
  }

  .widget-container {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-3xl);
    min-height: 1000px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    text-align: center;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--color-border-light);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--space-lg);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading p {
    color: var(--color-text-light);
    font-size: var(--font-size-lg);
  }

  .widget-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Widget styling - force center alignment */
  :global(ub-widget-social-post) {
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* Target all nested elements in the widget */
  :global(ub-widget-social-post *) {
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: center !important;
  }

  /* Target direct children */
  :global(ub-widget-social-post > *) {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* Target any divs inside the widget */
  :global(ub-widget-social-post div) {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Target any iframes inside the widget */
  :global(ub-widget-social-post iframe) {
    margin: 0 auto !important;
    display: block !important;
  }

  /* Debug Mode Visual Indicators */
  .debug-active {
    position: relative;
  }

  .debug-active :global(ub-widget-social-post *) {
    outline: 1px solid rgba(255, 0, 0, 0.3) !important;
  }

  .debug-active :global(ub-widget-social-post > *) {
    background: rgba(255, 0, 0, 0.1) !important;
  }

  .debug-active :global(ub-widget-social-post > * > *) {
    background: rgba(0, 255, 0, 0.1) !important;
  }

  .debug-active :global(ub-widget-social-post > * > * > *) {
    background: rgba(0, 0, 255, 0.1) !important;
  }

  .debug-active :global(ub-widget-social-post > * > * > * > *) {
    background: rgba(255, 255, 0, 0.1) !important;
  }

  /* Debug Info Panel */
  .debug-info {
    margin-top: var(--space-lg);
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
  }

  .debug-info h3 {
    color: var(--color-text);
    margin-bottom: var(--space-md);
    font-family: var(--font-display);
  }

  .structure-details p {
    margin: var(--space-xs) 0;
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
  }

  .element-list {
    max-height: 300px;
    overflow-y: auto;
    margin-top: var(--space-sm);
  }

  .element-item {
    padding: var(--space-sm);
    border-bottom: 1px solid var(--color-border-light);
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
  }

  .class-name {
    color: var(--color-primary);
    margin-left: var(--space-xs);
  }

  .id-name {
    color: var(--color-accent);
    margin-left: var(--space-xs);
  }

  .text-content {
    color: var(--color-text-light);
    font-size: var(--font-size-xs);
    margin-top: var(--space-xs);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  details summary {
    cursor: pointer;
    padding: var(--space-sm) 0;
    color: var(--color-primary);
  }

  /* Carousel Theme - single item display with navigation */
  .theme-carousel :global(.ubw-social-post-wrapper) {
    overflow: hidden !important;
    position: relative !important;
  }

  .theme-carousel :global(.ubw-social-post-list) {
    display: block !important;
    overflow: hidden !important;
    width: 100% !important;
    min-height: 800px !important;
    height: 100% !important;
    position: relative !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .theme-carousel :global(.ubw-social-post-list > li) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    list-style: none !important;
    margin: 0 !important;
    transition:
      opacity 0.4s ease,
      visibility 0.4s ease !important;
    opacity: 0 !important;
    visibility: hidden !important;
    z-index: 1 !important;
  }

  .theme-carousel :global(.ubw-social-post-list > li:first-child) {
    opacity: 1 !important;
    visibility: visible !important;
    z-index: 10 !important;
  }

  /* Class-based active slide styling with maximum specificity */
  .theme-carousel :global(.ubw-social-post-list > li.carousel-active) {
    opacity: 1 !important;
    visibility: visible !important;
    z-index: 10 !important;
    display: block !important;
  }

  .theme-carousel :global(.ubw-social-post-list > li:not(.carousel-active)) {
    opacity: 0 !important;
    visibility: hidden !important;
    z-index: 1 !important;
  }

  .theme-carousel :global(.ubw-social-post-item) {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    background: var(--color-background-elevated) !important;
    border: 1px solid var(--color-border-light) !important;
    border-radius: var(--radius-lg) !important;
    box-shadow: var(--shadow-md) !important;
    transition: all 0.3s ease !important;
    overflow: hidden !important;
  }

  .theme-carousel :global(.ubw-social-post-item:hover) {
    transform: translateY(-4px) !important;
    box-shadow: var(--shadow-lg) !important;
  }

  .theme-carousel :global(.ubw-social-post-item-photo) {
    flex-shrink: 0 !important;
    height: 300px !important;
    overflow: hidden !important;
  }

  .theme-carousel :global(.ubw-social-post-item-photo img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .theme-carousel :global(.ubw-social-post-item-title-container) {
    padding: var(--space-md) var(--space-md) var(--space-sm) !important;
    font-size: var(--font-size-lg) !important;
    font-family: var(--font-display) !important;
  }

  .theme-carousel :global(.ubw-social-post-item-title-container a) {
    color: var(--color-text) !important;
    text-decoration: none !important;
    display: block !important;
    line-height: 1.3 !important;
  }

  .theme-carousel :global(.ubw-social-post-item-title-container a:hover) {
    color: var(--color-primary) !important;
  }

  .theme-carousel :global(.ubw-social-post-item-description) {
    padding: 0 var(--space-md) !important;
    flex-grow: 1 !important;
    font-size: var(--font-size-sm) !important;
    line-height: 1.5 !important;
    color: var(--color-text-light) !important;
    overflow: hidden !important;
  }

  .theme-carousel :global(.ubw-social-post-item-button) {
    margin: var(--space-md) !important;
    margin-top: auto !important;
    background: var(--color-primary) !important;
    color: white !important;
    border: none !important;
    padding: var(--space-sm) var(--space-md) !important;
    border-radius: var(--radius-md) !important;
    font-size: var(--font-size-sm) !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    align-self: stretch !important;
  }

  .theme-carousel :global(.ubw-social-post-item-button:hover) {
    background: var(--color-primary-dark) !important;
    transform: translateY(-1px) !important;
  }

  /* Carousel Navigation */
  .carousel-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    margin: var(--space-lg) auto 0;
    background: rgba(255, 255, 255, 0.95);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(10px);
    z-index: 100 !important;
    pointer-events: auto !important;
    width: fit-content;
  }

  .carousel-btn {
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    font-size: var(--font-size-lg);
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    user-select: none;
  }

  .carousel-btn:hover:not(:disabled) {
    background: var(--color-primary-dark);
    transform: scale(1.1);
  }

  .carousel-btn:disabled {
    background: var(--color-border-light);
    color: var(--color-text-light);
    cursor: not-allowed;
    transform: scale(0.9);
  }

  .carousel-indicators {
    display: flex;
    gap: var(--space-xs);
    margin: 0 var(--space-sm);
  }

  .carousel-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: var(--color-border-light);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .carousel-indicator.active {
    background: var(--color-primary);
    transform: scale(1.2);
  }

  .carousel-indicator:hover {
    background: var(--color-primary);
  }

  /* Position carousel nav above widget content */
  .theme-carousel {
    position: relative;
  }

  .widget-container {
    position: relative !important;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .social-page {
      padding: var(--space-2xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .widget-container {
      padding: var(--space-xl);
      min-height: 600px;
    }
  }
</style>