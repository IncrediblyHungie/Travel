# Travel Website Developer Guide

## 🏗️ Project Architecture

### Core Files Structure
```
Travel/
├── index.html              # Main page structure
├── script.js              # All application logic (destinations, map, progressive reveal)
├── styles.css             # All styling and animations
├── env.js                 # Environment configuration (local/testing)
├── build.sh               # Netlify build script (generates env.js from env vars)
├── netlify.toml           # Netlify deployment configuration
├── PRODUCTION_NOTES.md    # Current production status and timeline
└── test-*.html            # Test files for feature validation
```

### Key Systems

#### 1. Progressive Reveal System
- **Location**: `script.js` lines ~600-700 (in `getJourneyStartDate()` and filtering logic)
- **Purpose**: Shows limited destinations based on current date, growing by 1 per day
- **Key Variables**:
  - `START_DATE_OVERRIDE`: Journey start date (e.g., "2025-09-30")
  - `ENABLE_LIMITED_VIEW`: true/false to enable/disable progressive reveal
  - `DAYS_TO_SHOW`: Maximum days to show (safety limit)
  - `ENABLE_COMING_SOON`: true/false for mystery cards

#### 2. Destinations Data
- **Location**: `script.js` lines ~60-580 (massive `destinations` array)
- **Structure**: Each destination has `id`, `state`, `name`, `coordinates`, `visitDate`, etc.
- **Critical**: `visitDate` field controls what date appears on cards

#### 3. Environment Management
- **Local Development**: Edit `env.js` directly
- **Netlify Production**: Environment variables → `build.sh` → generates `env.js`
- **Override Hierarchy**: Netlify env vars > `build.sh` defaults > `env.js` fallbacks

## 🔧 Common Modification Patterns

### 📅 Changing Journey Start Date (Complete Process)

**Problem**: User sees wrong start date on destination cards

**Root Cause**: Must update BOTH the progressive reveal logic AND the actual destination visit dates

**Solution Steps**:

1. **Update Environment Configuration** (3 files):
   ```bash
   # env.js - for local testing
   START_DATE_OVERRIDE: '2025-09-30'

   # build.sh - default fallback
   START_DATE_OVERRIDE: '${START_DATE_OVERRIDE:-2025-09-30}'

   # netlify.toml - Netlify environment
   START_DATE_OVERRIDE = "2025-09-30"
   ```

2. **Update Netlify Dashboard**:
   - Go to Site settings → Environment variables
   - Update `START_DATE_OVERRIDE` to new date
   - Trigger new deployment

3. **Update Destination Visit Dates** (script.js):
   ```javascript
   // Find first destination (Maine)
   visitDate: "September 30, 2025",  // Was September 29

   // Shift ALL subsequent dates by same amount
   // Use find/replace with careful verification
   ```

4. **Update Documentation**:
   - `PRODUCTION_NOTES.md` timeline
   - Test files (`test-*.html`)
   - This guide if needed

**Testing**: Check locally with `env.js`, then verify Netlify deployment shows correct dates

### 🗺️ Adding New Destinations

**Location**: `script.js` destinations array (~lines 60-580)

**Template**:
```javascript
{
    id: 51,  // Increment from last
    state: "State Name",
    name: "Location Name",
    address: "Full address for geocoding",
    coordinates: [-longitude, latitude],  // Note: lng first, lat second
    driveTime: "Xh Ymin",
    hikeTime: "Xh Ymin",
    visitDate: "Month DD, YYYY",
    description: "Compelling description for card"
},
```

**Important**:
- Coordinates are `[longitude, latitude]` (opposite of typical lat/lng)
- `id` must be unique and sequential
- `visitDate` must follow exact format: "Month DD, YYYY"
- Address used for geocoding fallbacks

### 🎨 Styling Changes

**Location**: `styles.css`

**Key Sections**:
- `.destination-card`: Individual destination styling
- `.coming-soon-card`: Mystery destination styling
- `.mapboxgl-popup`: Map popup styling
- `.aurora-bg`: Background animations
- `@media queries`: Responsive behavior

**Common Modifications**:
```css
/* Change card colors */
.destination-card { background: linear-gradient(...); }

/* Adjust mystery card contrast */
.coming-soon-card .card-content { color: white !important; }

/* Modify animations */
@keyframes mysteryGlow { ... }
```

### 📱 Carousel/Responsive Behavior

**Location**: `script.js` lines ~800-900 (Swiper configuration)

