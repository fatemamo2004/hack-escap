const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

/**
 * Universal fetcher for Hack & Escape API
 * @param {string} endpoint - The API endpoint (e.g., '/sponsors')
 * @param {string} locale - 'en' or 'ar'
 */
export async function fetchData(endpoint, locale = 'en') {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    const data = await res.json();
    
    // If it's an array, map through it to simplify bilingual fields
    if (Array.isArray(data)) {
      return data.map(item => processBilingual(item, locale));
    }
    
    return processBilingual(data, locale);
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return null;
  }
}

/**
 * Helper to flatten bilingual fields based on current locale
 * @param {object} item 
 * @param {string} locale 
 */
function processBilingual(item, locale) {
  if (!item) return null;
  
  const processed = { ...item };
  
  // Recursively check for { en, ar } objects and flatten them
  Object.keys(processed).forEach(key => {
    if (processed[key] && typeof processed[key] === 'object' && processed[key].en && processed[key].ar) {
      processed[key] = processed[key][locale] || processed[key].en;
    }
  });
  
  return processed;
}
