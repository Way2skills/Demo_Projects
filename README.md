# Demo Projects Collection - Way2skills

A unified repository containing 7 demo web projects, organized into dedicated branches for independent development and multi-project deployment on platforms like Vercel.

---

## 🚀 Projects Overview

Each project lives on its own dedicated branch:

| # | Project Name | Target Branch | Description | Source Repo |
|---|--------------|---------------|-------------|-------------|
| 1 | **Crueze Timeline** | [`crueze-timeline`](https://github.com/Way2skills/Demo_Projects/tree/crueze-timeline) | Interactive Timeline Web Application | [harinivs4033-afk/crueze-timeline](https://github.com/harinivs4033-afk/crueze-timeline) |
| 2 | **Neolen Furniture** | [`neolen-furniture`](https://github.com/Way2skills/Demo_Projects/tree/neolen-furniture) | Modern E-Commerce / Showcase Furniture Website | [sowmiya0710s-rgb/neolen-furniture](https://github.com/sowmiya0710s-rgb/neolen-furniture) |
| 3 | **DittoPetCare** | [`dittopetcare`](https://github.com/Way2skills/Demo_Projects/tree/dittopetcare) | Responsive Pet Care Platform (Next.js, React, Tailwind CSS) | [Dharani-ravikumar/DittoPetCare](https://github.com/Dharani-ravikumar/DittoPetCare) |
| 4 | **BabyHunt** | [`babyhunt`](https://github.com/Way2skills/Demo_Projects/tree/babyhunt) | Baby Care & Products Web Application | [NithyaBabukathiravan/BabyHunt](https://github.com/NithyaBabukathiravan/BabyHunt) |
| 5 | **Shinewood** | [`shinewood`](https://github.com/Way2skills/Demo_Projects/tree/shinewood) | Premium Interior Design Website | [NavaneethaSelvam/shinewood](https://github.com/NavaneethaSelvam/shinewood) |
| 6 | **Healthy New Lifestyle** | [`healthynewlifestyle`](https://github.com/Way2skills/Demo_Projects/tree/healthynewlifestyle) | Organic Products E-Commerce Platform | [NavaneethaSelvam/HealthyNewLifestyle](https://github.com/NavaneethaSelvam/HealthyNewLifestyle) |
| 7 | **Levy Fitness Center** | [`levyfitnesscenter`](https://github.com/Way2skills/Demo_Projects/tree/levyfitnesscenter) | Premium Gym & Fitness Center Website with Google Apps Script | [NavaneethaSelvam/LevyFitnessCenter](https://github.com/NavaneethaSelvam/LevyFitnessCenter) |

---

## 🛠️ How to Switch Branches Locally

To work on or run any project locally:

```bash
# 1. Fetch all latest branches
git fetch --all

# 2. Switch to the desired project branch (e.g. dittopetcare)
git checkout dittopetcare

# 3. Install dependencies and start the dev server
npm install
npm run dev # or npm start
```

---

## 🌐 How to Deploy to Vercel (Branch-per-Project)

You can deploy all 7 projects as independent live websites using this single repository:

1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Click **Add New...** > **Project**.
3. Import `Way2skills/Demo_Projects`.
4. Under **Project Settings** > **Git** > **Production Branch**:
   - Change the Production Branch from `main` to the target branch (e.g., `crueze-timeline`).
5. Click **Deploy**.
6. Repeat the steps above for each project branch. Vercel will create a separate project with its own custom URL for each branch.
