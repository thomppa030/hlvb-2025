<!-- src/routes/test/+page.svelte -->
<script>
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import ImageCarousel from "$lib/components/ui/ImageCarousel.svelte";

  let theme = "light";
  let currentSection = "typography";

  const sections = [
    { id: "typography", label: "Typography" },
    { id: "colors", label: "Colors" },
    { id: "spacing", label: "Spacing" },
    { id: "components", label: "Components" },
    { id: "carousel", label: "Carousel" },
    { id: "layout", label: "Layout" },
    { id: "forms", label: "Forms" },
    { id: "responsiveness", label: "Responsive" },
  ];

  const colorPalette = [
    { name: "Primary", var: "--color-primary" },
    { name: "Primary Light", var: "--color-primary-light" },
    { name: "Secondary", var: "--color-secondary" },
    { name: "Secondary Light", var: "--color-secondary-light" },
    { name: "Accent", var: "--color-accent" },
    { name: "Background", var: "--color-background" },
    { name: "Background Alt", var: "--color-background-alt" },
    { name: "Text", var: "--color-text" },
    { name: "Text Light", var: "--color-text-light" },
    { name: "Border", var: "--color-border" },
  ];

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }

  function scrollToSection(sectionId) {
    currentSection = sectionId;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  // Sample images for carousel
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      alt: "Luxury hotel exterior view",
      caption: "Elegant hotel facade in the heart of the city"
    },
    {
      src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      alt: "Hotel lobby interior",
      caption: "Spacious lobby with modern design"
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      alt: "Luxury hotel room",
      caption: "Comfortable rooms with premium amenities"
    },
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      alt: "Hotel restaurant",
      caption: "Fine dining experience in our restaurant"
    },
    {
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      alt: "Hotel spa and wellness",
      caption: "Relaxing spa and wellness facilities"
    }
  ];
</script>

<svelte:head>
  <title>Design System Test Page</title>
  <meta name="description" content="Testing the hotel homepage design system" />
</svelte:head>

