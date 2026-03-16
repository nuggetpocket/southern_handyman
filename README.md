# Southern Handyman

A modern, responsive single-page application for **Southern Handyman**, a Houston-area home repair and renovation service covering a 90-mile radius across Greater Houston, Katy, Cypress, The Woodlands, and Pearland.

## Features

- Service catalog with 8 categories (renovation, carpentry, plumbing, electrical, and more)
- Customer testimonials
- Full-article blog with SEO metadata
- AI-powered chat assistant (Google Gemini + ElevenLabs voice widget)
- Contact / booking form
- Mobile-first responsive design

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| Styling | Tailwind CSS (CDN) |
| Icons | Lucide React |
| AI Chat | Google Gemini (`@google/genai`) |
| Voice Widget | ElevenLabs ConvAI |
| Module Bundling | Native ES modules via import maps |

## Getting Started

No build step is required. The project runs directly in the browser via ES module import maps.

```bash
# Clone the repository
git clone https://github.com/nuggetpocket/southern_handyman.git
cd southern_handyman

# Serve locally (any static file server works)
npx serve .
# or
python3 -m http.server 5173
```

### Environment Variables

Create a `.env.local` file (already git-ignored) with your Gemini API key:

```
GEMINI_API_KEY=your_key_here
```

## Project Structure

```
├── index.html          # App shell + import map
├── index.tsx           # React entry point
├── App.tsx             # Root component + routing
├── constants.tsx       # Services, testimonials, blog posts
├── types.ts            # TypeScript interfaces
└── components/         # Page sections and UI components
```

## License

All rights reserved. © Southern Handyman.
