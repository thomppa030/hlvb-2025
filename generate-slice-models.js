#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Slice model configurations based on PRISMIC_SETUP.md
const sliceModels = {
  hero_slice: {
    "type": "SharedSlice",
    "id": "hero_slice", 
    "name": "HeroSlice",
    "description": "Hero section with title, subtitle, image and buttons",
    "variations": [
      {
        "id": "default",
        "name": "Default",
        "docURL": "...",
        "version": "initial",
        "description": "Default",
        "imageUrl": "",
        "primary": {
          "title": {
            "type": "StructuredText",
            "config": {
              "label": "Title",
              "placeholder": "Hotel Ludwig van Beethoven",
              "allowTargetBlank": false,
              "single": "heading1"
            }
          },
          "subtitle": {
            "type": "StructuredText", 
            "config": {
              "label": "Subtitle",
              "placeholder": "Your luxury retreat in the heart of the city",
              "allowTargetBlank": false,
              "single": "paragraph"
            }
          },
          "background_image": {
            "type": "Image",
            "config": {
              "label": "Background Image",
              "constraint": {},
              "thumbnails": []
            }
          },
          "primary_button_text": {
            "type": "Text",
            "config": {
              "label": "Primary Button Text",
              "placeholder": "Book Your Stay"
            }
          },
          "secondary_button_text": {
            "type": "Text",
            "config": {
              "label": "Secondary Button Text", 
              "placeholder": "Explore"
            }
          },
          "booking_url": {
            "type": "Link",
            "config": {
              "label": "Booking URL",
              "placeholder": "https://booking.example.com",
              "allowTargetBlank": true,
              "select": null
            }
          },
          "show_booking_widget": {
            "type": "Boolean",
            "config": {
              "label": "Show Booking Widget",
              "default_value": true,
              "placeholder_true": "Show",
              "placeholder_false": "Hide"
            }
          }
        },
        "items": {}
      }
    ]
  },

  rich_text: {
    "type": "SharedSlice",
    "id": "rich_text",
    "name": "RichTextSlice", 
    "description": "Rich text content with multiple paragraphs, headings, and lists",
    "variations": [
      {
        "id": "default",
        "name": "Default",
        "docURL": "...",
        "version": "initial", 
        "description": "Default",
        "imageUrl": "",
        "primary": {
          "content": {
            "type": "StructuredText",
            "config": {
              "label": "Content",
              "placeholder": "Write your content here...",
              "allowTargetBlank": true,
              "multi": "paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl"
            }
          }
        },
        "items": {}
      }
    ]
  },

  image_slice: {
    "type": "SharedSlice",
    "id": "image_slice",
    "name": "ImageSlice",
    "description": "Image with optional caption and layout options", 
    "variations": [
      {
        "id": "default",
        "name": "Default",
        "docURL": "...",
        "version": "initial",
        "description": "Default", 
        "imageUrl": "",
        "primary": {
          "image": {
            "type": "Image",
            "config": {
              "label": "Image",
              "constraint": {},
              "thumbnails": []
            }
          },
          "caption": {
            "type": "StructuredText",
            "config": {
              "label": "Caption",
              "placeholder": "Image caption...",
              "allowTargetBlank": false,
              "single": "paragraph"
            }
          },
          "layout": {
            "type": "Select",
            "config": {
              "label": "Layout",
              "placeholder": "Choose layout",
              "options": ["full-width", "contained"],
              "default_value": "contained"
            }
          }
        },
        "items": {}
      }
    ]
  },

  reviews_slice: {
    "type": "SharedSlice", 
    "id": "reviews_slice",
    "name": "ReviewsSlice",
    "description": "Reviews section with ratings from multiple platforms",
    "variations": [
      {
        "id": "default",
        "name": "Default", 
        "docURL": "...",
        "version": "initial",
        "description": "Default",
        "imageUrl": "",
        "primary": {
          "title": {
            "type": "StructuredText",
            "config": {
              "label": "Title",
              "placeholder": "What our guests say",
              "allowTargetBlank": false, 
              "single": "heading2"
            }
          },
          "description": {
            "type": "StructuredText",
            "config": {
              "label": "Description",
              "placeholder": "Highly rated across all major booking platforms...",
              "allowTargetBlank": false,
              "single": "paragraph"
            }
          },
          "button_text": {
            "type": "Text", 
            "config": {
              "label": "Button Text",
              "placeholder": "Read All Reviews"
            }
          },
          "button_link": {
            "type": "Link",
            "config": {
              "label": "Button Link",
              "placeholder": "/reviews",
              "allowTargetBlank": true,
              "select": null
            }
          }
        },
        "items": {
          "platform": {
            "type": "Text",
            "config": {
              "label": "Platform",
              "placeholder": "Google"
            }
          },
          "score": {
            "type": "Text", 
            "config": {
              "label": "Score",
              "placeholder": "4.3/5"
            }
          }
        }
      }
    ]
  }
};

// Custom type configuration for Homepage
const homepageCustomType = {
  "id": "homepage",
  "label": "Homepage", 
  "repeatable": false,
  "status": true,
  "json": {
    "Main": {
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

function createSliceModel(sliceId, modelData) {
  const sliceDir = join(process.cwd(), 'src', 'lib', 'slices', sliceId);
  
  try {
    mkdirSync(sliceDir, { recursive: true });
    const modelPath = join(sliceDir, 'model.json');
    writeFileSync(modelPath, JSON.stringify(modelData, null, 2));
    console.log(`✅ Created slice model: ${sliceId}`);
  } catch (error) {
    console.error(`❌ Error creating slice model ${sliceId}:`, error.message);
  }
}

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

console.log('🚀 Generating Prismic slice models and custom types...\n');

// Generate slice models
Object.entries(sliceModels).forEach(([sliceId, modelData]) => {
  createSliceModel(sliceId, modelData);
});

// Generate custom type
createCustomType('homepage', homepageCustomType);

console.log('\n✨ All models generated successfully!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm run slicemachine');
console.log('2. Push the models to your Prismic repository');
console.log('3. Create Homepage documents in Prismic dashboard');
console.log('4. Add slices with your content');