**Key Settings**:
```javascript
// Responsive breakpoints
breakpoints: {
    768: { slidesPerView: 2 },    // Tablet
    1024: { slidesPerView: 3 },   // Desktop
    1400: { slidesPerView: 4 }    // Large desktop
}
```

**iPad Specific Fix**:
- Problem: 4th card not scrollable on iPad
- Solution: Dynamic `cardsToShow` logic in `getDimensions()`

## 🚀 Deployment Process

### Netlify Environment Variables
**Required Variables**:
```
ENABLE_LIMITED_VIEW = "true"
START_DATE_OVERRIDE = "2025-09-30"
DAYS_TO_SHOW = "20"
ENABLE_COMING_SOON = "true"
```

### Build Process Flow
1. Netlify triggers `build.sh`
2. `build.sh` reads environment variables
3. Generates `env.js` with actual values
4. Site uses generated `env.js` for configuration

### Cache Busting
- `index.html` includes: `<script src="env.js?v=20250928-realtime"></script>`
- Update version string when environment changes
- Forces browser to reload new configuration

## 🧪 Testing Strategy

### Local Testing Files
- `test-coming-soon.html`: Progressive reveal logic
- `test-mystery-coordinates.html`: Mystery marker positioning
- `test-sept30.html`: Date progression validation

### Test Date Simulation
```javascript
// In env.js for local testing
TEST_DATE_OVERRIDE: '2025-10-05'  // Simulate future date
```

### Validation Checklist
- [ ] Correct number of destinations show for current date
- [ ] Mystery cards appear when expected
- [ ] Destination dates match timeline
- [ ] Map markers position correctly
- [ ] Responsive behavior works on all devices
- [ ] Console shows no errors

## 🐛 Troubleshooting

### Common Issues

#### "Not seeing changes on Netlify"
**Cause**: Netlify env vars override code changes
**Solution**: Update Netlify dashboard environment variables + redeploy

#### "Wrong dates showing on cards"
**Cause**: `visitDate` in destinations array doesn't match `START_DATE_OVERRIDE`
**Solution**: Update both environment config AND destination visit dates

#### "Mystery card in wrong location"
**Cause**: Mystery coordinates using default fallback instead of next destination
**Solution**: Verify `createComingSoonDestination()` offset logic

#### "Cards not scrollable on iPad"
**Cause**: Swiper breakpoints not accounting for 4+ cards
**Solution**: Adjust `getDimensions()` logic for tablet detection

#### "Progressive reveal not working"
**Cause**: Usually environment variable mismatch
**Solution**: Check browser console for actual config values

### Debug Commands
```javascript
// In browser console
console.log('Config:', window.TRAVEL_CONFIG);
console.log('Journey start:', getJourneyStartDate());
console.log('Days since start:', Math.floor((new Date() - getJourneyStartDate()) / (1000 * 60 * 60 * 24)));
```

## 🔄 Version Control Best Practices

### Branch Strategy
- `main`: Production-ready code
- `coming-soon`: Feature development branch
- `backup*`: Safety branches for major changes

### Commit Messages
```bash
git commit -m "$(cat <<'EOF'
Brief description of change

- Bullet point of specific changes
- Another specific change
- Technical details if complex

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Force Push Protocol
- Only force push to feature branches, never `main`
- Always verify branch name before force pushing
- Create backup branches for major refactors

## 🎯 Performance Considerations

### Key Optimizations
- Progressive image loading for destination cards
- Efficient DOM manipulation (avoid recreating elements)
- Debounced scroll/resize handlers
- Mapbox GL lazy loading

### Bundle Size
- Single `script.js` file keeps things simple
- Consider code splitting if file grows >500KB
- Optimize images before adding to destinations

## 🔮 Future Enhancement Ideas

### Potential Features
- **Admin Dashboard**: Override progressive reveal dates
- **Analytics Integration**: Track destination card clicks
- **Social Sharing**: Individual destination sharing
- **Offline Support**: PWA capabilities
- **Route Optimization**: Dynamic routing based on traffic

### Architecture Improvements
- **Config Management**: Centralized configuration system
- **Type Safety**: Convert to TypeScript
- **Testing**: Automated visual regression tests
- **CI/CD**: Automated deployment pipeline

---

## 📝 Change Log Template

When making modifications, add entries here:

### YYYY-MM-DD - Change Description
- **Files Modified**: List of files
- **Purpose**: Why the change was needed
- **Impact**: What behavior changed
- **Testing**: How it was validated
- **Notes**: Any gotchas or considerations

---

*Last Updated: 2025-09-28*
*Project Status: Production-ready progressive reveal system*