# GitHub Profile Clone — UptimeAI Frontend Assignment

A pixel-accurate, responsive clone of GitHub's User Profile page for **Shreeram Kushwaha** (`@shreeramk`, Director of Engineering @ UptimeAI) built with **React**, **Vite**, **Vanilla CSS**, **Lucide Icons**, and **Recharts**.

---

## 🚀 Live Demo & Features

### 1. Top Navigation Bar (`Header.jsx`)
- Authentic GitHub branding with Octocat SVG logo and active user badge.
- Interactive search bar with keyboard shortcut prompt (`Type / to search`).
- Global action icons: Create (`+`), Pull Requests, Issues, Codespaces, and Notifications with unread badge indicator.
- User profile menu button with avatar and dropdown caret.
- Fully responsive layout for desktop, laptop, tablet, and mobile viewport widths.

### 2. Profile Sidebar (`ProfileSidebar.jsx`)
- Circular large profile avatar with interactive status emoji badge (`🎯 Focusing on AI-driven plant diagnostics`).
- Dynamic full name (*Shreeram Kushwaha*), username (*shreeramk*), and pronouns (*he/him*).
- Multi-line engineering bio highlighting core tech stack (Python, Angular, JavaScript, NodeJS, MongoDB, Influx DB, TimescaleDB, Kafka, AWS, Azure, HTML5, CSS).
- Interactive **"Edit profile"** button with inline editable profile form (name, bio, company, location).
- Followers (`13 followers`) and Following (`3 following`) stats with user icons.
- Company (*UptimeAI*), location (*Bangalore, India*), email (*shreeram@uptimeai.com* with one-click copy), website (*https://shreeram.si*), and social handle (*@pom_fret*).
- **Achievements section** displaying badge credentials: *Pull Shark (x2)*, *Arctic Code Vault Contributor*, *Quickdraw*, and *Pair Extraordinaire* with tooltips.
- **Organizations section** displaying company avatar badge.

### 3. Profile Navigation Tabs (`ProfileTabs.jsx`)
- Five authentic GitHub profile tabs:
  - 📖 **Overview** (default dashboard with popular repos, contribution heatmap, activity overview, and timeline)
  - 📁 **Repositories** (with dynamic count badge `8`, search filter, language filter, and sort options)
  - 📋 **Projects** (interactive empty state with GitHub Projects guide link)
  - 📦 **Packages** (interactive empty state with Package Registry guide link)
  - ⭐ **Stars** (curated starred repositories view)
- Selected tab highlighted with GitHub's signature coral/orange underline (`#fd8c73`).
- Client-side tab switching without page reload.

### 4. Popular Repositories Section (`RepositoryGrid.jsx` & `RepositoryCard.jsx`)
- 2-column desktop grid (collapsing to single column on mobile) showing 6 pinned repositories:
  - `TitaniumAS.Opc.Client` (C#)
  - `node-opcua-1` (TypeScript)
  - `kafkajs` (JavaScript)
  - `node-opcua-logger` (JavaScript)
  - `Catch2` (C++)
  - `Complete-Python-3-Bootcamp` (Python / Jupyter Notebook)
- Dynamic language dot color indicators according to GitHub language definitions.
- Visibility pills (`Public`), star counts, fork counts, and links directly to GitHub repositories.

### 5. Contribution Heatmap (`ContributionHeatmap.jsx`)
- Full 52-week calendar matrix with green contribution cells (levels 0 through 4).
- Months across the top (`Jan` through `Dec`) and weekday indicators (`Mon`, `Wed`, `Fri`) on the left.
- Total contributions counter for the selected period (`1,617 contributions in 2026`).
- Interactive year selector on the right (`2026`, `2025`, `2024`, `2023`, `2022`, `2021`, etc.).
- Floating hover tooltips showing date and exact contribution counts.
- `Less` to `More` color legend.
- Horizontally scrollable container with customized scrollbar for mobile/tablet screens.
- Connected to public contribution endpoint with graceful local mock data fallback.

### 6. Activity Overview (`ActivityOverview.jsx`)
- Breakdown of contributions across categories:
  - Commits (74%)
  - Pull requests (14%)
  - Code review (7%)
  - Issues (5%)
- Visual category progress bars with percentage indicators.
- Interactive Donut chart visualization using **Recharts** with hover tooltips.

### 7. Contribution Timeline (`ContributionTimeline.jsx`)
- Monthly activity timeline blocks (*October 2026*, *September 2026*).
- Distinct event icons (commits created, pull requests opened, repositories created).
- Working **"Show more activity"** button that dynamically expands earlier months (*August 2026*, *July 2026*).

### 8. Footer (`Footer.jsx`)
- GitHub logo, copyright year, and standard legal/platform navigation links.

---

## 🛠️ Technology Stack
- **Framework:** React 19 + Vite
- **Language:** JavaScript & JSX
- **Styling:** Custom Vanilla CSS with comprehensive CSS variables (no generic CSS framework)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Networking:** Native Fetch API with structured service layer

---

## 📦 Project Structure

```
uptimeai-assignment/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProfileSidebar.jsx
│   │   ├── ProfileTabs.jsx
│   │   ├── RepositoryGrid.jsx
│   │   ├── RepositoryCard.jsx
│   │   ├── ContributionHeatmap.jsx
│   │   ├── ActivityOverview.jsx
│   │   ├── ContributionTimeline.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingState.jsx
│   │   └── ErrorState.jsx
│   ├── data/
│   │   ├── mockProfile.js
│   │   ├── mockRepositories.js
│   │   ├── mockContributions.js
│   │   └── mockActivity.js
│   └── services/
│       ├── githubApi.js
│       └── contributionApi.js
└── README.md
```

---

## ⚙️ Installation & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables (Optional)

By default, the application connects to GitHub's public REST API (`https://api.github.com/users/shreeramk`) and public contribution calendar endpoints without requiring any credentials.

If you encounter GitHub's anonymous IP rate limiting (60 requests/hour) or wish to query authenticated endpoints, you can optionally create a `.env` file in the project root:

```env
VITE_GITHUB_TOKEN=your_personal_access_token_here
```

> **Security Note:** Never commit personal access tokens to public version control. The client gracefully handles rate limits and provides separated fallback data automatically.

---

## 📊 Summary of Implemented Features & API Considerations

| Feature | Data Source | Behavior & Fallback |
|---|---|---|
| User Profile | `https://api.github.com/users/shreeramk` | Dynamic fetch; auto-falls back to rich mock data if rate-limited (403/429) |
| Repositories | `https://api.github.com/users/shreeramk/repos` | Displays 6 popular repos with language dot colors, stars, and forks |
| Contribution Calendar | `https://github-contributions-api.jogruber.de/v4/shreeramk` | Real calendar data by year; realistic procedural fallback if offline |
| Activity Breakdown | Mock Activity Data | Visualized via Recharts PieChart and progress bars |
| Activity Timeline | Mock Activity Data | Interactive timeline with working "Show more activity" expander |
| Repositories Tab | Filtered repo list | Working live text search, language filter, and sort options |
| Profile Edit | React state | Interactive form allowing user to edit name, bio, company, location |
