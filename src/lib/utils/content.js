// src/lib/utils/content.js
import { getAllDocuments } from '$lib/prismic.js';

/**
 * Fetch all job listings from Prismic - NO FALLBACK for actual job offers
 * @param {string} lang - Language code ('de' or 'en')
 * @returns {Promise<Array>} Array of job listings (empty if none available)
 */
export async function fetchJobs(lang = 'de') {
  try {
    // Only fetch from Prismic - no fallback for real job openings
    const prismicJobs = await getAllDocuments('job_listing', lang);

    if (prismicJobs && prismicJobs.length > 0) {
      // Transform Prismic data to match our expected format
      return prismicJobs
        .filter(job => job.data.is_active)
        .map(job => ({
          id: job.uid,
          title: job.data.title,
          department: job.data.department,
          type: job.data.job_type,
          description: job.data.description?.[0]?.text || '',
          responsibilities: extractListItems(job.data.responsibilities),
          requirements: extractListItems(job.data.requirements),
          benefits: extractListItems(job.data.benefits),
          contact: job.data.contact_email,
          // Add Prismic metadata
          _prismic: {
            id: job.id,
            uid: job.uid,
            last_publication_date: job.last_publication_date
          }
        }))
        .sort((a, b) => a.title.localeCompare(b.title));
    }

    // Return empty array if no jobs in Prismic
    console.info('No active job listings found in Prismic');
    return [];
  } catch (error) {
    console.warn('Failed to fetch jobs from Prismic:', error);
    return [];
  }
}

/**
 * Fetch all FAQ items from Prismic - NO FALLBACK for FAQ content
 * @param {string} lang - Language code ('de' or 'en')
 * @returns {Promise<Array>} Array of FAQ items (empty if none available)
 */
export async function fetchFAQ(lang = 'de') {
  try {
    // Only fetch from Prismic - no fallback for FAQ content
    const prismicFAQ = await getAllDocuments('faq_item', lang);

    if (prismicFAQ && prismicFAQ.length > 0) {
      // Transform Prismic data to match our expected format
      return prismicFAQ
        .map(faq => ({
          id: faq.uid,
          question: faq.data.question,
          answer: faq.data.answer ? prismicRichTextToHTML(faq.data.answer) : '',
          category: faq.data.category,
          order: faq.data.order || 999,
          featured: faq.data.is_featured || false,
          // Add Prismic metadata
          _prismic: {
            id: faq.id,
            uid: faq.uid,
            last_publication_date: faq.last_publication_date
          }
        }))
        .sort((a, b) => a.order - b.order || a.question.localeCompare(b.question));
    }

    // Return empty array if no FAQ items in Prismic
    console.info('No FAQ items found in Prismic');
    return [];
  } catch (error) {
    console.warn('Failed to fetch FAQ from Prismic:', error);
    return [];
  }
}

/**
 * Get jobs filtered by department
 * @param {string} department - Department name or 'all'
 * @param {string} lang - Language code
 * @returns {Promise<Array>} Filtered job listings
 */
export async function fetchJobsByDepartment(department = 'all', lang = 'de') {
  const jobs = await fetchJobs(lang);

  if (department === 'all') {
    return jobs;
  }

  return jobs.filter(job => job.department === department);
}

/**
 * Get FAQ items filtered by category
 * @param {string} category - Category name or 'all'
 * @param {string} lang - Language code
 * @returns {Promise<Array>} Filtered FAQ items
 */
export async function fetchFAQByCategory(category = 'all', lang = 'de') {
  const faqItems = await fetchFAQ(lang);

  if (category === 'all') {
    return faqItems;
  }

  return faqItems.filter(item => item.category === category);
}

/**
 * Get unique departments from jobs
 * @param {string} lang - Language code
 * @returns {Promise<Array>} Array of department names
 */
export async function getJobDepartments(lang = 'de') {
  const jobs = await fetchJobs(lang);
  return [...new Set(jobs.map(job => job.department))].sort();
}

/**
 * Get unique categories from FAQ items
 * @param {string} lang - Language code
 * @returns {Promise<Array>} Array of category names
 */
export async function getFAQCategories(lang = 'de') {
  const faqItems = await fetchFAQ(lang);
  return [...new Set(faqItems.map(item => item.category))].sort();
}

/**
 * Extract list items from Prismic rich text
 * @param {Array} richText - Prismic rich text field
 * @returns {Array} Array of text strings
 */
function extractListItems(richText) {
  if (!richText || !Array.isArray(richText)) return [];

  return richText
    .filter(item => item.type === 'list-item')
    .map(item => item.text)
    .filter(Boolean);
}

/**
 * Convert Prismic rich text to HTML
 * @param {Array} richText - Prismic rich text field
 * @returns {string} HTML string
 */
function prismicRichTextToHTML(richText) {
  if (!richText || !Array.isArray(richText)) return '';

  let html = '';
  let inList = false;

  for (const item of richText) {
    switch (item.type) {
      case 'paragraph':
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<p>${applySpans(item.text, item.spans || [])}</p>`;
        break;

      case 'list-item':
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${applySpans(item.text, item.spans || [])}</li>`;
        break;

      case 'heading1':
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<h1>${applySpans(item.text, item.spans || [])}</h1>`;
        break;

      case 'heading2':
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<h2>${applySpans(item.text, item.spans || [])}</h2>`;
        break;

      default:
        // Handle other types as paragraphs
        if (item.text) {
          if (inList) {
            html += '</ul>';
            inList = false;
          }
          html += `<p>${applySpans(item.text, item.spans || [])}</p>`;
        }
    }
  }

  if (inList) {
    html += '</ul>';
  }

  return html;
}

/**
 * Apply text formatting spans (bold, italic, links)
 * @param {string} text - Base text
 * @param {Array} spans - Array of formatting spans
 * @returns {string} Formatted text
 */
function applySpans(text, spans) {
  if (!spans || spans.length === 0) return text;

  // Sort spans by start position to handle overlapping spans correctly
  const sortedSpans = [...spans].sort((a, b) => a.start - b.start);

  let result = text;
  let offset = 0;

  for (const span of sortedSpans) {
    const start = span.start + offset;
    const end = span.end + offset;

    let openTag = '';
    let closeTag = '';

    switch (span.type) {
      case 'strong':
        openTag = '<strong>';
        closeTag = '</strong>';
        break;
      case 'em':
        openTag = '<em>';
        closeTag = '</em>';
        break;
      case 'hyperlink':
        openTag = `<a href="${span.data?.url || '#'}"${span.data?.target ? ' target="_blank"' : ''}>`;
        closeTag = '</a>';
        break;
    }

    if (openTag && closeTag) {
      result = result.slice(0, start) + openTag + result.slice(start, end) + closeTag + result.slice(end);
      offset += openTag.length + closeTag.length;
    }
  }

  return result;
}

/**
 * Check if content management is available (Prismic is working)
 * @returns {Promise<boolean>} True if CMS is available
 */
export async function isCMSAvailable() {
  try {
    // Try a simple request to check if Prismic is working
    const testJobs = await getAllDocuments('job_listing', 'de', { pageSize: 1 });
    return Array.isArray(testJobs);
  } catch (error) {
    console.warn('CMS availability check failed:', error);
    return false;
  }
}