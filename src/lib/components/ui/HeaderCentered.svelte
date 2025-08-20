<!-- src/lib/components/ui/HeaderCentered.svelte -->
<script>
  import { page } from "$app/stores";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import { t } from "$lib/stores/i18n.js";

  // Check if current route is active - reactive to page changes
  $: isActive = (route) => {
    const currentPath = $page.url.pathname;
    if (route === "/" && currentPath === "/") return true;
    if (route !== "/" && currentPath.startsWith(route)) return true;
    return false;
  };
</script>

<header class="header-centered">
  <div class="container">
    <nav class="nav">
      <!-- Centered navigation group -->
      <div class="nav-group">
        <!-- Left side links -->
        <div class="nav-side nav-left">
          <a href="/" class="nav-link" class:active={isActive("/")}>
            {$t('nav.home')}
          </a>
          <a href="/reviews" class="nav-link" class:active={isActive("/reviews")}>
            {$t('nav.reviews')}
          </a>
        </div>

        <!-- Centered Logo -->
        <a href="/" class="brand" class:active={isActive("/")}>
          <picture>
            <source 
              media="(max-width: 480px)" 
              srcset="/logo-mobile-opt.webp"
              type="image/webp"
            />
            <source 
              media="(max-width: 768px)" 
              srcset="/logo-mobile.webp"
              type="image/webp"
            />
            <img 
              src="/cropped-Logo-Taupe.webp" 
              alt="Hotel Ludwig van Beethoven" 
              class="brand-logo" 
              width="180" 
              height="100"
              loading="eager" 
              decoding="sync" 
            />
          </picture>
        </a>

        <!-- Right side links -->
        <div class="nav-side nav-right">
          <a href="/social" class="nav-link" class:active={isActive("/social")}>
            Social
          </a>
        </div>
      </div>

      <!-- Right side actions (further away) -->
      <div class="nav-actions">
        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </nav>
  </div>
</header>

<style>
  .header-centered {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transition: all var(--transition-normal);
    height: 110px;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
    height: 100%;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
  }

  .nav-group {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--space-lg);
    width: 100%;
    max-width: 800px;
  }

  .nav-side {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .nav-left {
    justify-content: flex-end;
  }

  .nav-right {
    justify-content: flex-start;
  }

  .nav-actions {
    position: absolute;
    right: var(--space-lg);
    display: flex;
    align-items: center;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-self: center;
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xl);
    transition: all var(--transition-fast);
  }

  .brand-logo {
    height: 90px;
    width: auto;
    object-fit: contain;
    transition: transform var(--transition-fast);
  }

  .brand:hover .brand-logo {
    transform: scale(1.05);
  }

  .nav-link {
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    position: relative;
    white-space: nowrap;
  }

  .nav-link:hover {
    color: var(--color-secondary);
    background-color: var(--color-background-alt);
  }

  .nav-link.active {
    color: var(--color-secondary);
    background-color: var(--color-background-alt);
  }

  .nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: var(--space-md);
    right: var(--space-md);
    height: 2px;
    background-color: var(--color-secondary);
    border-radius: var(--radius-sm);
  }

  /* Tablet responsive */
  @media (max-width: 1024px) {
    .header-centered {
      height: 90px;
    }

    .nav-group {
      gap: var(--space-lg);
    }

    .brand {
      margin: 0 var(--space-md);
    }

    .brand-logo {
      height: 70px;
    }

    .nav-actions {
      right: var(--space-md);
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .header-centered {
      height: 80px;
    }

    .brand-logo {
      height: 60px;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .nav-group {
      gap: var(--space-md);
      margin-right: 80px; /* Make room for actions */
    }

    .nav-link {
      display: none; /* Hide nav links on mobile */
    }

    .brand {
      margin: 0;
    }

    .nav-actions {
      right: var(--space-sm);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .brand-logo {
      height: 50px;
    }
  }
</style>