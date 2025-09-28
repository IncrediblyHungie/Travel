# Quick Reference Guide

## 🚨 Most Common Tasks

### Change Journey Start Date
1. **Netlify Dashboard**: Update `START_DATE_OVERRIDE` environment variable
2. **Code**: Update destination `visitDate` fields in `script.js`
3. **Deploy**: Trigger new Netlify deployment
4. **Files to check**: `env.js`, `build.sh`, `netlify.toml`, `PRODUCTION_NOTES.md`

### Add New Destination
1. **Location**: `script.js` destinations array (lines ~60-580)
2. **Template**:
   ```javascript
   {
       id: 51,
       state: "State Name",
       name: "Location Name",
       coordinates: [-longitude, latitude],
       visitDate: "Month DD, YYYY",
       description: "Description here"
   }
   ```

### Enable/Disable Progressive Reveal
- **Netlify**: Set `ENABLE_LIMITED_VIEW` to `"true"` or `"false"`
- **Local**: Edit `env.js` → `ENABLE_LIMITED_VIEW: false`

### Fix "Changes Not Showing on Netlify"
1. Check Netlify environment variables override code
2. Update environment variables in Netlify dashboard
3. Trigger new deployment
4. Clear browser cache

### Test Future Dates Locally
```javascript
// In env.js
TEST_DATE_OVERRIDE: '2025-10-15'  // Simulate October 15th
```

## 📁 File Quick Reference

| File | Purpose | When to Edit |
|------|---------|--------------|
| `script.js` | Main logic, destinations data | Add destinations, fix bugs |
| `env.js` | Local configuration | Local testing |
| `netlify.toml` | Netlify settings | Environment defaults |
| `build.sh` | Build process | Environment variable logic |
| `styles.css` | All styling | Visual changes |
| `index.html` | Page structure | Layout changes |

## 🔍 Debug Console Commands

```javascript
// Check configuration
console.log('Config:', window.TRAVEL_CONFIG);

// Check journey calculation
console.log('Journey start:', getJourneyStartDate());
console.log('Days since start:', Math.floor((new Date() - getJourneyStartDate()) / (1000 * 60 * 60 * 24)));

// Check destinations
console.log('Total destinations:', destinations.length);
console.log('First destination:', destinations[0]);
```

## 🚀 Emergency Fixes

### Site Broken After Changes
```bash
# Revert last commit
git reset --hard HEAD~1
git push --force origin main
```

### Progressive Reveal Not Working
1. Set `ENABLE_LIMITED_VIEW: false` in Netlify
2. Redeploy to show all destinations
3. Debug the date calculation logic

### Netlify Build Failing
1. Check `build.sh` syntax
2. Verify environment variables are strings: `"true"` not `true`
3. Check netlify.toml formatting

---

**For detailed explanations, see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)**