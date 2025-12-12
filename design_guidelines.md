# Design Guidelines: Logistics & Delivery Service Platform

## Design Approach

**Selected Framework:** Material Design principles with modern logistics industry refinement
**Justification:** Utility-focused application requiring clarity, trust, and efficiency. Material Design provides the structured component system needed for both customer-facing pages and admin functionality while maintaining professional credibility essential for logistics services.

**Key Design Principles:**
- Clear visual hierarchy for quick decision-making
- Icon-driven navigation for intuitive feature access
- Professional aesthetic that builds trust in delivery services
- Responsive grid systems for product catalogs
- Admin interface prioritizing functionality and speed

## Typography

**Font Family:** Inter (primary), Roboto (alternative via Google Fonts CDN)

**Hierarchy:**
- Hero Headlines: 3xl to 5xl, font-weight-bold (landing page main heading)
- Section Headers: 2xl to 3xl, font-weight-semibold
- Feature Titles: xl, font-weight-semibold
- Body Text: base, font-weight-normal, line-height-relaxed
- Button Text: base, font-weight-medium
- Product Titles: lg, font-weight-semibold
- Product Prices: xl, font-weight-bold
- Admin Labels: sm, font-weight-medium

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Tight spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, gap-4, m-4 (cards, between elements)
- Section spacing: py-12, py-16, py-20 (vertical page sections)
- Large gaps: gap-8, gap-12 (feature grids, product grids)

**Container Structure:**
- Page containers: max-w-7xl mx-auto px-4
- Content sections: max-w-6xl
- Admin forms: max-w-2xl

## Component Library

### Landing Page
**Hero Section:** 
- Full-width with background gradient or image overlay
- Centered headline and subheading
- Single primary CTA button (large, prominent)
- Height: min-h-screen with content vertically centered

**Feature Grid (4 Icons):**
- 4-column grid on desktop (grid-cols-4), 2-column on tablet (md:grid-cols-2), single column on mobile
- Each feature card: rounded-xl border with hover elevation
- Icon container: w-16 h-16 with rounded background
- Icon size: w-10 h-10 from Heroicons
- Card padding: p-8
- Title below icon: text-lg font-semibold
- Gap between cards: gap-6

### Delivery Service Page
**Two-Option Layout:**
- 2-column grid (lg:grid-cols-2, base: grid-cols-1)
- Large icon cards: p-12, min-h-80
- Icons: w-20 h-20
- Descriptive text: 3-4 lines explaining each option
- Full-width CTA button at bottom of each card

### Product Catalog Page
**Product Grid:**
- 3-column desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single mobile
- Product cards: rounded-lg with subtle shadow, border
- Card structure (top to bottom):
  - Product image container: aspect-square with object-cover
  - Padding: p-4
  - Product name: text-lg font-semibold, line-clamp-2
  - Price: text-xl font-bold, spacing: mt-2
  - "Buy Now" button: full width (w-full), mt-4

**Filters/Search Bar:**
- Sticky top bar with search input and category filters
- Height: h-16, with horizontal layout

### Admin Portal
**Login Page:**
- Centered card: max-w-md, p-8
- Vertical form layout with generous spacing (space-y-6)
- Input fields: h-12, rounded-lg border

**Product Management Dashboard:**
- Two-column layout: sidebar navigation (w-64) + main content area
- Product list table with actions column
- Add/Edit product form: 2-column grid for fields (lg:grid-cols-2)
- Image upload area: border-dashed with drag-and-drop zone (min-h-48)

### Navigation
**Main Header:**
- Height: h-16 to h-20
- Horizontal flex layout with logo left, nav links center, admin link right
- Sticky positioning (sticky top-0)

**Buttons:**
- Primary: px-6 py-3, rounded-lg, font-medium
- Secondary: px-6 py-3, rounded-lg, border-2
- Icon buttons in admin: w-10 h-10, rounded-md

### Form Elements
- Input fields: h-12, px-4, rounded-lg, border
- Labels: text-sm font-medium, mb-2
- Error messages: text-sm, mt-1
- Form spacing: space-y-4 for field groups

## Icons
**Library:** Heroicons (via CDN)
**Usage:**
- Feature icons: outline style, w-10 h-10
- Navigation icons: w-6 h-6
- Action icons (edit, delete): w-5 h-5
- Delivery truck, package box, shopping cart, dashboard icons

## Images

**Hero Image (Landing Page):**
- Full-width background image of delivery trucks/logistics operations
- Semi-transparent overlay for text readability
- Professional, high-quality imagery showing reliability

**Product Images:**
- Square aspect ratio (1:1)
- Minimum 800x800px
- White/neutral background for consistency
- Show product clearly from front view

**Delivery Service Icons:**
- Use illustrative icons or small hero images (400x300px)
- Contextual imagery: package being sent, shopping interface

**Admin Portal:**
- No decorative images - focus on functionality
- Product thumbnails in list view: 80x80px

**Image Treatments:**
- All product images: rounded-lg
- Hero images: No rounding
- Buttons on images: Blurred backgrounds with backdrop-blur-sm