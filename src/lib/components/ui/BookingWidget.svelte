<!-- src/lib/components/ui/BookingWidget.svelte -->
<script>
  import Button from "./Button.svelte";
  import { t, currentLanguage } from '$lib/stores/i18n.js';

  // Hotel ID for OnePageBooking
  export let hotelId = "beethoven";

  // Widget type: 'simple' (just book button) or 'form' (with date/guest selection)
  export let type = "simple";

  // State for form widget
  let arrival = "";
  let departure = "";
  let adults = 1;
  let rooms = 1;
  let children = 0;

  // Get today's date in YYYY-MM-DD format
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Get tomorrow's date in YYYY-MM-DD format
  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  // Format date for OnePageBooking (DD.MM.YYYY)
  function formatDateForBooking(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
  }

  // Generate booking URL
  function getBookingUrl() {
    if (type === "simple") {
      // Simple button - no parameters (recommended approach)
      return `https://onepagebooking.com/${hotelId}`;
    }

    // Form widget - only pass parameters user actively selected
    const params = new URLSearchParams();

    if (arrival) {
      params.append("arrival", formatDateForBooking(arrival));
    }
    if (departure) {
      params.append("departure", formatDateForBooking(departure));
    }
    if (adults !== 1) {
      params.append("adults", adults.toString());
    }
    if (rooms !== 1) {
      params.append("rooms", rooms.toString());
    }
    if (children > 0) {
      params.append("children", children.toString());
    }

    params.append("lang", $currentLanguage === 'en' ? 'en' : 'de');

    const queryString = params.toString();
    return `https://onepagebooking.com/${hotelId}${queryString ? "?" + queryString : ""}`;
  }

  function handleBooking() {
    const url = getBookingUrl();
    window.open(url, "_blank");
  }

  // Initialize dates
  $: if (type === "form" && !arrival) {
    arrival = getTodayDate();
    departure = getTomorrowDate();
  }
</script>

