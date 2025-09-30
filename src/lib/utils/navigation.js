// src/lib/utils/navigation.js
// Shared navigation utilities for route handling

/**
 * Check if a route is currently active
 * @param {string} currentPath - Current page path
 * @param {string} targetRoute - Route to check
 * @param {string} language - Current language ('en' or 'de')
 * @returns {boolean} True if route is active
 */
export function isActiveRoute(currentPath, targetRoute, language) {
  if (targetRoute === '/') {
    return currentPath === '/' || currentPath === '/en';
  }

  if (language === 'en') {
    const langRoute = `/en${targetRoute}`;
    return currentPath === langRoute || currentPath.startsWith(langRoute + '/');
  }

  return currentPath === targetRoute || currentPath.startsWith(targetRoute + '/');
}

/**
 * Get localized link for a route
 * @param {string} path - Base path
 * @param {string} language - Current language ('en' or 'de')
 * @returns {string} Localized path
 */
export function getLangLink(path, language) {
  if (language === 'en') {
    return path === '/' ? '/en' : `/en${path}`;
  }
  return path;
}

/**
 * Route constants for consistent navigation
 */
export const ROUTES = {
  home: { de: '/', en: '/en' },
  reviews: { de: '/reviews', en: '/en/reviews' },
  infos: { de: '/infos', en: '/en/infos' },
  aktuelles: { de: '/aktuelles', en: '/en/aktuelles' },
  social: { de: '/social', en: '/en/social' }
};

/**
 * Get localized route from routes config
 * @param {string} route - Route key from ROUTES
 * @param {string} language - Current language ('en' or 'de')
 * @returns {string} Localized route path
 */
export function getLocalizedRoute(route, language) {
  return ROUTES[route]?.[language] || '/';
}