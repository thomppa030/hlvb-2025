<!-- src/lib/components/ui/BookingWidget.svelte -->
<script>
  import Button from "./Button.svelte";
  import FormField from "./FormField.svelte";
  import { t, currentLanguage } from '$lib/stores/i18n.js';
  import { getTodayDate, getTomorrowDate, formatDateForBooking, getMinimumDeparture } from '$lib/utils/dates.js';

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

  // Form field options
  const adultsOptions = [
    { value: 1, label: $t('booking.adults_1') },
    { value: 2, label: $t('booking.adults_2') },
    { value: 3, label: $t('booking.adults_3') },
    { value: 4, label: $t('booking.adults_4') }
  ];

  const roomsOptions = [
    { value: 1, label: $t('booking.rooms_1') },
    { value: 2, label: $t('booking.rooms_2') },
    { value: 3, label: $t('booking.rooms_3') }
  ];

  const childrenOptions = [
    { value: 0, label: $t('booking.children_0') },
    { value: 1, label: $t('booking.children_1') },
    { value: 2, label: $t('booking.children_2') },
    { value: 3, label: $t('booking.children_3') }
  ];

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
    departure = getMinimumDeparture(arrival);
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
        <FormField
          id="arrival"
          label={$t('booking.checkin')}
          type="date"
          bind:value={arrival}
          min={getTodayDate()}
          required
        />

        <FormField
          id="departure"
          label={$t('booking.checkout')}
          type="date"
          bind:value={departure}
          min={getMinimumDeparture(arrival)}
          required
        />

        <FormField
          id="adults"
          label={$t('booking.adults')}
          type="select"
          bind:value={adults}
          options={adultsOptions}
        />

        <FormField
          id="rooms"
          label={$t('booking.rooms')}
          type="select"
          bind:value={rooms}
          options={roomsOptions}
        />

        <FormField
          id="children"
          label={$t('booking.children')}
          type="select"
          bind:value={children}
          options={childrenOptions}
        />
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

