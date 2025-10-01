#!/bin/bash

# Netlify build script to inject environment variables
echo "🔧 Generating environment configuration..."

# Create env.js with actual environment variables
cat > env.js << EOF
// Environment configuration - Generated during build
window.TRAVEL_CONFIG = {
    ENABLE_LIMITED_VIEW: ${ENABLE_LIMITED_VIEW:-false},
    START_DATE_OVERRIDE: '${START_DATE_OVERRIDE:-2025-09-30}',
    DAYS_TO_SHOW: ${DAYS_TO_SHOW:-20},
    ENABLE_COMING_SOON: ${ENABLE_COMING_SOON:-false}
    // No TEST_DATE_OVERRIDE = uses actual current date for real-time progressive reveal
};

// Apply configuration
window.ENABLE_LIMITED_VIEW = window.TRAVEL_CONFIG.ENABLE_LIMITED_VIEW;
window.START_DATE_OVERRIDE = window.TRAVEL_CONFIG.START_DATE_OVERRIDE;
window.DAYS_TO_SHOW = window.TRAVEL_CONFIG.DAYS_TO_SHOW;
window.ENABLE_COMING_SOON = window.TRAVEL_CONFIG.ENABLE_COMING_SOON;
// No TEST_DATE_OVERRIDE = system uses actual current date

console.log('🔧 Environment loaded from Netlify (REAL-TIME):', window.TRAVEL_CONFIG);
console.log('📅 Using actual current date for progressive reveal');
EOF

echo "✅ Environment configuration generated:"
cat env.js

echo "🚀 Build complete!"