# Earl Hickson Jr. - Portfolio Website

Professional Brazilian Jiu-Jitsu coaching platform and portfolio website showcasing Earl's expertise as a Front-End Developer and BJJ Black Belt.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:5000

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript  
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite + ESBuild
- **Deployment**: Vercel ready

## 📦 Production Build

```bash
npm run build
npm start
```

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables Required:
```
DATABASE_URL=your_postgresql_url
SENDGRID_API_KEY=your_sendgrid_key
YOUTUBE_API_KEY=your_youtube_api_key
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
```

## 🎯 Features

- ✅ Professional portfolio showcase
- ✅ BJJ lesson booking system at `/EarldKaiju`
- ✅ YouTube integration for training videos
- ✅ Contact forms with SendGrid integration
- ✅ Google Analytics tracking
- ✅ Mobile-responsive design
- ✅ SEO optimized

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run type-check` - TypeScript validation
- `npm run db:push` - Push database schema

Built with ❤️ by Earl Hickson Jr.