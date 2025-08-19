// src/lib/prismic.js
import * as prismic from '@prismicio/client';
import { dev } from '$app/environment';

// Configuration - use environment variable or fallback
const repositoryName = import.meta.env.VITE_PRISMIC_REPOSITORY_NAME || 'hotel-ludwig-van-beethoven';

// Language configuration
export const languages = [
  { lang: 'de', label: 'Deutsch', isDefault: true },
  { lang: 'en', label: 'English', isDefault: false }
];

export const defaultLanguage = 'de';

/**
 * Create Prismic client instance
 * @param {Object} options - Options for creating the client
 * @param {string} options.lang - Language code for the content
 * @param {Request} options.request - SvelteKit request object
 * @returns {prismic.Client} Prismic client instance
 */
export function createClient({ lang = defaultLanguage, request = null } = {}) {
  const client = prismic.createClient(repositoryName, {
    // Add access token if repository is private
    accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
    routes: [
      {
        type: 'homepage',
        path: '/:lang?',
      },
      {
        type: 'page',
        path: '/:lang?/:uid',
      },
    ],
    defaultParams: {
      lang: lang === 'de' ? 'de-de' : 'en-us',
    }
  });

  if (request) {
    client.enableAutoPreviewsFromReq(request);
  }

  return client;
}

/**
 * Get localized content from Prismic
 * @param {string} documentType - The Prismic document type to fetch
 * @param {string} lang - Language code
 * @param {Object} options - Additional query options
 */
export async function getLocalizedContent(documentType, lang = defaultLanguage, options = {}) {
  const client = createClient({ lang });
  
  try {
    const document = await client.getSingle(documentType, {
      lang: lang === 'de' ? 'de-de' : 'en-us',
      ...options
    });
    return document;
  } catch (error) {
    console.error(`Error fetching ${documentType} in ${lang}:`, error);
    return null;
  }
}

/**
 * Get all documents of a specific type
 * @param {string} documentType - The Prismic document type to fetch
 * @param {string} lang - Language code
 * @param {Object} options - Additional query options
 */
export async function getAllDocuments(documentType, lang = defaultLanguage, options = {}) {
  const client = createClient({ lang });
  
  try {
    const documents = await client.getAllByType(documentType, {
      lang: lang === 'de' ? 'de-de' : 'en-us',
      ...options
    });
    return documents;
  } catch (error) {
    console.error(`Error fetching all ${documentType} in ${lang}:`, error);
    return [];
  }
}

/**
 * Get document by UID
 * @param {string} documentType - The Prismic document type
 * @param {string} uid - The document UID
 * @param {string} lang - Language code
 * @param {Object} options - Additional query options
 */
export async function getByUID(documentType, uid, lang = defaultLanguage, options = {}) {
  const client = createClient({ lang });
  
  try {
    const document = await client.getByUID(documentType, uid, {
      lang: lang === 'de' ? 'de-de' : 'en-us',
      ...options
    });
    return document;
  } catch (error) {
    console.error(`Error fetching ${documentType} with UID ${uid} in ${lang}:`, error);
    return null;
  }
}

/**
 * Link resolver for Prismic documents
 * @param {Object} doc - Prismic document
 * @returns {string} URL path for the document
 */
export function linkResolver(doc) {
  if (!doc || !doc.lang || !doc.type) return '/';
  
  const lang = doc.lang.split('-')[0];
  const langPrefix = lang === 'de' ? '' : `/${lang}`;
  
  switch(doc.type) {
    case 'homepage':
      return `${langPrefix}/`;
    case 'page':
      return `${langPrefix}/${doc.uid}`;
    case 'room':
      return `${langPrefix}/rooms/${doc.uid}`;
    default:
      return `${langPrefix}/`;
  }
}

/**
 * HTML serializer for rich text fields
 */
export const htmlSerializer = {
  paragraph: ({ children = '' }) => `<p class="prismic-paragraph">${children}</p>`,
  heading1: ({ children = '' }) => `<h1 class="prismic-h1">${children}</h1>`,
  heading2: ({ children = '' }) => `<h2 class="prismic-h2">${children}</h2>`,
  heading3: ({ children = '' }) => `<h3 class="prismic-h3">${children}</h3>`,
  list: ({ children = '' }) => `<ul class="prismic-list">${children}</ul>`,
  oList: ({ children = '' }) => `<ol class="prismic-olist">${children}</ol>`,
  listItem: ({ children = '' }) => `<li class="prismic-list-item">${children}</li>`,
  oListItem: ({ children = '' }) => `<li class="prismic-olist-item">${children}</li>`,
};