# 🧪 Testing Progressive Reveal

## 📅 How It Works

**Progressive reveal** shows more destinations as days pass since journey start (Sept 29, 2025):

- **Before Sept 29**: Shows first 3 destinations
- **Sept 29** (journey start): Shows 3 destinations
- **Sept 30**: Shows 4 destinations
- **Oct 1**: Shows 5 destinations
- **And so on** until all 50 destinations are revealed

## 🔧 Quick Testing

### Test Limited View (Progressive Reveal)
Edit `env.js`:
```javascript
window.TRAVEL_CONFIG = {
    ENABLE_LIMITED_VIEW: true,  // Progressive reveal active
    START_DATE_OVERRIDE: '2025-09-29',
    DAYS_TO_SHOW: 3
};
```

### Test Full View (All 50 Destinations)
Edit `env.js`:
```javascript
window.TRAVEL_CONFIG = {
    ENABLE_LIMITED_VIEW: false,  // Show all 50 destinations
    START_DATE_OVERRIDE: '2025-09-29',
    DAYS_TO_SHOW: 3
};
```

### Test Different Dates
Change the start date to see different reveal states:
```javascript
window.TRAVEL_CONFIG = {
    ENABLE_LIMITED_VIEW: true,
    START_DATE_OVERRIDE: '2025-09-20', // 9 days before today
    DAYS_TO_SHOW: 3
};
// This would show 3 + 9 = 12 destinations
```

## 🌐 Netlify Environment Variables

Set these in your Netlify dashboard:

| Variable | Value | Effect |
|----------|-------|--------|
| `ENABLE_LIMITED_VIEW` | `true` | Progressive reveal |
| `ENABLE_LIMITED_VIEW` | `false` | Show all 50 destinations |
| `START_DATE_OVERRIDE` | `2025-09-29` | Journey start date |
| `DAYS_TO_SHOW` | `3` | (Not used in progressive mode) |

## 🔍 Debug Console

Check browser console for messages like:
- `🚀 Journey start day! Showing 3 destinations`
- `📈 Day X of journey - showing Y destinations`
- `🌍 Limited view disabled - showing all 50 destinations`