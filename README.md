# Earl Hickson Jr. - Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, and Express.js, featuring Brazilian Jiu-Jitsu lesson booking, social media integration, and professional case studies.

## 🚀 Features

- **Professional Portfolio**: Comprehensive showcase of front-end engineering work
- **BJJ Lesson Booking**: Custom booking system at `/earldkaiju` for private Brazilian Jiu-Jitsu lessons
- **Social Media Integration**: Automatic content fetching from YouTube (@earldkaiju) and Instagram (@earld.kaiju)
- **Contact Forms**: Professional contact form with email notifications via SendGrid
- **Resume Download**: Integrated DOCX resume download functionality
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Mobile-first approach with accessibility (WCAG) compliance
- **Performance Optimized**: Fast loading times with proper SEO meta tags

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **SendGrid** for email notifications

### External APIs
- **YouTube Data API v3** for video content
- **Threads API** for Instagram integration
- **Google Analytics** for website tracking

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- SendGrid API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# Email
SENDGRID_API_KEY=your_sendgrid_api_key

# Social Media APIs
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
THREADS_APP_ID=your_threads_app_id
THREADS_APP_SECRET=your_threads_app_secret

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── data/           # Static data files
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database interface
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema
└── scripts/               # Build and deployment scripts
```

## 🎯 Key Pages

- **Homepage** (`/`): Professional overview with tech stack and achievements
- **Case Studies** (`/case-studies`): Detailed project showcases with metrics
- **About** (`/about`): Personal background, skills, and BJJ connection
- **Blog** (`/blog`): Technical articles and insights
- **BJJ Lessons** (`/earldkaiju`): Private lesson booking with tournament record

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open database studio

## 🚀 Deployment

The project is configured for deployment on various platforms:

### Replit Deployments (Recommended)
1. Connect your GitHub repository to Replit
2. Set environment variables in Replit Secrets
3. Deploy directly from the Replit interface

### Other Platforms
- Ensure Node.js 18+ support
- Set up PostgreSQL database
- Configure environment variables
- Run `npm run build` for production build

## 📧 Contact

For questions about this portfolio or collaboration opportunities:

- **Email**: e@ehicksonjr.com
- **LinkedIn**: [Earl Hickson Jr.](https://linkedin.com/in/ehicksonjr)
- **GitHub**: [@ehicksonjr](https://github.com/ehicksonjr)

## 📄 License

This project is personal portfolio code. Please respect intellectual property and ask before using substantial portions.