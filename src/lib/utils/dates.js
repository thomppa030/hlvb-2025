// src/lib/utils/dates.js
// Shared date utilities for booking functionality

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Get tomorrow's date in YYYY-MM-DD format
 * @param {string|null} fromDate - Base date to calculate from (optional)
 * @returns {string} Tomorrow's date
 */
export function getTomorrowDate(fromDate = null) {
  const baseDate = fromDate ? new Date(fromDate) : new Date();
  baseDate.setDate(baseDate.getDate() + 1);
  return baseDate.toISOString().split("T")[0];
}

/**
 * Format date for OnePageBooking (DD.MM.YYYY)
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export function formatDateForBooking(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Validate that departure date is after arrival date
 * @param {string} arrival - Arrival date in YYYY-MM-DD format
 * @param {string} departure - Departure date in YYYY-MM-DD format
 * @returns {boolean} True if dates are valid
 */
export function validateDateRange(arrival, departure) {
  if (!arrival || !departure) return false;
  return new Date(arrival) < new Date(departure);
}

/**
 * Get minimum date for departure based on arrival
 * @param {string} arrival - Arrival date in YYYY-MM-DD format
 * @returns {string} Minimum departure date
 */
export function getMinimumDeparture(arrival) {
  return arrival ? getTomorrowDate(arrival) : getTomorrowDate();
}