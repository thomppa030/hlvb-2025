#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Feature slice model configuration with two variations
const featureSliceModel = {
  "type": "SharedSlice",
  "id": "feature_slice",
  "name": "FeatureSlice",
  "description": "Feature section with heading, subheading, text and image",
  "variations": [
    {
      "id": "imageLeft",
      "name": "Image Left",
      "docURL": "...",
      "version": "initial",
      "description": "Image on the left, content on the right",
      "imageUrl": "",
      "primary": {
        "heading": {
          "type": "StructuredText",
          "config": {
            "label": "Heading",
            "placeholder": "Feature Heading",
            "allowTargetBlank": false,
            "single": "heading2"
          }
        },
        "subheading": {
          "type": "StructuredText",
          "config": {
            "label": "Subheading",
            "placeholder": "Feature Subheading",
            "allowTargetBlank": false,
            "single": "heading3"
          }
        },
        "content": {
          "type": "StructuredText",
          "config": {
            "label": "Content",
            "placeholder": "Feature content text",
            "allowTargetBlank": true,
            "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item"
          }
        },
        "image": {
          "type": "Image",
          "config": {
            "label": "Feature Image",
            "constraint": {},
            "thumbnails": []
          }
        },
        "image_alt": {
          "type": "Text",
          "config": {
            "label": "Image Alt Text",
            "placeholder": "Describe the image"
          }
        }
      },
      "items": {}
    },
    {
      "id": "imageRight",
      "name": "Image Right",
      "docURL": "...",
      "version": "initial",
      "description": "Image on the right, content on the left",
      "imageUrl": "",
      "primary": {
        "heading": {
          "type": "StructuredText",
          "config": {
            "label": "Heading",
            "placeholder": "Feature Heading",
            "allowTargetBlank": false,
            "single": "heading2"
          }
        },
        "subheading": {
          "type": "StructuredText",
          "config": {
            "label": "Subheading",
            "placeholder": "Feature Subheading",
            "allowTargetBlank": false,
            "single": "heading3"
          }
        },
        "content": {
          "type": "StructuredText",
          "config": {
            "label": "Content",
            "placeholder": "Feature content text",
            "allowTargetBlank": true,
            "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item"
          }
        },
        "image": {
          "type": "Image",
          "config": {
            "label": "Feature Image",
            "constraint": {},
            "thumbnails": []
          }
        },
        "image_alt": {
          "type": "Text",
          "config": {
            "label": "Image Alt Text",
            "placeholder": "Describe the image"
          }
        }
      },
      "items": {}
    }
  ]
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

console.log('🚀 Adding Feature slice model...\n');

// Generate feature slice model
createSliceModel('feature_slice', featureSliceModel);

console.log('\n✨ Feature slice model generated successfully!');
console.log('\n📋 Next steps:');
console.log('1. Create FeatureSlice.svelte component');
console.log('2. Add feature_slice to slice index');
console.log('3. Run Slice Machine and push to Prismic');
console.log('4. Use in your pages with imageLeft or imageRight variations');