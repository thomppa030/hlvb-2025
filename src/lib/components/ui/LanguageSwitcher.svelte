<!-- src/lib/components/ui/LanguageSwitcher.svelte -->
<script>
  import { currentLanguage, languages, switchLanguage } from '$lib/stores/i18n.js';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let showDropdown = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    currentLanguage.init();
  });
  
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
  
  async function selectLanguage(langCode) {
    await switchLanguage(langCode, $page.url.pathname);
    showDropdown = false;
  }
  
  function handleClickOutside(event) {
    if (!event.target.closest('.language-switcher')) {
      showDropdown = false;
    }
  }
  
  // Get flag for current language
  $: currentLang = languages.find(lang => lang.code === $currentLanguage);
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-switcher">
  <button 
    class="language-button" 
    on:click={toggleDropdown}
    aria-label="Switch language"
    title="Switch language"
  >
    {#if mounted && currentLang}
      <div class="flag-circle" class:de={currentLang.code === 'de'} class:en={currentLang.code === 'en'}>
        {#if currentLang.code === 'de'}
          <!-- German flag colors -->
          <div class="flag-stripes">
            <div class="stripe black"></div>
            <div class="stripe red"></div>
            <div class="stripe yellow"></div>
          </div>
        {:else}
          <!-- British flag -->
          <div class="union-jack">
            <div class="blue-bg"></div>
            <div class="white-cross-v"></div>
            <div class="white-cross-h"></div>
            <div class="red-cross-v"></div>
            <div class="red-cross-h"></div>
            <div class="diagonal-red-1"></div>
            <div class="diagonal-red-2"></div>
          </div>
        {/if}
      </div>
    {/if}
  </button>
  
  {#if showDropdown}
    <div class="language-dropdown">
      {#each languages as lang}
        <button
          class="language-option"
          class:active={lang.code === $currentLanguage}
          on:click={() => selectLanguage(lang.code)}
        >
          <div class="flag-circle small" class:de={lang.code === 'de'} class:en={lang.code === 'en'}>
            {#if lang.code === 'de'}
              <div class="flag-stripes">
                <div class="stripe black"></div>
                <div class="stripe red"></div>
                <div class="stripe yellow"></div>
              </div>
            {:else}
              <div class="union-jack">
                <div class="blue-bg"></div>
                <div class="white-cross-v"></div>
                <div class="white-cross-h"></div>
                <div class="red-cross-v"></div>
                <div class="red-cross-h"></div>
                <div class="diagonal-red-1"></div>
                <div class="diagonal-red-2"></div>
              </div>
            {/if}
          </div>
          <span class="language-name">{lang.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-switcher {
    position: relative;
    display: inline-block;
  }

  .language-button {
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-full);
    padding: var(--space-xs);
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .language-button:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  .language-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.08);
  }

  .flag-circle {
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .flag-circle.small {
    width: 20px;
    height: 20px;
  }

  /* German flag */
  .flag-stripes {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .stripe {
    flex: 1;
    width: 100%;
  }

  .stripe.black {
    background-color: #000000;
  }

  .stripe.red {
    background-color: #DD0000;
  }

  .stripe.yellow {
    background-color: #FFCE00;
  }

  /* British flag */
  .union-jack {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .blue-bg {
    width: 100%;
    height: 100%;
    background-color: #012169;
  }

  .white-cross-v, .white-cross-h {
    position: absolute;
    background-color: #FFFFFF;
  }

  .white-cross-v {
    width: 40%;
    height: 100%;
    left: 30%;
    top: 0;
  }

  .white-cross-h {
    width: 100%;
    height: 40%;
    left: 0;
    top: 30%;
  }

  .red-cross-v, .red-cross-h {
    position: absolute;
    background-color: #C8102E;
  }

  .red-cross-v {
    width: 20%;
    height: 100%;
    left: 40%;
    top: 0;
  }

  .red-cross-h {
    width: 100%;
    height: 20%;
    left: 0;
    top: 40%;
  }

  .diagonal-red-1, .diagonal-red-2 {
    position: absolute;
    background-color: #C8102E;
    width: 141%;
    height: 10%;
    transform-origin: center;
  }

  .diagonal-red-1 {
    top: 20%;
    left: -20%;
    transform: rotate(45deg);
  }

  .diagonal-red-2 {
    top: 20%;
    left: -20%;
    transform: rotate(-45deg);
  }

  .language-dropdown {
    position: absolute;
    top: calc(100% + var(--space-xs));
    right: 0;
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 120px;
    overflow: hidden;
  }

  .language-option {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    background: none;
    border: none;
    cursor: pointer;
    transition: background-color var(--transition-fast);
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }

  .language-option:hover {
    background-color: var(--color-background-alt);
  }

  .language-option.active {
    background-color: var(--color-secondary);
    color: white;
  }

  .language-name {
    font-weight: var(--font-weight-medium);
  }

  /* Dark mode adjustments */
  :global([data-theme="dark"]) .language-button {
    border-color: rgba(255, 255, 255, 0.08);
  }

  :global([data-theme="dark"]) .language-button:hover {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme="dark"]) .language-button:focus {
    box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.15);
  }

  :global([data-theme="dark"]) .language-dropdown {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  :global([data-theme="dark"]) .language-option:hover {
    background-color: var(--color-background);
  }

  :global([data-theme="dark"]) .flag-circle {
    border-color: rgba(255, 255, 255, 0.1);
  }
</style>