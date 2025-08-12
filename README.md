# Earl Hickson Jr. - Professional Portfolio

A modern, responsive portfolio website for Earl Hickson Jr., Senior Front-End Engineer and Brazilian Jiu-Jitsu black belt instructor.

## 🚀 Live Site

**[ehicksonjr.com](https://ehicksonjr.com)**

## 🏗️ Built With

- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling and responsive design
- **GitHub Pages** - Static hosting with GitHub Actions deployment
- **Font Awesome** - Professional iconography

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── blog/               # Blog posts
│   ├── case-studies/       # Engineering case studies
│   ├── contact/            # Contact information
│   ├── earldkaiju/         # BJJ lessons page
│   ├── articles/[slug]/    # Dynamic article pages
│   ├── api/resume/         # Resume download endpoint
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/             # Reusable React components
│   ├── ui/                 # UI primitives (Button, Input, etc.)
│   └── layout/             # Layout components (Header, Footer)
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions deployment
└── next.config.mjs         # Next.js configuration
```

## 🎯 Key Features

### Professional Portfolio
- **Responsive Design** - Optimized for all devices and screen sizes
- **Case Studies** - Detailed front-end engineering project showcases
- **Blog** - Technical articles and insights
- **Resume Download** - PDF resume accessible via API endpoint
- **Contact Forms** - Professional inquiry handling

### BJJ Lessons Platform (/earldkaiju)
- **Private Lesson Booking** - Specialized page for Brazilian Jiu-Jitsu instruction
- **Instructor Profile** - Black belt credentials and teaching philosophy
- **Training Programs** - Customized lesson plans and goals

### Technical Excellence
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Accessibility** - WCAG 2.1 compliant design patterns
- **Performance** - Static generation for optimal loading speeds
- **Type Safety** - Full TypeScript implementation

## 🔧 Development

### Prerequisites
- Node.js 18+ (recommended: Node.js 20)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/earl-portfolio.git
   cd earl-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 🚀 Deployment

This project deploys automatically to **ehicksonjr.com** via GitHub Pages using GitHub Actions.

### Deployment Process

1. **Push to main branch** triggers automatic deployment
2. **GitHub Actions** builds the Next.js application
3. **Static export** generates optimized static files
4. **GitHub Pages** serves the site at ehicksonjr.com

### Custom Domain Setup

- **CNAME file** points to `ehicksonjr.com`
- **DNS configuration** required for custom domain
- **HTTPS** automatically provided by GitHub Pages

### Workflow Configuration

The deployment workflow (`.github/workflows/deploy.yml`) includes:
- Node.js 20 environment
- Dependency caching for faster builds
- Next.js build and export process
- Automatic deployment to GitHub Pages

## 📧 Contact

**Earl Hickson Jr.**
- Email: [e@ehicksonjr.com](mailto:e@ehicksonjr.com)
- LinkedIn: [linkedin.com/in/earlhicksonjr](https://linkedin.com/in/earlhicksonjr)
- GitHub: [github.com/EHickson-Jr](https://github.com/EHickson-Jr)
- Location: Parsippany, New Jersey

## 📄 License

© 2025 Earl Hickson Jr. All rights reserved.

---

*Built with passion for clean code, accessible design, and martial arts excellence.*