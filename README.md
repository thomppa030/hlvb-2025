# hlvb-2025

## Setup

```bash
# Install dependencies
deno task install

# Generate SvelteKit files
deno task sync

# Start development
deno task dev
```

Open [http://localhost:5173](http://localhost:5173)

## Commands

- `deno task dev` - Development server
- `deno task build` - Production build
- `deno task preview` - Preview build
- `deno task check` - Type checking

## Test Page

Visit `/test` to see the complete design system and components.

## Tech Stack

- **SvelteKit** - Framework
- **Deno 2** - Runtime
- **CSS Custom Properties** - Styling
- **Vite** - Build tool

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable components
│   ├── styles/        # CSS variables & global styles
│   └── utils/         # Helper functions
├── routes/            # Pages and API routes
└── app.css           # Global styles
```

## Design System

All design tokens are in `src/lib/styles/variables.css` for easy customization.
