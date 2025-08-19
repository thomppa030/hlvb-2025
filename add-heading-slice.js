#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Heading slice model configuration
const headingSliceModel = {
  "type": "SharedSlice",
  "id": "heading_slice",
  "name": "HeadingSlice",
  "description": "Page heading with title and subtitle",
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
            "placeholder": "Page Title",
            "allowTargetBlank": false,
            "single": "heading1"
          }
        },
        "subtitle": {
          "type": "StructuredText",
          "config": {
            "label": "Subtitle",
            "placeholder": "Page subtitle or description",
            "allowTargetBlank": false,
            "single": "paragraph"
          }
        },
        "alignment": {
          "type": "Select",
          "config": {
            "label": "Text Alignment",
            "placeholder": "Choose text alignment",
            "options": ["center", "left", "right"],
            "default_value": "center"
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

console.log('🚀 Adding Heading slice model...\n');

// Generate heading slice model
createSliceModel('heading_slice', headingSliceModel);

console.log('\n✨ Heading slice model generated successfully!');
console.log('\n📋 Next steps:');
console.log('1. Create HeadingSlice.svelte component');
console.log('2. Add heading_slice to slice index');
console.log('3. Run Slice Machine and push to Prismic');
console.log('4. Use in your pages for styled headers');