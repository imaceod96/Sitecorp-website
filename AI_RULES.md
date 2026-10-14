# Tech Stack

- You are building a React application.
- Use TypeScript.
- Use React Router. KEEP the routes in src/App.tsx
- Always put source code in the src folder.
- Put pages into src/pages/
- Put components into src/components/
- The main page (default page) is src/pages/Index.tsx
- UPDATE the main page to include the new components. OTHERWISE, the user can NOT see any components!
- ALWAYS try to use the shadcn/ui library.
- Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.

Available packages and libraries:

- The lucide-react package is installed for icons.
- You ALREADY have ALL the shadcn/ui components and their dependencies installed. So you don't need to install them again.
- You have ALL the necessary Radix UI components installed.
- Use prebuilt components from the shadcn/ui library after importing them. Note that these files shouldn't be edited, so make new components if you need to change them.

# Brand identity (Sitecorp) — official, do not substitute

Design tokens live in `src/globals.css` (CSS variables) and `tailwind.config.ts`. Always style via these tokens; never hardcode hex values in components.

- Primary blue `#1A5F7A` → `brand-500` (buttons, headings, nav accents, blue sections)
- Secondary orange `#F49D37` → `accent-500` (sparingly: highlights, icons, details)
- Light background `#F8F9FA` → `surface-mist`; White `#FFFFFF` → `surface`/`white`
- Main text `#2C3E50` → `ink`; Dark background `#121212` → `coal`
- Light borders `#D1D5DB` → `surface-line`

Typography: Montserrat (`font-display`) for headings, Inter (`font-sans`) for body/nav/buttons/UI, JetBrains Mono (`font-mono`) for technical values only. H1 48px/800, H2 32px/700, body 16px/400 line-height 1.7, responsive on mobile.

Official logo assets are served from `/public/brand/` and must never be redrawn, recoloured or replaced by text or a generic icon:

- `sitecorp-logo.svg` (header, light backgrounds)
- `sitecorp-logo-contraste.png` (footer, dark background)
- `sitecorp-logo-vector.svg` (alternative vector version)
- `sitecorp-isotipo.png` (favicon)

Use the shared `Logo` component for all logo rendering.
