# 🧠 Pi-JEV-DSK AGI Agentic Architecture

A modern, production-grade boilerplate demonstrating an advanced AGI agent architecture integrating **Pi-calculus process channels**, **Just-in-Time Evaluation & Vector (JEV)** engines, and **Deep State Kernels (DSK)**, paired with an interactive **Nuxt.js 3 (Vue 3)** control center.

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
 │                TypeScript Backend Core                 │
 │                                                        │
 │  ┌─────────────────┐   ┌─────────────────┐             │
 │  │ Pi Router       │◄──┤ JEV Engine      │             │
 │  │ (Process Chans) │   │ (VM Sandbox &   │             │
 │  └────────┬────────┘   │  Vector Memory) │             │
 │           │            └────────┬────────┘             │
 │           └──────────┐          │                      │
 │                      ▼          ▼                      │
 │                ┌───────────────────────┐               │
 │                │  DSK Reasoning Kernel │               │
 │                │ (Perception ➔ Verify) │               │
 │                └───────────────────────┘               │
 └────────────────────────────────────────────────────────┘
```

### 1. Pi Agents (`backend/src/pi-router.ts`)
* Inspired by $\pi$-calculus process calculi.
* Replaces rigid DAG pipelines with dynamic, mobile message channels where agents can subscribe, publish, and migrate across topologies on the fly.

### 2. JEV Engine (`backend/src/jev-engine.ts`)
* **Just-in-Time Evaluation:** Securely compiles and executes agent-generated logic inside isolated Node.js `vm` sandboxes.
* **Vector Memory:** Instant semantic retrieval and scoring for contextual grounding.

### 3. DSK Kernel (`backend/src/dsk-kernel.ts`)
* **Deep State Kernel:** The cognitive orchestrator enforcing a rigorous 4-stage reasoning loop:
  1. **Perception:** Ingesting and embedding objectives.
  2. **Reasoning:** Formulating task graphs.
  3. **Execution:** Running sandboxed workloads.
  4. **Verification:** Validating constraints and self-healing upon errors.

---

## 📁 Repository Structure

```tree
├── backend/            # TypeScript Express backend (Pi, JEV, DSK)
│   ├── src/
│   │   ├── dsk-kernel.ts
│   │   ├── jev-engine.ts
│   │   ├── index.ts
│   │   └── pi-router.ts
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
   Open `http://localhost:3000` in your browser to submit AGI goals and inspect real-time DSK reasoning traces.

---

## 🛡️ License
MIT License
