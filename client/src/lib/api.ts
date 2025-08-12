// GitHub Pages API configuration
// Since GitHub Pages only serves static files, we need to handle forms differently

export const isStaticDeployment = import.meta.env.VITE_STATIC_DEPLOYMENT === 'true';

// For static deployment, we'll use a service like Formspree or Netlify Forms
export const CONTACT_FORM_ACTION = isStaticDeployment 
  ? 'https://formspree.io/f/your-form-id' // Replace with your Formspree endpoint
  : '/api/contact';

export const BJJ_BOOKING_ACTION = isStaticDeployment
  ? 'https://formspree.io/f/your-bjj-form-id' // Replace with your Formspree endpoint  
  : '/api/bjj-booking';

// Static deployment helper function
export async function submitForm(action: string, data: FormData | object) {
  if (isStaticDeployment) {
    // Use fetch to submit to external service (Formspree, etc.)
    const response = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return response.json();
  } else {
    // Use existing API for full-stack deployment
    const response = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return response.json();
  }
}