{#if type === "simple"}
  <!-- Simple booking button (recommended) -->
  <div class="booking-widget booking-widget--simple">
    <h3>{$t('booking.title')}</h3>
    <p>{$t('booking.subtitle')}</p>
    <Button variant="primary" size="large" on:click={handleBooking}>
      {$t('booking.book_now')}
    </Button>
  </div>
{:else}
  <!-- Form widget with date/guest selection -->
  <div class="booking-widget booking-widget--form">
    <h3>{$t('booking.check_availability')}</h3>

    <form on:submit|preventDefault={handleBooking} class="booking-form">
      <!-- Date Selection Row -->
      <div class="form-row dates-row">
        <div class="form-group">
          <label for="arrival">{$t('booking.checkin')}</label>
          <input
            type="date"
            id="arrival"
            bind:value={arrival}
            min={getTodayDate()}
            required
          />
        </div>

        <div class="form-group">
          <label for="departure">{$t('booking.checkout')}</label>
          <input
            type="date"
            id="departure"
            bind:value={departure}
            min={arrival || getTodayDate()}
            required
          />
        </div>
      </div>

      <!-- Guest Selection Row -->
      <div class="form-row guests-row">
        <div class="form-group">
          <label for="adults">{$t('booking.adults')}</label>
          <select id="adults" bind:value={adults}>
            <option value={1}>{$currentLanguage === 'de' ? '1 Erwachsener' : '1 Adult'}</option>
            <option value={2}>{$currentLanguage === 'de' ? '2 Erwachsene' : '2 Adults'}</option>
            <option value={3}>{$currentLanguage === 'de' ? '3 Erwachsene' : '3 Adults'}</option>
            <option value={4}>{$currentLanguage === 'de' ? '4 Erwachsene' : '4 Adults'}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rooms">{$t('booking.rooms')}</label>
          <select id="rooms" bind:value={rooms}>
            <option value={1}>{$currentLanguage === 'de' ? '1 Zimmer' : '1 Room'}</option>
            <option value={2}>{$currentLanguage === 'de' ? '2 Zimmer' : '2 Rooms'}</option>
            <option value={3}>{$currentLanguage === 'de' ? '3 Zimmer' : '3 Rooms'}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="children">{$t('booking.children')}</label>
          <select id="children" bind:value={children}>
            <option value={0}>{$currentLanguage === 'de' ? 'Keine Kinder' : 'No Children'}</option>
            <option value={1}>{$currentLanguage === 'de' ? '1 Kind' : '1 Child'}</option>
            <option value={2}>{$currentLanguage === 'de' ? '2 Kinder' : '2 Children'}</option>
            <option value={3}>{$currentLanguage === 'de' ? '3 Kinder' : '3 Children'}</option>
          </select>
        </div>
      </div>

      <Button
        variant="secondary"
        size="large"
        type="submit"
        class="booking-submit"
      >
        {$t('booking.book_now')}
      </Button>
    </form>
  </div>
{/if}

<style>
  .booking-widget {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
    overflow: hidden;
  }

  .booking-widget h3 {
    color: var(--color-text);
    margin-bottom: var(--space-md);
    text-align: center;
  }

  .booking-widget--simple {
    text-align: center;
  }

  .booking-widget--simple p {
    color: var(--color-text-light);
    margin-bottom: var(--space-xl);
  }

  .booking-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .form-row {
    display: grid;
    gap: var(--space-lg);
    align-items: end;
    width: 100%;
    box-sizing: border-box;
  }

  .dates-row {
    grid-template-columns: 1fr 1fr;
  }

  .guests-row {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    min-width: 0; /* Allow flex items to shrink below content size */
  }

  .form-group label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .form-group:hover label {
    color: var(--color-secondary);
  }

  .form-group input,
  .form-group select {
    padding: var(--space-md) var(--space-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-background);
    color: var(--color-text);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-fast);
    min-height: 48px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  /* Fix select padding for native arrow */
  .form-group select {
    padding-right: var(--space-2xl);
  }

  .form-group input:hover,
  .form-group select:hover {
    border-color: var(--color-secondary);
    background-color: var(--color-background-elevated);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(26, 74, 107, 0.08);
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }

  :global(.booking-submit) {
    width: auto;
    min-width: 200px;
    max-width: 280px;
    margin: 0 auto;
    justify-self: center;
    background-color: var(--color-secondary) !important;
    color: var(--color-text-inverse) !important;
    border: none !important;
    padding: var(--space-md) var(--space-xl) !important;
    font-size: var(--font-size-lg) !important;
    font-weight: var(--font-weight-semibold) !important;
  }
  
  :global(.booking-submit:hover:not(:disabled)) {
    background-color: var(--color-secondary-light) !important;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  /* Ensure button text is white in dark mode */
  /* svelte-ignore unused-css-selector */
  :global([data-theme="dark"]) .booking-submit {
    color: white !important;
  }

  /* Dark mode adjustments */
  :global([data-theme="dark"]) .booking-widget {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="dark"]) .form-group input,
  :global([data-theme="dark"]) .form-group select {
    background: var(--color-background);
    border-color: var(--color-border);
  }

  :global([data-theme="dark"]) .form-group input:hover,
  :global([data-theme="dark"]) .form-group select:hover {
    border-color: var(--color-secondary);
    background-color: var(--color-background-alt);
    box-shadow: 0 2px 8px rgba(90, 138, 174, 0.15);
  }

  :global([data-theme="dark"]) .form-group input:focus,
  :global([data-theme="dark"]) .form-group select:focus {
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(90, 138, 174, 0.15);
  }

  /* Responsive design */
  @media (max-width: 1200px) {
    .booking-form {
      gap: var(--space-lg);
    }

    .form-row {
      gap: var(--space-md);
    }
  }

  @media (max-width: 900px) {
    .booking-widget {
      padding: var(--space-xl);
    }

    .booking-form {
      gap: var(--space-lg);
    }

    .dates-row {
      grid-template-columns: 1fr 1fr;
    }

    .guests-row {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .booking-widget {
      padding: var(--space-lg);
    }

    .booking-form {
      gap: var(--space-md);
    }

    .dates-row {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .guests-row {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .form-group input,
    .form-group select {
      padding: var(--space-sm) var(--space-md);
      font-size: var(--font-size-sm);
      min-height: 44px;
    }

    .form-group label {
      font-size: var(--font-size-xs);
    }
  }

  @media (max-width: 480px) {
    .dates-row,
    .guests-row {
      grid-template-columns: 1fr;
      gap: var(--space-sm);
    }

    .booking-form {
      gap: var(--space-md);
    }
  }
</style>

