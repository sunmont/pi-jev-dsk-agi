# 🧠 Pi-JEV-DSK Enterprise AGI Agentic Architecture

A production-grade boilerplate and control center for next-generation AGI agents powered by real enterprise AI primitives:
* **`@deepseek-ai/cordis`** for modular dependency injection and service containerization.
* **`@earendil-works/pi-ai`**, **`pi-agent-core`**, and **`pi-coding-agent`** for autonomous Pi agent reasoning and coding workflows.
* **`@typesafe-ai/jev`** for strict type-safe Just-in-Time evaluation and vector memory retrieval.
* **Deep State Kernel (DSK)** for multi-stage reasoning, planning, and verification loops.
* **Nuxt.js 3 / Vue 3** for an interactive real-time control center UI.

---

## 🏛️ Architecture Overview

```
 ┌────────────────────────────────────────────────────────┐
 │                 Nuxt.js 3 / Vue 3 UI                   │
 │               (AGI Control Center & Trace)             │
 └───────────────────────────┬────────────────────────────┘
                             │ REST / JSON
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │            TypeScript Cordis Service Container         │
 │                                                        │
 │  ┌─────────────────┐   ┌─────────────────┐             │
 │  │ Pi Coding Agent │◄──┤ JEV Runtime     │             │
 │  │ (@earendil-works│   │ (@typesafe-ai/  │             │
 │  │  pi-coding-agent│   │  jev)           │             │
 │  └────────┬────────┘   └────────┬────────┘             │
 │           │                     │                      │
 │           └──────────┐          │                      │
 │                      ▼          ▼                      │
 │                ┌───────────────────────┐               │
 │                │  DSK Reasoning Kernel │               │
 │                │ (Perception ➔ Verify) │               │
 │                └───────────────────────┘               │
 └────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```tree
├── backend/            # TypeScript Express backend (Cordis, Pi, JEV, DSK)
│   ├── src/
│   │   ├── app-container.ts   # Cordis service container
│   │   ├── dsk-kernel.ts      # DSK reasoning loop
│   │   ├── jev-engine.ts      # @typesafe-ai/jev runtime
│   │   ├── pi-router.ts       # @earendil-works Pi coding agent
│   │   ├── services.ts        # Cordis type definitions
│   │   └── index.ts           # Express server bootstrap
│   ├── package.json
│   └── tsconfig.json
├── frontend/           # Nuxt.js 3 / Vue 3 Control Center UI
│   ├── app.vue
│   ├── nuxt.config.ts
│   └── package.json
├── shared/             # Shared TypeScript types
│   └── types.ts
├── package.json        # Root workspace configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [pnpm](https://pnpm.io/)

### Installation
Clone the repository and install dependencies across the monorepo workspace:
```bash
git clone https://github.com/your-username/pi-jev-dsk-agi.git
cd pi-jev-dsk-agi
pnpm install
```

### Running Locally

1. **Start the Backend (Port 3001):**
   ```bash
   cd backend
   pnpm dev
   ```

2. **Start the Frontend UI (Port 3000):**
   Open a separate terminal tab:
   ```bash
   cd frontend
   pnpm dev
   ```

3. **Explore:**
   Open `http://localhost:3000` in your browser to submit AGI goals and inspect real-time DSK reasoning traces powered by Cordis, Pi agents, and JEV.

---

## 🛡️ License
MIT License
