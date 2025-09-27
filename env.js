// Environment configuration
// This file can be generated during Netlify build process
// or manually edited for testing

window.TRAVEL_CONFIG = {
    ENABLE_LIMITED_VIEW: true,  // Set to false to show all 50 destinations
    START_DATE_OVERRIDE: '2025-09-29',
    DAYS_TO_SHOW: 3
};

// Apply configuration
window.ENABLE_LIMITED_VIEW = window.TRAVEL_CONFIG.ENABLE_LIMITED_VIEW;
window.START_DATE_OVERRIDE = window.TRAVEL_CONFIG.START_DATE_OVERRIDE;
window.DAYS_TO_SHOW = window.TRAVEL_CONFIG.DAYS_TO_SHOW;

console.log('🔧 Environment loaded:', window.TRAVEL_CONFIG);