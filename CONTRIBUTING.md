# Contributing to Kenya Health Equity Map

Thank you for your interest in improving health equity data for Kenya. This project thrives on community contributions — whether you are a developer, a data scientist, a community health worker, or a health equity researcher.

## Ways to Contribute

### 1. Report an Unmapped Health Facility
If a clinic, dispensary, or health centre in your community is missing from the map:
1. Go to [OpenStreetMap](https://www.openstreetmap.org/note/new#map=6/0.5/38.0&layers=N)
2. Drop a pin at the facility location
3. Use the template: `Missing health facility: [name]. This facility serves the community but is not currently mapped.`
4. Submit — no account needed

### 2. Improve the Data
- Update facility lists in `scripts/etl/`
- Add or correct county boundary data
- Improve travel-time model parameters

### 3. Contribute Code
- Fix bugs or add features
- Improve the service worker for offline functionality
- Add new visualisations or comparison tools

### 4. Report Issues
Open a [GitHub Issue](https://github.com/geraldkombo/kenya-health-equity-map/issues) for:
- Data inaccuracies
- Map rendering bugs
- Feature requests
- Documentation gaps

## Development Setup

```bash
npm install
npm run etl        # Build indicator data
npm run build      # Static export to out/
npm run dev        # Local development server
```

## Code Guidelines

- Use TypeScript for all new code
- Follow the existing Tailwind CSS design system (exact hex colours, 4/8px spacing grid)
- Ensure WCAG AA contrast and `focus-visible` rings on all interactive elements
- No tracking, no cookies, no login — keep the platform privacy-preserving
- Run `npm run build` before submitting — it must pass with 0 errors

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add meaningful description'`)
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a Pull Request against the `master` branch

## Data Licence Notes

All data remains under its original licence (see README.md). By contributing code, you agree for it to be licensed under the MIT Licence.

---

*Every facility mapped, every data point corrected, and every line of code contributed makes Kenya's health inequities visible — and therefore actionable.*
