<!-- src/routes/aktuelles/+page.svelte -->
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

      if (!hasRefreshed) {
        // First visit - set flag and refresh
        sessionStorage.setItem("social-page-refreshed", "true");
        location.reload();
        return;
      }

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
  <title>Aktuelles - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Bleiben Sie mit dem Hotel Ludwig van Beethoven über unsere Social Media Updates verbunden."
  />
</svelte:head>

<div class="social-page">
  <!-- Hero Section -->
  <section class="social-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="heading-accent-center">Aktuelles</h1>
        <p class="hero-subtitle">
          Bleiben Sie mit uns in Verbindung und sehen Sie, was unsere Gäste über ihre
          Erfahrungen im Hotel Ludwig van Beethoven teilen.
        </p>
      </div>
    </div>
  </section>

  <!-- Social Media Feed Section -->
  <section class="social-feed-section">
    <div class="container">
      <div class="feed-header">
        <h2 class="heading-accent-center">Neueste Beiträge</h2>
        <p>Entdecken Sie die neuesten Beiträge und Erfahrungen unserer Gäste.</p>
      </div>
      <div class="widget-container" class:debug-active={debugMode}>
        {#if !showWidget}
          <div class="loading">
            <div class="spinner"></div>
            <p>Social Media Feed wird geladen...</p>
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
    </div>
  </section>

  <!-- Introduction Section -->
  <section class="social-intro">
    <div class="container">
      <div class="intro-content">
        <div class="intro-text">
          <h2 class="heading-accent-center">Verbinden Sie sich mit uns</h2>
          <p>
            Folgen Sie unserer Reise und werden Sie Teil unserer Gemeinschaft von Reisenden, die
            ihre unvergesslichen Erfahrungen in Berlin teilen. Von architektonischen Highlights
            bis zu lokalen Entdeckungen - sehen Sie, wie unsere Gäste den authentischen
            Charme von Kreuzberg erleben.
          </p>
          <p>
            Teilen Sie Ihre eigenen Momente mit <strong
              >#HotelLudwigVanBeethoven</strong
            >
            und werden Sie Teil unserer Geschichte.
          </p>
        </div>
        <div class="social-links-grid">
          <a
            href="https://facebook.com/hotellvb"
            target="_blank"
            rel="noopener"
            class="social-link-card"
          >
            <div class="social-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path
                  d="M452,0H60C26.916,0,0,26.916,0,60v392c0,33.084,26.916,60,60,60h392c33.084,0,60-26.916,60-60V60 C512,26.916,485.084,0,452,0z M472,452c0,11.028-8.972,20-20,20H338V309h61.79L410,247h-72v-43c0-16.975,13.025-30,30-30h41v-62 h-41c-50.923,0-91.978,41.25-91.978,92.174V247H216v62h60.022v163H60c-11.028,0-20-8.972-20-20V60c0-11.028,8.972-20,20-20h392 c11.028,0,20,8.972,20,20V452z"
                />
              </svg>
            </div>
            <h3>Facebook</h3>
            <p>Updates & Gemeinschaft</p>
          </a>
          <a
            href="https://www.google.com/search?q=hotel+ludwig+van+beethoven&sca_esv=1ab80d3e8e62071f&sxsrf=AE3TifPjRmTbDli-tqJhmHiagrc4IllUfQ%3A1759061016069&source=hp&ei=GCTZaJ68AtKJ7NYPr_DGmAY&iflsig=AOw8s4IAAAAAaNkyKA0PQWivxgZnRwIIHKhJywpYaVFG&gs_ssp=eJzj4tZP1zcsScktMEpPN2C0UjWoMDFPtDBJSzJPM0gyNTY0M7QyqEhLNkw2NUpJMrdMTkwyNjPzksrIL0nNUcgpTSnPTFcoS8xTSEpNLcnIL0vNAwC7SBk6&oq=Hotel+Ludwi&gs_lp=Egdnd3Mtd2l6IgtIb3RlbCBMdWR3aSoCCAAyFxAuGIAEGMcBGJgFGJkFGMsBGI4FGK8BMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMhEQLhiABBjHARiYBRjLARivATIIEAAYgAQYywEyFBAuGIAEGMcBGJgFGJkFGMsBGK8BMggQABiABBjLATIIEAAYgAQYywEyFBAuGIAEGMcBGJgFGJkFGMsBGK8BSPAbUABY2RJwAXgAkAEAmAF5oAHnB6oBBDEwLjK4AQPIAQD4AQGYAg2gAoAIwgIEECMYJ8ICChAjGIAEGCcYigXCAgsQLhiABBjRAxjHAcICBRAAGIAEwgIFEC4YgATCAggQLhiABBjUAsICFxAuGIAEGMcBGJgFGJkFGJ4FGI4FGK8BwgILEAAYgAQYkgMYigXCAggQABiABBjJA8ICFBAuGIAEGMcBGJgFGJkFGI4FGK8BwgIaEC4YgAQYxwEYmAUYmQUYywEYngUYjgUYrwHCAgsQABiABBjJAxjLAcICCBAuGIAEGMsBwgIKEAAYgAQYChjLAZgDAJIHBDExLjKgB8jKAbIHBDEwLjK4B_4HwgcGMS4xMS4xyAcR&sclient=gws-wiz"
            target="_blank"
            rel="noopener"
            class="social-link-card"
          >
            <div class="social-icon">
              <svg
                version="1.1"
                id="fi_104093"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24"
                height="24"
                x="0px"
                y="0px"
                viewBox="0 0 210 210"
                style="enable-background:new 0 0 210 210;"
                xml:space="preserve"
              >
                <path
                  d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
	c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
	S0,162.897,0,105z"
                ></path>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
                <g> </g>
              </svg>
            </div>
            <h3>Google</h3>
            <p>Gästebewertungen & Bewertungen</p>
          </a>
          <a
            href="https://www.tripadvisor.com/Hotel_Review-g187323-d231108-Reviews-Hotel_Ludwig_Van_Beethoven-Berlin.html"
            target="_blank"
            rel="noopener"
            class="social-link-card"
          >
            <div class="social-icon">
              <svg
                height="24"
                viewBox="0 -70 490.66667 490"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                id="fi_1241014"
                ><path
                  d="m362.667969 259.535156c-35.347657 0-64-28.65625-64-64 0-35.347656 28.652343-64 64-64 35.34375 0 64 28.652344 64 64-.074219 35.3125-28.683594 63.925782-64 64zm0-106.667968c-23.566407 0-42.667969 19.101562-42.667969 42.667968 0 23.5625 19.101562 42.664063 42.667969 42.664063 23.5625 0 42.664062-19.101563 42.664062-42.664063 0-23.566406-19.101562-42.667968-42.664062-42.667968zm0 0"
                ></path><path
                  d="m362.667969 323.535156c-70.695313 0-128-57.308594-128-128 0-70.695312 57.304687-128 128-128 70.691406 0 128 57.304688 128 128-.074219 70.660156-57.339844 127.925782-128 128zm0-234.667968c-58.910157 0-106.667969 47.753906-106.667969 106.667968 0 58.910156 47.757812 106.664063 106.667969 106.664063 58.910156 0 106.664062-47.753907 106.664062-106.664063-.070312-58.882812-47.785156-106.59375-106.664062-106.667968zm0 0"
                ></path><path
                  d="m373.332031 184.867188h-21.332031v21.332031h21.332031zm0 0"
                ></path><path
                  d="m128 259.535156c-35.347656 0-64-28.65625-64-64 0-35.347656 28.652344-64 64-64s64 28.652344 64 64c-.074219 35.3125-28.683594 63.925782-64 64zm0-106.667968c-23.5625 0-42.667969 19.101562-42.667969 42.667968 0 23.5625 19.105469 42.664063 42.667969 42.664063s42.667969-19.101563 42.667969-42.664063c0-23.566406-19.105469-42.667968-42.667969-42.667968zm0 0"
                ></path><path
                  d="m128 323.535156c-70.691406 0-128-57.308594-128-128 0-70.695312 57.308594-128 128-128s128 57.304688 128 128c-.074219 70.660156-57.339844 127.925782-128 128zm0-234.667968c-58.910156 0-106.667969 47.753906-106.667969 106.667968 0 58.910156 47.757813 106.664063 106.667969 106.664063s106.667969-47.753907 106.667969-106.664063c-.074219-58.882812-47.789063-106.59375-106.667969-106.667968zm0 0"
                ></path><path
                  d="m138.667969 184.867188h-21.335938v21.332031h21.335938zm0 0"
                ></path><path
                  d="m245.332031 351.265625-48.53125-60.664063 16.664063-13.335937 31.867187 39.867187 31.867188-39.867187 16.667969 13.335937zm0 0"
                ></path><path
                  d="m447.867188 101.667969-20-7.46875 24.933593-66.132813-114.800781 20.535156-3.734375-20.933593 151.601563-27.335938zm0 0"
                ></path><path
                  d="m42.800781 101.667969-38-101.335938 151.597657 27.335938-3.730469 20.933593-114.800781-20.535156 24.933593 66.132813zm0 0"
                ></path><path
                  d="m490.667969 195.535156h-21.335938c0-88.269531-100.53125-160-224-160-123.464843 0-224 71.730469-224 160h-21.332031c0-100 110-181.335937 245.332031-181.335937 135.335938 0 245.335938 81.335937 245.335938 181.335937zm0 0"
                ></path></svg
              >
            </div>
            <h3>TripAdvisor</h3>
            <p>Gästebewertungen & Bewertungen</p>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Engagement Section -->
  <section class="social-engagement">
    <div class="container">
      <div class="engagement-content">
        <h2 class="heading-accent-center">Teilen Sie Ihre Erfahrung</h2>
        <p>
          Hat Ihnen Ihr Aufenthalt im Hotel Ludwig van Beethoven gefallen? Wir würden gerne
          Ihre Fotos sehen und von Ihren Berlin-Abenteuern hören!
        </p>
        <div class="engagement-actions">
          <a href="/reviews" class="engagement-btn primary"> Bewertung schreiben </a>
          <span class="engagement-hashtag">#HotelLudwigVanBeethoven</span>
        </div>
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
        title="aadvanto login form"
      >
      </iframe>
    </div>
  </section>
</div>

<style>
  .social-page {
    background: var(--color-background);
  }

  /* Hero Section */
  .social-hero {
    background: var(--color-background);
    padding: var(--section-padding-y) 0;
    text-align: center;
  }

  .hero-content {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--section-padding-x);
  }

  .hero-content h1 {
    color: var(--color-text);
    margin-bottom: var(--space-xl);
  }

  .hero-subtitle {
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto;
  }

  /* Introduction Section */
  .social-intro {
    padding: var(--section-padding-y) 0;
    background: var(--color-background);
  }

  .social-intro .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--section-padding-x);
  }

  .intro-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
    align-items: center;
    text-align: center;
  }

  .intro-text h2 {
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }

  .intro-text p {
    color: var(--color-text-light);
    margin-bottom: var(--space-lg);
  }

  .social-links-grid {
    display: flex;
    justify-content: center;
    gap: var(--space-2xl);
    width: 100%;
    max-width: 800px;
  }

  .social-link-card {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
    text-decoration: none;
    transition: transform var(--transition-fast);
    text-align: center;
    flex: 1;
    max-width: 300px;
  }

  .social-link-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.12);
  }

  .social-icon {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-md);
  }

  .social-link-card h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-sm);
  }

  .social-link-card p {
    color: var(--color-text-light);
    font-size: var(--font-size-sm);
    margin: 0;
  }

  /* Social Feed Section */
  .social-feed-section {
    padding: var(--section-padding-y) 0;
    background: var(--color-background-elevated);
  }

  .social-feed-section .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--section-padding-x);
  }

  .feed-header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .feed-header h2 {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .feed-header p {
    color: var(--color-text-light);
  }

  /* Engagement Section */
  .social-engagement {
    padding: var(--section-padding-y) 0;
    background: var(--color-background-elevated);
  }

  .social-engagement .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--section-padding-x);
  }

  .engagement-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .engagement-content h2 {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .engagement-content p {
    color: var(--color-text-light);
    margin-bottom: var(--space-3xl);
  }

  .engagement-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);
    flex-wrap: wrap;
  }

  .engagement-btn {
    background: var(--color-secondary);
    color: white;
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
    transition: background-color var(--transition-fast);
  }

  .engagement-btn:hover {
    background: var(--color-accent);
  }

  .engagement-hashtag {
    font-family: var(--font-mono);
    font-size: var(--font-size-lg);
    color: var(--color-secondary);
    font-weight: var(--font-weight-semibold);
    background: rgba(26, 74, 107, 0.1);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(26, 74, 107, 0.2);
  }

  .widget-container {
    background: var(--color-background);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    min-height: 600px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
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
    border-radius: var(--radius-xl) !important;
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08) !important;
    transition: all var(--transition-fast) !important;
    overflow: hidden !important;
  }

  .theme-carousel :global(.ubw-social-post-item:hover) {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 24px rgba(90, 78, 71, 0.12) !important;
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
    padding: var(--space-lg) var(--space-lg) var(--space-sm) !important;
    font-size: var(--font-size-xl) !important;
    font-family: var(--font-display) !important;
    font-weight: var(--font-weight-semibold) !important;
  }

  .theme-carousel :global(.ubw-social-post-item-title-container a) {
    color: var(--color-text) !important;
    text-decoration: none !important;
    display: block !important;
    line-height: var(--line-height-tight) !important;
    transition: color var(--transition-fast) !important;
  }

  .theme-carousel :global(.ubw-social-post-item-title-container a:hover) {
    color: var(--color-secondary) !important;
  }

  .theme-carousel :global(.ubw-social-post-item-description) {
    padding: 0 var(--space-lg) !important;
    flex-grow: 1 !important;
    font-size: var(--font-size-base) !important;
    line-height: var(--line-height-relaxed) !important;
    color: var(--color-text-light) !important;
    overflow: hidden !important;
  }

  .theme-carousel :global(.ubw-social-post-item-button) {
    margin: var(--space-lg) !important;
    margin-top: auto !important;
    background: var(--color-secondary) !important;
    color: var(--color-text-inverse) !important;
    border: none !important;
    padding: var(--space-sm) var(--space-lg) !important;
    border-radius: var(--radius-lg) !important;
    font-size: var(--font-size-sm) !important;
    font-weight: var(--font-weight-semibold) !important;
    cursor: pointer !important;
    transition: all var(--transition-fast) !important;
    align-self: stretch !important;
  }

  .theme-carousel :global(.ubw-social-post-item-button:hover) {
    background: var(--color-secondary-light) !important;
    transform: translateY(-1px) !important;
  }

  /* Carousel Navigation */
  .carousel-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    margin: var(--space-xl) auto 0;
    background: var(--color-background-elevated);
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-full);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
    z-index: 100 !important;
    pointer-events: auto !important;
    width: fit-content;
  }

  .carousel-btn {
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: var(--color-secondary);
    color: var(--color-text-inverse);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    user-select: none;
    line-height: 1;
  }

  .carousel-btn:hover:not(:disabled) {
    background: var(--color-secondary-light);
    transform: scale(1.05);
  }

  .carousel-btn:disabled {
    background: var(--color-border-light);
    color: var(--color-text-light);
    cursor: not-allowed;
    transform: scale(0.95);
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
    background: var(--color-border);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .carousel-indicator.active {
    background: var(--color-secondary);
    transform: scale(1.2);
  }

  .carousel-indicator:hover {
    background: var(--color-secondary-light);
  }

  /* Position carousel nav above widget content */
  .theme-carousel {
    position: relative;
  }

  .widget-container {
    position: relative !important;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .social-links-grid {
      gap: var(--space-xl);
    }
  }

  @media (max-width: 768px) {
    .social-hero,
    .social-intro,
    .social-feed-section,
    .social-engagement {
      padding: var(--space-3xl) 0;
    }

    .hero-content,
    .social-intro .container,
    .social-feed-section .container,
    .social-engagement .container {
      padding: 0 var(--space-md);
    }

    .social-links-grid {
      flex-direction: column;
      gap: var(--space-lg);
      align-items: center;
    }

    .social-link-card {
      max-width: 400px;
      width: 100%;
    }

    .widget-container {
      padding: var(--space-lg);
      min-height: 400px;
    }

    .engagement-actions {
      flex-direction: column;
      gap: var(--space-lg);
    }

    .carousel-nav {
      padding: var(--space-sm) var(--space-lg);
      gap: var(--space-sm);
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
      font-size: var(--font-size-base);
    }
  }
</style>
