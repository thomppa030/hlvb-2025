# Prismic CMS Setup Guide

This guide explains how to set up Prismic CMS for the Hotel Ludwig van Beethoven website with internationalization support.

## 1. Create Prismic Repository

1. Go to [Prismic.io](https://prismic.io) and create a new repository
2. Choose repository name: `hotel-ludwig-van-beethoven`
3. Set up languages:
   - Primary: `de-de` (German - Germany)
   - Additional: `en-us` (English - United States)

## 2. Configure Languages

In your Prismic repository settings:

1. Go to Settings → Translations & Locales
2. Add languages:
   - `de-de` (German - Germany) - Set as primary
   - `en-us` (English - United States)

## 3. Create Custom Types

### Homepage Custm Type (`homepage`)

Create a new Custom Type called "Homepage" with the following slices:

#### Slice Zone
Add a Slice Zone field called `slices` with the following slice types:

### Hero Slice (`hero_slice`)

**Primary Fields:**
- `title` - Rich Text (H1)
- `subtitle` - Rich Text (Paragraph)
- `background_image` - Image
- `primary_button_text` - Key Text
- `secondary_button_text` - Key Text
- `booking_url` - Link
- `show_booking_widget` - Boolean

### Rich Text Slice (`rich_text`)

**Primary Fields:**
- `content` - Rich Text (Multiple paragraphs, headings, lists)

### Image Slice (`image_slice`)

**Primary Fields:**
- `image` - Image
- `caption` - Rich Text (Paragraph)
- `layout` - Select (Options: "full-width", "contained")

### Reviews Slice (`reviews_slice`)

**Primary Fields:**
- `title` - Rich Text (H2)
- `description` - Rich Text (Paragraph)
- `button_text` - Key Text
- `button_link` - Link

**Repeatable Fields:**
- `platform` - Key Text
- `score` - Key Text

## 4. Environment Configuration

1. Update `.env` file:
```env
VITE_PRISMIC_REPOSITORY_NAME=hotel-ludwig-van-beethoven
# Optional: Only if repository is private
# VITE_PRISMIC_ACCESS_TOKEN=your-access-token
```

2. Update `src/lib/prismic.js` with your repository name.

## 5. Content Structure Example

### German Homepage (`de-de`)

Create a Homepage document in German with these slices:

#### Hero Slice:
- **Title**: "Hotel Ludwig van Beethoven"
- **Subtitle**: "Ein persönliches 3-Sterne-Garni-Hotel-Erlebnis im Herzen von Berlin Kreuzberg"
- **Background Image**: Upload hotel image
- **Primary Button**: "Jetzt buchen"
- **Secondary Button**: "Entdecken"
- **Show Booking Widget**: True

#### Rich Text Slice (About):
- **Content**: Hotel description in German

#### Reviews Slice:
- **Title**: "Was unsere Gäste sagen"
- **Description**: "Hochbewertet auf allen großen Buchungsplattformen..."
- **Button Text**: "Alle Bewertungen lesen"
- **Ratings**: Google (4.3/5), TripAdvisor (4.5/5), etc.

### English Homepage (`en-en`)

Create the same structure with English content:

#### Hero Slice:
- **Title**: "Hotel Ludwig van Beethoven"
- **Subtitle**: "Your luxury retreat in the heart of the city"
- **Primary Button**: "Book Your Stay"
- **Secondary Button**: "Explore"

## 6. Content Migration

To migrate existing content to Prismic:

1. Create Homepage documents for both languages
2. Add Hero slices with current hero content
3. Add Rich Text slices for About, Amenities, Location sections
4. Add Reviews slice with rating data
5. Set appropriate meta titles and descriptions

## 7. Preview Setup (Optional)

1. In Prismic Settings → Previews
2. Add preview URL: `http://localhost:5173/api/preview`
3. Create preview API route in SvelteKit

## 8. Deployment

When deploying:

1. Set environment variables in production
2. Update repository name in production config
3. Ensure Prismic webhook endpoints are configured for cache invalidation

## 9. Content Workflow

1. Content editors can manage all content through Prismic dashboard
2. Changes are reflected immediately on the website
3. Translations can be managed per document
4. Rich text supports formatting, links, and embedded content

## Fallback Strategy

The implementation includes fallback to static content when:
- Prismic is unavailable
- No content exists for a language
- API errors occur

This ensures the website always functions even without CMS content.
