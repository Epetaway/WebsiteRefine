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
- **PostgreSQL**: Production database with Drizzle ORM for type-safe operations
- **Drizzle Kit**: Database migrations and schema management

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: React component library built on Radix UI primitives
- **Radix UI**: Unstyled, accessible UI primitives for dialogs, forms, navigation
- **Lucide React**: Comprehensive icon library for UI elements

## Development Tools
- **Vite**: Modern build tool with hot module replacement
- **TypeScript**: Full-stack type safety across client, server, and shared modules
- **TanStack React Query**: Server state management with automatic caching and background updates
- **React Hook Form**: Form validation with Zod schema integration

## External APIs and Services
- **SendGrid**: Transactional email service for contact forms and BJJ booking notifications
- **YouTube Data API v3**: Automatic video content fetching from @earldkaiju channel (7 videos, 5-minute refresh)
- **Threads API**: Instagram content integration for @earld.kaiju (App ID/Secret configured, OAuth pending)
- **Google Analytics**: Website analytics with GDPR-compliant tracking
- **Google Fonts**: Inter and JetBrains Mono typography

## Production Features (Updated August 2025)
- **Automatic Content System**: YouTube integration fully operational, Instagram configured pending OAuth
- **Contact & Booking Forms**: Production-ready with email notifications and database persistence
- **Resume Download**: DOCX file serving with proper headers and caching
- **Social Media Gallery**: Responsive grid layout with hover effects and proper accessibility
- **Scroll-to-Top**: Automatic page scroll behavior on route navigation
- **SEO Optimization**: Complete meta tags, Open Graph, and semantic HTML structure

## Deployment & Hosting
- **Replit Deployments**: Primary hosting platform with automatic GitHub integration
- **GitHub Integration**: Version control with deployment pipeline
- **Environment Management**: Secure secrets handling for API keys and database credentials
- **Static Asset Optimization**: Express server with caching headers and compression

## Architecture Updates (August 2025)
- **Terminology Standardization**: Complete migration from "developer" to "engineer" throughout
- **Database Integration**: PostgreSQL production database with proper migrations
- **Form Validation**: Zod schemas shared between client and server for consistency
- **Error Handling**: Comprehensive error states and user feedback systems
- **Performance**: Optimized bundle size and loading times for production deployment