<div align="center">
  <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop" alt="Vice City Postcards Preview" width="100%" />

  <h1>🌴 Vice City Postcards 🏎️</h1>
  
  <p><strong>Build Your GTA Adventure with React Image Editor</strong></p>

  <p>
    An immersive, AAA-inspired web experience where users explore iconic fictional locations and design custom neon-drenched postcards using a deeply integrated Unlayer React Image Editor.
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#architecture">Architecture</a>
  </p>
</div>

---

## 🏆 Hackathon Project Overview
**Vice City Postcards** was built for the *Build With React Image Editor Challenge*. It transforms a standard image editor SDK into a cohesive, gamified creative studio. Instead of a generic "upload an image" flow, users embark on an adventure: exploring retro locations, drafting a message, and entering the "Vice Studio" where Unlayer's powerful SDK is leveraged to apply vintage filters, shapes, text, and stickers to generate a unique digital postcard.

## ✨ Features

- **🎮 Immersive Location Explorer:** Browse a curated list of GTA-inspired locations with Framer Motion animations and neon glassmorphism UI.
- **🤖 AI-Powered Text Injection:** Leverages the Unlayer AI Assistant to automatically convert your form input into editable text layers within the canvas.
- **🎨 Full Postcard Studio:** A tightly integrated `@unlayer/react-image-editor` environment customized with native stickers, retro filters, cropping, and freehand drawing.
- **💾 Local Persistence & Drafts:** Never lose your work. Drafts are safely cached in the browser, and exported masterpieces are permanently saved to your local Gallery.
- **🏅 Achievement System:** Gamified user progress. Earn badges like "First Adventure", "Postcard Master", and "Beach Lover" as you expand your collection.
- **📱 Fully Responsive:** The entire editor and gallery experience gracefully adapts from 4K desktop monitors down to mobile screens.

---

## 📸 Screenshots

| Landing Page | Explore Locations |
| :---: | :---: |
| *(Add your screenshot here)* | *(Add your screenshot here)* |
| **Editor Studio** | **Gallery & Achievements** |
| *(Add your screenshot here)* | *(Add your screenshot here)* |

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, React Confetti
- **State & Persistence:** Zustand (with LocalStorage Persist Middleware)
- **Editor SDK:** `@unlayer/react-image-editor`
- **Icons:** Lucide React

---

## 🏗 Architecture

The frontend follows a highly modular, feature-based architecture (`src/features/*`) ensuring maximum scalability:

- `src/features/landing`: Hero, feature showcase, and introductory sections.
- `src/features/locations`: Interactive location explorer and data schemas.
- `src/features/postcard`: The real-time postcard generator and metadata form.
- `src/features/editor`: The Unlayer React Image Editor wrapper, custom toolbars, draft logic, and the Studio Guide.
- `src/features/achievements`: Logic for calculating user statistics and unlocking gamified badges.
- `src/features/gallery`: Post-export grid rendering, search, and collection stats.

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vice-city-postcards.git
   cd "Vice City Postcards/frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   *(Update the project ID if you have a specific Unlayer API key for AI features).*

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🎯 Challenge Compliance

- ✅ **Original Concept:** A creative, narrative-driven use case rather than a generic photo upload utility.
- ✅ **React Image Editor Integration:** Used as the absolute core of the application in Phase 4 (Vice Studio), featuring AI layer generation and native tool utilization.
- ✅ **Visual Customization:** Users can deeply customize their postcards using Unlayer's filters, text, and stickers.
- ✅ **Open Source:** MIT Licensed and ready for public GitHub deployment.

---

## 🚀 Future Improvements

- **Cloud Synchronization:** Migrate from `localStorage` to a Postgres database via Prisma to sync collections across devices.
- **Custom Sticker API:** Expand the editor configuration to inject bespoke GTA-style SVG stickers using a premium Unlayer license.
- **Multiplayer Collaboration:** Allow users to co-edit a postcard in real-time.

---

<div align="center">
  <p><i>Welcome to Vice City. Your adventure awaits.</i></p>
</div>
