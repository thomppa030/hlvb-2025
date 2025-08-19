#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Page custom type configuration
const pageCustomType = {
  "id": "page",
  "label": "Page", 
  "repeatable": true,
  "status": true,
  "json": {
    "Main": {
      "uid": {
        "type": "UID",
        "config": {
          "label": "UID",
          "placeholder": "page-url-slug"
        }
      },
      "title": {
        "type": "StructuredText",
        "config": {
          "label": "Page Title",
          "placeholder": "Page title",
          "allowTargetBlank": false,
          "single": "heading1"
        }
      },
      "slices": {
        "type": "Slices",
        "fieldset": "Slice Zone",
        "config": {
          "choices": {
            "hero_slice": {
              "type": "SharedSlice"
            },
            "rich_text": {
              "type": "SharedSlice"
            },
            "image_slice": {
              "type": "SharedSlice"
            },
            "reviews_slice": {
              "type": "SharedSlice"
            }
          }
        }
      }
    },
    "SEO & Metadata": {
      "meta_description": {
        "type": "Text",
        "config": {
          "label": "Meta Description",
          "placeholder": "A brief description of this page"
        }
      },
      "meta_image": {
        "type": "Image",
        "config": {
          "constraint": {
            "width": 1200,
            "height": 630
          },
          "thumbnails": [],
          "label": "Meta Image"
        }
      }
    }
  }
};

function createCustomType(typeId, typeData) {
  const customTypesDir = join(process.cwd(), 'customtypes');
  
  try {
    mkdirSync(customTypesDir, { recursive: true });
    
    const typeDir = join(customTypesDir, typeId);
    mkdirSync(typeDir, { recursive: true });
    
    const indexPath = join(typeDir, 'index.json');
    writeFileSync(indexPath, JSON.stringify(typeData, null, 2));
    console.log(`✅ Created custom type: ${typeId}`);
  } catch (error) {
    console.error(`❌ Error creating custom type ${typeId}:`, error.message);
  }
}

console.log('🚀 Adding Page custom type for localized pages...\n');

// Generate page custom type
createCustomType('page', pageCustomType);

console.log('\n✨ Page custom type generated successfully!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm run slicemachine');
console.log('2. Push both homepage AND page models to Prismic');
console.log('3. Create localized Page documents (e.g., About Us, Contact, etc.)');
console.log('4. Your routes will work: / (homepage) and /about, /en/about (pages)');