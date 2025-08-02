// src/routes/test/+page.js
export const prerender = true;

export async function load() {
  return {
    meta: {
      title: "Design System Test Page",
      description:
        "Comprehensive testing page for the hotel homepage design system and components.",
      keywords: "design system, components, testing, hotel, SvelteKit",
    },
  };
}
