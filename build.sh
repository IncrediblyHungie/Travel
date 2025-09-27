#!/bin/bash

# Netlify build script to inject environment variables
echo "🔧 Generating environment configuration..."

# Create env.js with actual environment variables
cat > env.js << EOF
// Environment configuration - Generated during build
window.TRAVEL_CONFIG = {
    ENABLE_LIMITED_VIEW: ${ENABLE_LIMITED_VIEW:-true},
    START_DATE_OVERRIDE: '${START_DATE_OVERRIDE:-2025-09-29}',
    DAYS_TO_SHOW: ${DAYS_TO_SHOW:-3}
};

// Apply configuration
window.ENABLE_LIMITED_VIEW = window.TRAVEL_CONFIG.ENABLE_LIMITED_VIEW;
window.START_DATE_OVERRIDE = window.TRAVEL_CONFIG.START_DATE_OVERRIDE;
window.DAYS_TO_SHOW = window.TRAVEL_CONFIG.DAYS_TO_SHOW;

console.log('🔧 Environment loaded from Netlify:', window.TRAVEL_CONFIG);
EOF

echo "✅ Environment configuration generated:"
cat env.js

echo "🚀 Build complete!"