<div class="test-page">
  <!-- Navigation -->
  <nav class="test-nav">
    <div class="container">
      <h1 class="test-title">Design System Test</h1>
      <div class="nav-controls">
        <div class="nav-sections">
          {#each sections as section}
            <button
              class="nav-link"
              class:active={currentSection === section.id}
              on:click={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          {/each}
        </div>
        <button class="theme-toggle" on:click={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  </nav>

  <!-- Typography Section -->
  <section id="typography" class="test-section">
    <div class="container">
      <h2 class="section-title">Typography</h2>

      <div class="typography-showcase">
        <div class="heading-samples">
          <h1>Heading 1 - Display Font</h1>
          <h2>Heading 2 - Display Font</h2>
          <h3>Heading 3 - Display Font</h3>
          <h4>Heading 4 - Display Font</h4>
          <h5>Heading 5 - Display Font</h5>
          <h6>Heading 6 - Display Font</h6>
        </div>

        <div class="text-samples">
          <p class="large-text">
            Large paragraph text using the primary font family. This
            demonstrates readability and spacing.
          </p>
          <p>
            Regular paragraph text with proper line height and letter spacing
            for optimal reading experience.
          </p>
          <p class="small-text">
            Small text for captions, labels, and secondary information.
          </p>
          <p class="link-text">
            This is a <a href="#test">sample link</a> to test link styling and hover
            states.
          </p>
          <div id="test"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Colors Section -->
  <section id="colors" class="test-section">
    <div class="container">
      <h2 class="section-title">Color Palette</h2>

      <div class="color-grid">
        {#each colorPalette as color}
          <div class="color-swatch">
            <div
              class="color-preview"
              style="background-color: var({color.var})"
            ></div>
            <div class="color-info">
              <span class="color-name">{color.name}</span>
              <span class="color-variable">{color.var}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Spacing Section -->
  <section id="spacing" class="test-section">
    <div class="container">
      <h2 class="section-title">Spacing System</h2>

      <div class="spacing-showcase">
        {#each ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as size}
          <div class="spacing-item">
            <div class="spacing-label">--space-{size}</div>
            <div
              class="spacing-visual"
              style="width: var(--space-{size}); height: var(--space-{size})"
            ></div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Components Section -->
  <section id="components" class="test-section">
    <div class="container">
      <h2 class="section-title">UI Components</h2>

      <div class="components-showcase">
        <div class="component-group">
          <h3>Buttons</h3>
          <div class="button-grid">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button size="small">Small Button</Button>
            <Button size="large">Large Button</Button>
          </div>
        </div>

        <div class="component-group">
          <h3>Cards</h3>
          <div class="card-grid">
            <Card>
              <h4 slot="title">Basic Card</h4>
              <p>
                This is a basic card component with default styling and proper
                spacing.
              </p>
            </Card>

            <Card variant="elevated">
              <h4 slot="title">Elevated Card</h4>
              <p>
                This card has elevated styling with shadow and enhanced visual
                hierarchy.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Carousel Section -->
  <section id="carousel" class="test-section">
    <div class="container">
      <h2 class="section-title">Image Carousel</h2>

      <div class="carousel-showcase">
        <div class="carousel-demo">
          <h3>Standard Carousel with Preview Thumbnails</h3>
          <ImageCarousel 
            images={carouselImages} 
            showThumbnails={true}
            showIndicators={true}
            showNavigation={true}
            aspectRatio="16/9"
          />
        </div>

        <div class="carousel-options">
          <h3>Carousel Variants</h3>
          
          <div class="carousel-variant">
            <h4>Auto-playing Carousel</h4>
            <ImageCarousel 
              images={carouselImages.slice(0, 3)} 
              autoplay={true}
              autoplayInterval={3000}
              aspectRatio="21/9"
            />
          </div>

          <div class="carousel-variant">
            <h4>Minimal Carousel (No Thumbnails)</h4>
            <ImageCarousel 
              images={carouselImages.slice(0, 4)} 
              showThumbnails={false}
              showIndicators={true}
              aspectRatio="4/3"
            />
          </div>

          <div class="carousel-variant">
            <h4>Single Image (No Navigation)</h4>
            <ImageCarousel 
              images={[carouselImages[0]]} 
              aspectRatio="3/2"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Layout Section -->
  <section id="layout" class="test-section">
    <div class="container">
      <h2 class="section-title">Layout System</h2>

      <div class="layout-showcase">
        <div class="grid-demo">
          <h3>Grid System</h3>
          <div class="test-grid">
            <div class="grid-item">Grid Item 1</div>
            <div class="grid-item">Grid Item 2</div>
            <div class="grid-item">Grid Item 3</div>
            <div class="grid-item">Grid Item 4</div>
          </div>
        </div>

        <div class="flex-demo">
          <h3>Flexbox Layout</h3>
          <div class="test-flex">
            <div class="flex-item">Flex Item 1</div>
            <div class="flex-item">Flex Item 2</div>
            <div class="flex-item">Flex Item 3</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Forms Section -->
  <section id="forms" class="test-section">
    <div class="container">
      <h2 class="section-title">Form Elements</h2>

      <div class="form-showcase">
        <form class="test-form">
          <div class="form-group">
            <label for="text-input">Text Input</label>
            <input type="text" id="text-input" placeholder="Enter text here" />
          </div>

          <div class="form-group">
            <label for="email-input">Email Input</label>
            <input type="email" id="email-input" placeholder="Enter email" />
          </div>

          <div class="form-group">
            <label for="textarea">Textarea</label>
            <textarea id="textarea" rows="4" placeholder="Enter message"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="select">Select Dropdown</label>
            <select id="select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <Button type="submit">Submit Form</Button>
        </form>
      </div>
    </div>
  </section>

  <!-- Responsive Section -->
  <section id="responsiveness" class="test-section">
    <div class="container">
      <h2 class="section-title">Responsive Design</h2>

      <div class="responsive-showcase">
        <div class="breakpoint-info">
          <p>Resize your browser window to test responsive behavior.</p>
          <div class="breakpoint-indicators">
            <div class="breakpoint mobile">Mobile: &lt; 640px</div>
            <div class="breakpoint tablet">Tablet: 640px - 1024px</div>
            <div class="breakpoint desktop">Desktop: &gt; 1024px</div>
          </div>
        </div>

        <div class="responsive-grid">
          <div class="responsive-item">Responsive Item 1</div>
          <div class="responsive-item">Responsive Item 2</div>
          <div class="responsive-item">Responsive Item 3</div>
          <div class="responsive-item">Responsive Item 4</div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .test-page {
    min-height: 100vh;
    background-color: var(--color-background);
  }

  .test-nav {
    position: sticky;
    top: 80px; /* Position below the main header */
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-border);
    z-index: 89; /* Lower z-index than main header (100) */
    padding: var(--space-md) 0;
  }

  .test-nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-lg);
  }

  .test-title {
    font-size: var(--font-size-2xl);
    color: var(--color-text);
    margin: 0;
  }

  .nav-controls {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .nav-sections {
    display: flex;
    gap: var(--space-sm);
  }

  .nav-link {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    color: var(--color-text-light);
    transition: all var(--transition-fast);
  }

  .nav-link:hover,
  .nav-link.active {
    background-color: var(--color-secondary);
    color: white;
  }

  .theme-toggle {
    padding: var(--space-sm) var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
  }

  .theme-toggle:hover {
    background-color: var(--color-primary-light);
  }


  .test-section {
    padding: var(--space-4xl) 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .section-title {
    margin-bottom: var(--space-2xl);
    color: var(--color-text);
  }

  /* Typography Styles */
  .typography-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
  }

  .heading-samples h1,
  .heading-samples h2,
  .heading-samples h3,
  .heading-samples h4,
  .heading-samples h5,
  .heading-samples h6 {
    margin-bottom: var(--space-lg);
  }

  .text-samples p {
    margin-bottom: var(--space-lg);
  }

  .large-text {
    font-size: var(--font-size-lg);
  }

  .small-text {
    font-size: var(--font-size-sm);
  }

  /* Color Styles */
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-lg);
  }

  .color-swatch {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .color-preview {
    height: 80px;
    width: 100%;
  }

  .color-info {
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .color-name {
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }

  .color-variable {
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
  }

  /* Spacing Styles */
  .spacing-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-lg);
  }

  .spacing-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  .spacing-label {
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
  }

  .spacing-visual {
    background-color: var(--color-secondary);
    border-radius: var(--radius-sm);
  }

  /* Component Styles */
  .components-showcase {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
  }

  .component-group h3 {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .button-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-lg);
  }

  /* Carousel Styles */
  .carousel-showcase {
    display: flex;
    flex-direction: column;
    gap: var(--space-4xl);
  }

  .carousel-demo {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .carousel-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  .carousel-variant {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .carousel-variant h4 {
    margin: 0;
    color: var(--color-text-light);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
  }

  /* Layout Styles */
  .layout-showcase {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
  }

  .test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
  }

  .grid-item,
  .flex-item {
    background-color: var(--color-background-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    text-align: center;
    color: var(--color-text);
  }

  .test-flex {
    display: flex;
    gap: var(--space-md);
    justify-content: space-between;
  }

  .flex-item {
    flex: 1;
  }

  /* Form Styles */
  .test-form {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .form-group label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }

  /* Responsive Styles */
  .responsive-showcase {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
  }

  .breakpoint-indicators {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-lg);
  }

  .breakpoint {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .mobile {
    background-color: #ef4444;
    color: white;
  }

  .tablet {
    background-color: #f59e0b;
    color: white;
  }

  .desktop {
    background-color: #10b981;
    color: white;
  }

  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
  }

  .responsive-item {
    background-color: var(--color-accent);
    color: var(--color-text-inverse);
    padding: var(--space-lg);
    border-radius: var(--radius-md);
    text-align: center;
    font-weight: var(--font-weight-medium);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .test-nav {
      top: 70px; /* Position below mobile header height */
    }
    
    .test-nav .container {
      flex-direction: column;
      gap: var(--space-md);
    }

    .nav-sections {
      flex-wrap: wrap;
      justify-content: center;
    }

    .typography-showcase {
      grid-template-columns: 1fr;
    }

    .color-grid {
      grid-template-columns: 1fr;
    }

    .spacing-showcase {
      grid-template-columns: repeat(2, 1fr);
    }

    .test-flex {
      flex-direction: column;
    }

    .breakpoint-indicators {
      flex-direction: column;
    }
  }
</style>
