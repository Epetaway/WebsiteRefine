# Earl Hickson Jr. - Next.js Portfolio

A professional portfolio website built with Next.js 14, showcasing front-end engineering expertise and Brazilian Jiu-Jitsu coaching services.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Homepage with hero section
├── globals.css            # Global styles & animations
├── providers.tsx          # React Query & GA providers
├── case-studies/page.tsx  # Engineering case studies
├── about/page.tsx         # About page with skills & BJJ
├── blog/page.tsx          # Blog with technical articles
├── earldkaiju/page.tsx    # BJJ private lessons
├── contact/page.tsx       # Contact information
├── articles/[slug]/page.tsx # Dynamic blog articles
├── api/resume/route.ts    # Resume download endpoint
└── not-found.tsx          # 404 page

components/
├── layout/
│   ├── header.tsx         # Navigation with active states
│   └── footer.tsx         # Footer with social links
└── ui/
    ├── button.tsx         # shadcn/ui button component
    ├── tech-badge.tsx     # Custom tech stack badges
    ├── toast.tsx          # Toast notifications
    ├── toaster.tsx        # Toast provider
    └── tooltip.tsx        # Tooltip component

hooks/
└── use-toast.ts           # Toast hook for notifications

lib/
└── utils.ts               # Utility functions
```

## 🎨 Features

- **Modern Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive design** for all devices
- **SEO optimized** with proper meta tags
- **Scroll-to-top** navigation
- **Custom animations** and gradient effects
- **Professional portfolio** sections
- **BJJ coaching page** with booking functionality

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / shadcn/ui
- **Icons:** Font Awesome & Lucide React
- **Fonts:** Inter & JetBrains Mono
- **State Management:** TanStack React Query
- **Analytics:** Google Analytics (configurable)

## 📝 Pages Overview

### Homepage (/)
- Hero section with professional headline
- Tech stack badges
- Quick navigation cards
- Social proof metrics

### Case Studies (/case-studies)
- Coming soon placeholder
- Professional project showcases

### About (/about)
- Technical background
- Skills matrix
- BJJ connection to engineering

### Blog (/blog)
- Featured articles
- Technical insights
- BJJ philosophy posts

### BJJ Lessons (/earldkaiju)
- Private lesson information
- Instructor credentials
- Booking contact form

### Contact (/contact)
- Professional contact options
- BJJ lesson inquiries
- Social media links

## 🚀 Deployment

This project is ready for deployment to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- **Any Node.js hosting**

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables (if needed)
3. Deploy automatically on push

### Environment Variables
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional: Google Analytics
```

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🎯 Key Highlights

- **Senior Front-End Engineer** positioning
- **6+ years experience** prominently displayed
- **Proven results:** +37% conversions, +25% traffic, +75% engagement
- **Professional Brazilian Jiu-Jitsu** black belt credentials
- **Parsippany, New Jersey** location
- **Available for senior engineering roles**

## 📞 Contact Information

- **Email:** e@ehicksonjr.com
- **LinkedIn:** linkedin.com/in/earlhicksonjr
- **GitHub:** github.com/EHickson-Jr
- **Location:** Parsippany, New Jersey

---

Built with care by Earl Hickson Jr. - Senior Front-End Engineer & BJJ Black Belt