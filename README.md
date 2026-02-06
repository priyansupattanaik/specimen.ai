# Specimen AI - Immersive Character Archive

**Specimen AI** is a high-fidelity, immersive web application that simulates a classified "archive" of super-powered beings. It combines cinematic UI design with real-time AI interactions, allowing users to "interview" captured specimens ranging from Spider-Man to Doctor Doom.

This project focuses on **visual storytelling**, **security hardening**, and **responsive immersive design**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4) + Custom CSS Variables
- **Animations**: Framer Motion
- **AI Integration**: Groq SDK (Llama 3 / Mixtral models)
- **Icons**: Lucide React

---

## 🚀 Key Features

### 1. Cinematic "Infinite Stream" UI
- A physics-based, infinite-scrolling carousel of "Specimen Files".
- **Responsive Design**: Carefully tuned for both desktop (immersive wide view) and mobile (vertical stack).
- **Reduced Overlap**: Custom layout logic prevents UI elements (like the Hero cards) from clashing with the header or navigation.

### 2. Secure "Sentinel" Chat System
- **Server-Side Prompt Injection**: Character personalities ("System Prompts") are stored **exclusively on the server**. A user cannot "inspect element" to steal the prompt engineering.
- **Client-Side Stripping**: The extensive `personas.ts` data sent to the browser contains *only* public metadata (names, stats). Sensitive instructions are removed.
- **Variant System**: Supports alternate timelines (e.g., "Spider-Man Noir", "President Loki"). Switching variants instantly injects a server-side instruction to the AI to pivot personalities.

### 3. Immersive Details
- **Dynamic Assets**: Halftone patterns, noise overlays, and "torn paper" edges create a tactile "classified file" aesthetic.
- **Priority Loading**: Initial assets are eager-loaded to prevent layout shift or empty placeholders.
- **Audio/Visual Feedback**: (Planned) Interfaces react to "Containment Breaches" (high aggression stats).

---

## 🛠️ Getting Started (Local Development)

Since you cannot run this on GitHub Pages, here is how to run it locally on your machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/priyansupattanaik/specimen.ai.git
    cd specimen.ai
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your Groq API key:
    ```env
    GROQ_API_KEY=your_api_key_here
    ```

4.  **Run the Server**:
    ```bash
    npm run dev
    ```

5.  **Open the App**:
    Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

- `src/app`: Next.js App Router pages and API endpoints.
- `src/components`: UI components (Cards, Chat Interface, Effects).
- `src/data`:
    - `specimens.ts`: Public character data (IDs, Names, Images).
    - `personas.ts`: Client-safe character metadata (Stats, Initials).
    - `server-prompts.ts`: **[SERVER ONLY]** Sensitive system instructions.
- `src/lib`: AI client utilities and history management.

---

*Classified material. For authorized personnel only.*
