# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Hotel Ludwig van Beethoven Website (hlvb-2025) built with SvelteKit and npm. It features a comprehensive design system with dark/light theme support and component-based architecture.

## Tech Stack

- **SvelteKit** - Full-stack framework with file-based routing
- **npm** - Package manager and JavaScript runtime
- **Vite** - Build tool
- **TypeScript** - Type safety
- **CSS Custom Properties** - Design tokens and theming

## Essential Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Type Checking
```bash
# Run type checks
npm run check

# Type check with watch mode
npm run check:watch
```

### Setup & Installation
```bash
# Initial setup (install + sync)
npm run setup

# Install dependencies only
npm install

# Generate SvelteKit files
npx svelte-kit sync
```

## Architecture & Code Organization

### Directory Structure
```
src/
├── lib/
│   ├── components/ui/    # Reusable UI components (Button, Card, etc.)
│   ├── styles/           # Design tokens (variables.css)
│   └── utils/            # Utility functions
├── routes/               # File-based routing (pages)
├── app.css              # Global styles and CSS reset
└── app.html             # HTML template
```

### Design System Architecture

The project uses a comprehensive CSS variable system defined in `src/lib/styles/variables.css`. All components and styles reference these tokens for consistency:

- **Colors**: Primary, secondary, accent with light/dark variants
- **Typography**: Font sizes (xs-6xl), families (Inter, Playfair Display, JetBrains Mono)
- **Spacing**: Consistent scale (xs: 4px to 5xl: 128px)
- **Shadows**: 5 elevation levels
- **Breakpoints**: Mobile-first responsive design

### Component Patterns

Components in `src/lib/components/ui/` follow these patterns:

1. **Props-based configuration**: Variants, sizes, states
2. **Slot-based composition**: Named slots for flexible content
3. **CSS variable theming**: All styling uses design tokens
4. **Accessibility-first**: ARIA attributes, focus management

Example component structure:
```svelte
<script>
  export let variant = 'primary';
  export let size = 'medium';
  // Component logic
</script>

<element class={`component component--${variant} component--${size}`}>
  <slot />
</element>

<style>
  /* Styles using CSS variables from design system */
</style>
```

### Theme System

The theme system (`src/routes/+layout.svelte`) handles:
- System preference detection
- Manual theme toggle
- LocalStorage persistence
- CSS variable switching for light/dark modes

### Routing

SvelteKit file-based routing in `src/routes/`:
- `+page.svelte` - Page component
- `+page.js/ts` - Page load function
- `+layout.svelte` - Layout wrapper
- Nested folders create route segments

## Key Development Notes

1. **npm Package Manager**: This project uses npm for package management. Use `npm run` commands for all scripts.

2. **Design Tokens First**: Always use CSS variables from `variables.css` rather than hardcoded values.

3. **Component Reusability**: Check existing components in `src/lib/components/ui/` before creating new ones.

4. **Theme Awareness**: All new components must support both light and dark themes using the existing CSS variable system.

5. **Mobile-First**: Use the established breakpoint system for responsive design.

6. **Test Page**: Use `/test` route to verify design system changes and component behavior.

## Current State

- Basic setup with 2 UI components (Button, Card)
- Comprehensive design system implemented
- Theme switching functional
- Test page available at `/test` for design system verification
- Ready for expansion with hotel-specific content and additional components
- Never mention claude as a co-author in commit messages, leave it out
- no co authored note from claude
- please, never use emojis, not even as a placeholder