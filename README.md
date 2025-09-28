# 🗺️ Peter Skotte's 50-State Journey

A progressive reveal travel website showcasing a meticulously planned journey across all 50 United States, with real-time destination unlocking and interactive mapping.

## ✨ Features

- **Progressive Reveal**: Destinations unlock daily based on actual journey timeline
- **Interactive Map**: Mapbox GL with route visualization and custom markers
- **Coming Soon Cards**: Mystery destinations for unrevealed locations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-time Updates**: Automatic progression without manual intervention

## 🚀 Quick Start

### For Developers
1. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Common tasks and fixes
2. **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Complete architecture guide
3. **[PRODUCTION_NOTES.md](./PRODUCTION_NOTES.md)** - Current production status

### For Content Updates
- **Journey Start Date**: Update `START_DATE_OVERRIDE` in Netlify environment variables
- **Add Destinations**: Edit `destinations` array in `script.js`
- **Styling Changes**: Modify `styles.css`

## 📁 File Structure

```
├── index.html              # Main page
├── script.js              # Application logic + destinations data
├── styles.css             # All styling and animations
├── env.js                 # Local environment config
├── build.sh               # Netlify build script
├── netlify.toml           # Deployment configuration
├── DEVELOPER_GUIDE.md     # Complete documentation
├── QUICK_REFERENCE.md     # Common tasks reference
└── PRODUCTION_NOTES.md    # Production status and timeline
```

## 🌍 Current Status

- **Journey Start**: September 30, 2025
- **Current Mode**: Real-time progressive reveal
- **Destinations**: 50 states planned and mapped
- **Deployment**: Auto-deploy via Netlify

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Mapping**: Mapbox GL JS
- **Deployment**: Netlify
- **Environment**: Dynamic configuration via build process

## 📞 Support

For modifications or issues:
1. Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for immediate solutions
2. Consult [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed guidance
3. Review commit history for recent changes

---

*Built with ❤️ for Peter Skotte's epic 50-state adventure*