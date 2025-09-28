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
  function getTomorrowDate(fromDate = null) {
    const baseDate = fromDate ? new Date(fromDate) : new Date();
    baseDate.setDate(baseDate.getDate() + 1);
    return baseDate.toISOString().split("T")[0];
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

  // Reactive date validation: ensure departure is after arrival
  $: if (arrival && departure && new Date(arrival) >= new Date(departure)) {
    departure = getTomorrowDate(arrival);
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
      <!-- Single Line Form Row -->
      <div class="form-row single-line">
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

        <div class="form-group">
          <label for="adults">{$t('booking.adults')}</label>
          <select id="adults" bind:value={adults}>
            <option value={1}>{$t('booking.adults_1')}</option>
            <option value={2}>{$t('booking.adults_2')}</option>
            <option value={3}>{$t('booking.adults_3')}</option>
            <option value={4}>{$t('booking.adults_4')}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rooms">{$t('booking.rooms')}</label>
          <select id="rooms" bind:value={rooms}>
            <option value={1}>{$t('booking.rooms_1')}</option>
            <option value={2}>{$t('booking.rooms_2')}</option>
            <option value={3}>{$t('booking.rooms_3')}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="children">{$t('booking.children')}</label>
          <select id="children" bind:value={children}>
            <option value={0}>{$t('booking.children_0')}</option>
            <option value={1}>{$t('booking.children_1')}</option>
            <option value={2}>{$t('booking.children_2')}</option>
            <option value={3}>{$t('booking.children_3')}</option>
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
    padding: var(--space-lg); /* Reduced from 2xl to lg (20% height reduction) */
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
    overflow: hidden;
  }

  .booking-widget h3 {
    color: var(--color-text);
    margin-bottom: var(--space-sm);
    text-align: center;
    font-size: var(--font-size-3xl); /* Large prominent heading */
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
    gap: var(--space-lg); /* Reduced gap */
  }

  .form-row {
    display: grid;
    gap: var(--space-md); /* Reduced gap */
    align-items: end;
    width: 100%;
    box-sizing: border-box;
  }

  .single-line {
    grid-template-columns: repeat(5, 1fr);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px; /* Reduced gap */
    min-width: 0;
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
    padding: var(--space-sm) var(--space-md); /* Reduced padding */
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-background);
    color: var(--color-text);
    font-size: var(--font-size-sm); /* Smaller font */
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-fast);
    min-height: 40px; /* Reduced height */
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
    min-width: 180px; /* Slightly smaller */
    max-width: 250px;
    margin: 0 auto;
    justify-self: center;
    background-color: var(--color-secondary) !important;
    color: var(--color-text-inverse) !important;
    border: none !important;
    padding: var(--space-sm) var(--space-lg) !important; /* Reduced padding */
    font-size: var(--font-size-base) !important; /* Smaller font */
    font-weight: var(--font-weight-semibold) !important;
  }
  
  :global(.booking-submit:hover:not(:disabled)) {
    background-color: var(--color-secondary-light) !important;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
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

    .single-line {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 600px) {
    .booking-widget {
      padding: var(--space-lg);
    }

    .booking-form {
      gap: var(--space-md);
    }

    .single-line {
      grid-template-columns: repeat(2, 1fr);
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
    .single-line {
      grid-template-columns: 1fr;
      gap: var(--space-sm);
    }

    .booking-form {
      gap: var(--space-md);
    }
  }
</style>

