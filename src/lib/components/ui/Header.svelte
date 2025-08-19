<!-- src/lib/components/ui/Header.svelte -->
<script>
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import { t } from "$lib/stores/i18n.js";

  let theme = "light";
  let mounted = false;

  onMount(() => {
    mounted = true;
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      theme = savedTheme;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    updateTheme();
  });

  function updateTheme() {
    if (!browser) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    updateTheme();
  }

  // Check if current route is active - reactive to page changes
  $: isActive = (route) => {
    const currentPath = $page.url.pathname;
    if (route === "/" && currentPath === "/") return true;
    if (route !== "/" && currentPath.startsWith(route)) return true;
    return false;
  };

  function handleBooking() {
    window.open("https://onepagebooking.com/beethoven", "_blank");
  }
</script>

<header class="header">
  <div class="container">
    <nav class="nav">
      <!-- Logo/Brand -->
      <a href="/" class="brand" class:active={isActive("/")}>
        <img src="/cropped-Logo-Taupe.webp" alt="Hotel Ludwig van Beethoven" class="brand-logo" />
      </a>

      <!-- Navigation Links -->
      <div class="nav-links">
        <a href="/" class="nav-link" class:active={isActive("/")}> 
          {$t('nav.home')}
        </a>
        <a href="/reviews" class="nav-link" class:active={isActive("/reviews")}>
          {$t('nav.reviews')}
        </a>
        <a href="/test" class="nav-link" class:active={isActive("/test")}>
          {$t('nav.style')}
        </a>
      </div>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Book Now Button -->
        <Button
          variant="accent"
          size="medium"
          on:click={handleBooking}
          class="book-cta"
        >
          {$t('nav.book_now')}
        </Button>

        <!-- Language Switcher -->
        <LanguageSwitcher />

        <!-- Theme Toggle -->
        <button
          class="theme-toggle"
          on:click={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {#if mounted}
            {#if theme === "light"}
              <!-- Moon icon for dark mode -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            {:else}
              <!-- Sun icon for light mode -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="m12 2 0 2"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m12 20 0 2"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m4.93 4.93 1.41 1.41"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m17.66 17.66 1.41 1.41"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m2 12 2 0"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m20 12 2 0"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m6.34 17.66-1.41 1.41"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="m19.07 4.93-1.41 1.41"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            {/if}
          {/if}
        </button>
      </div>
    </nav>
  </div>
</header>

<style>
  .header {
    background-color: #f6f4f3;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(20px);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    gap: var(--space-lg);
    padding: var(--space-md) 0;
  }

  .brand {
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: opacity var(--transition-fast);
  }

  .brand:hover {
    opacity: 0.8;
  }

  .brand-logo {
    height: 90px;
    width: auto;
    display: block;
    transition: filter var(--transition-fast);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
    flex: 1;
    justify-content: center;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  /* Make the booking CTA more prominent */
  :global(.book-cta) {
    font-weight: var(--font-weight-bold) !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    color: var(--color-text) !important; /* Dark text for all modes since header stays light */
  }

  /* Force dark text on booking CTA in header regardless of theme */
  .header :global(.book-cta) {
    color: #5a4e47 !important;
  }
  
  .header :global(.book-cta):hover {
    color: #5a4e47 !important;
  }

  :global(.book-cta):before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  :global(.book-cta):hover:before {
    left: 100%;
  }

  .nav-link {
    text-decoration: none;
    color: var(--color-text-light);
    font-family: var(--font-primary); /* Montserrat */
    font-size: var(--font-size-base);
    font-weight: var(
      --font-weight-medium
    ); /* Medium weight as per brand guidelines */
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    position: relative;
  }

  .nav-link:hover {
    color: var(--color-text);
    background-color: rgba(0, 0, 0, 0.04);
  }

  .nav-link.active {
    color: var(--color-secondary);
    background-color: rgba(26, 74, 107, 0.1);
    font-weight: var(--font-weight-semibold);
  }

  .theme-toggle {
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-lg);
    padding: var(--space-sm);
    cursor: pointer;
    color: var(--color-text-light);
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .theme-toggle:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.12);
    color: var(--color-text);
  }

  .theme-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.08);
  }

  /* Header stays light in dark mode to preserve logo visibility and design consistency */

  /* Mobile responsive */
  @media (max-width: 768px) {
    .nav {
      height: 80px;
      gap: var(--space-md);
      padding: var(--space-sm) 0;
    }

    .brand-logo {
      height: 60px;
    }

    .nav-links {
      gap: var(--space-md);
    }

    .nav-link {
      font-size: var(--font-size-sm);
      padding: var(--space-xs) var(--space-sm);
    }

    .theme-toggle {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-md);
    }

    .nav-links {
      gap: var(--space-sm);
    }
  }
</style>

