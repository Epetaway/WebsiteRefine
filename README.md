# Earl Hickson Jr. - Professional Portfolio

A modern, responsive portfolio website showcasing front-end engineering expertise, Brazilian Jiu-Jitsu coaching services, and professional achievements.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod validation
- **Email**: SendGrid integration
- **Analytics**: Google Analytics 4
- **Social**: YouTube Data API v3, Instagram/Threads API

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- SendGrid API key (for contact forms)
- YouTube API key (for content integration)
- Google Analytics Measurement ID (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ehicksonjr-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio

   # Email service
   SENDGRID_API_KEY=your_sendgrid_api_key

   # Social media APIs
   YOUTUBE_API_KEY=your_youtube_api_key
   YOUTUBE_CHANNEL_ID=your_channel_id
   THREADS_APP_ID=your_threads_app_id
   THREADS_APP_SECRET=your_threads_app_secret

   # Analytics (optional)
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. **Database setup**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Railway/Render

1. Connect your GitHub repository
2. Set up environment variables
3. Configure build command: `npm run build`
4. Configure start command: `npm start`

### Manual Server Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── data/           # Static data and content
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database interface
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and validation
└── package.json           # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run type-check` - Run TypeScript checks

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Performance**: Optimized with lazy loading and code splitting
- **SEO**: Meta tags, Open Graph, and semantic HTML
- **Contact Forms**: Secure form handling with email notifications
- **BJJ Booking**: Specialized booking system for martial arts lessons
- **Social Integration**: Automatic content fetching from YouTube and Instagram
- **Analytics**: Google Analytics 4 integration for insights

## 🔐 Security

- Input validation with Zod schemas
- SQL injection protection with Drizzle ORM
- CORS configuration
- Environment variable protection
- Secure session management

## 📞 Contact

- **Website**: [ehicksonjr.com](https://ehicksonjr.com)
- **Email**: e@ehicksonjr.com
- **LinkedIn**: [linkedin.com/in/ehicksonjr](https://linkedin.com/in/ehicksonjr)
- **GitHub**: [github.com/ehicksonjr](https://github.com/ehicksonjr)

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.