# Form Integration Setup

## Forms Included

### 1. BJJ Booking Form (`/earldkaiju`)
- **Endpoint**: `https://formspree.io/f/xdknqgka`
- **Purpose**: Private Brazilian Jiu-Jitsu lesson bookings
- **Fields**: Name, email, phone, experience level, goals, availability
- **Features**: Form validation, success/error states, tournament record display

### 2. Contact Form (`/contact`)
- **Endpoint**: `https://formspree.io/f/xpwagdqr`  
- **Purpose**: General inquiries and project discussions
- **Fields**: Name, email, subject, message
- **Features**: Professional contact page with service details

## Setup Instructions

### Option 1: Use Pre-configured Formspree (Recommended)
The forms are already configured with working Formspree endpoints that will:
- Send submissions to a designated email
- Provide spam protection
- Include form validation
- Handle success/error states

### Option 2: Replace with Your Own Formspree Account
1. **Sign up** at [formspree.io](https://formspree.io)
2. **Create two forms**:
   - BJJ Booking Form
   - Contact Form
3. **Replace endpoints** in the code:
   - Update `earldkaiju.jsx` line 19: Replace `xdknqgka` with your BJJ form ID
   - Update `ContactForm.jsx` line 15: Replace `xpwagdqr` with your contact form ID

### Option 3: Use Alternative Services
Replace the fetch URLs with other form services:
- **Netlify Forms**: For Netlify deployments
- **EmailJS**: Client-side email service
- **Custom Backend**: Your own API endpoints

## Form Features

### BJJ Booking Form
- Experience level dropdown (beginner to black belt)
- Training goals textarea
- Availability scheduling
- Tournament record display
- Professional booking interface

### Contact Form
- Subject line for organization
- Rich message area
- Professional service information
- Response time expectations
- Direct contact links

## Email Notifications

Forms will send emails with:
- All form field data
- Proper subject lines
- Reply-to addresses
- Spam protection
- Professional formatting

## Security & Validation

- Required field validation
- Email format validation
- XSS protection through proper sanitization
- Rate limiting via Formspree
- Honeypot spam protection

## Customization

### Styling
Forms use Tailwind CSS classes matching your site design:
- Dark mode support
- Focus states
- Hover effects
- Responsive design

### Functionality
- Loading states during submission
- Success confirmation messages
- Error handling with user-friendly messages
- Form reset after successful submission

Both forms are production-ready and will work immediately when deployed to GitHub Pages.