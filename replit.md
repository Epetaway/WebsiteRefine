# Overview

This is a professional portfolio website for Earl Hickson Jr., a Senior Front-End Developer based in Parsippany, New Jersey. The application showcases case studies, blog posts, professional experience, and provides contact functionality. It also features a unique section for Brazilian Jiu-Jitsu lesson bookings at /EarldKaiju, reflecting Earl's expertise as a BJJ black belt. The site includes automatic content fetching from social media (@earld.kaiju Instagram and @earldkaiju YouTube) and is built with modern web technologies following accessibility standards (WCAG).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and component-based development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system using shadcn/ui components
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for the API server
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (using Neon serverless driver)
- **Session Storage**: In-memory storage for development, with PostgreSQL session store capability
- **API Design**: RESTful endpoints for contact forms and BJJ booking submissions

## Data Storage Solutions
- **Primary Database**: PostgreSQL with four main tables:
  - Users table for authentication (currently unused but available)
  - Contacts table for general contact form submissions
  - BJJ bookings table for lesson booking requests
  - Social media posts table for automatic content from Instagram and YouTube
- **In-Memory Storage**: Used for development with automatic content fetching and caching
- **Schema Management**: Drizzle Kit for database migrations and schema changes
- **Validation**: Zod schemas shared between client and server for consistent data validation

## Authentication and Authorization
- Basic user authentication schema is implemented but not currently active
- Session management infrastructure is in place using connect-pg-simple
- Current implementation focuses on form submissions without user authentication requirements

## Development and Build Process
- **Development**: Concurrent client and server development with hot reloading
- **Build**: Vite builds the client, esbuild bundles the server
- **Type Checking**: Shared TypeScript configuration across client, server, and shared modules
- **Code Organization**: Monorepo structure with clear separation of concerns

## Design System Integration
- shadcn/ui component library for consistent UI patterns
- Custom Tailwind configuration with design tokens
- Responsive design with mobile-first approach
- Dark mode support infrastructure (not currently activated)

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and migrations

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: React component library built on Radix UI primitives
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production server builds
- **React Query**: Server state management and caching

## External APIs and Services
- **SendGrid**: Email service integration for contact forms and notifications
- **Google Analytics**: Website analytics tracking with GDPR considerations
- **YouTube Data API v3**: Automatic content fetching from @earldkaiju channel
- **Threads API**: Instagram content integration for @earld.kaiju (App ID/Secret configured, requires OAuth access token)
- **Font Services**: Google Fonts for typography (Inter and JetBrains Mono)
- **Custom SVG Icons**: Modern icon system with proper play buttons and social media indicators

## Automatic Content System (Added August 2025)
- **YouTube Integration**: Fully functional, automatically fetches latest 7 videos every 5 minutes
- **Instagram Integration**: Threads API App ID/Secret configured, needs OAuth flow to get access token
- **Auto-refresh**: Content updates automatically without manual intervention
- **Responsive Gallery**: Beautiful grid layout with hover effects and proper play buttons
- **Error Handling**: Graceful fallbacks and status messages for each platform

## Hosting and Deployment
- **Replit**: Development and hosting platform with specific plugins and configurations
- **Static Assets**: Served through Express with proper caching headers

## Third-Party Libraries
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities
- **clsx & Tailwind Merge**: Utility for conditional CSS class names