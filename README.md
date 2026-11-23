# Demo Projects Collection - Way2skills

A unified repository containing 7 demo web projects, organized into dedicated branches for independent development and multi-project deployment on Vercel.

---

## 🚀 Projects Overview & Live Deployments

All 7 projects are live and deployed on Vercel:

| # | Project Name | Git Branch | Live Production URL | Framework | Source Repo |
|---|--------------|------------|---------------------|-----------|-------------|
| 1 | **DittoPetCare** | [`dittopetcare`](https://github.com/Way2skills/Demo_Projects/tree/dittopetcare) | [https://dittopetcare-beige.vercel.app](https://dittopetcare-beige.vercel.app) | Next.js | [Dharani-ravikumar/DittoPetCare](https://github.com/Dharani-ravikumar/DittoPetCare) |
| 2 | **Crueze Timeline** | [`crueze-timeline`](https://github.com/Way2skills/Demo_Projects/tree/crueze-timeline) | [https://crueze-timeline.vercel.app](https://crueze-timeline.vercel.app) | Next.js | [harinivs4033-afk/crueze-timeline](https://github.com/harinivs4033-afk/crueze-timeline) |
| 3 | **Neolen Furniture** | [`neolen-furniture`](https://github.com/Way2skills/Demo_Projects/tree/neolen-furniture) | [https://neolen-furniture.vercel.app](https://neolen-furniture.vercel.app) | Next.js | [sowmiya0710s-rgb/neolen-furniture](https://github.com/sowmiya0710s-rgb/neolen-furniture) |
| 4 | **BabyHunt** | [`babyhunt`](https://github.com/Way2skills/Demo_Projects/tree/babyhunt) | [https://babyhunt.vercel.app](https://babyhunt.vercel.app) | Next.js | [NithyaBabukathiravan/BabyHunt](https://github.com/NithyaBabukathiravan/BabyHunt) |
| 5 | **Shinewood** | [`shinewood`](https://github.com/Way2skills/Demo_Projects/tree/shinewood) | [https://shinewood-xi.vercel.app](https://shinewood-xi.vercel.app) | Next.js | [NavaneethaSelvam/shinewood](https://github.com/NavaneethaSelvam/shinewood) |
| 6 | **Healthy New Lifestyle** | [`healthynewlifestyle`](https://github.com/Way2skills/Demo_Projects/tree/healthynewlifestyle) | [https://healthynewlifestyle.vercel.app](https://healthynewlifestyle.vercel.app) | Next.js | [NavaneethaSelvam/HealthyNewLifestyle](https://github.com/NavaneethaSelvam/HealthyNewLifestyle) |
| 7 | **Levy Fitness Center** | [`levyfitnesscenter`](https://github.com/Way2skills/Demo_Projects/tree/levyfitnesscenter) | [https://levyfitnesscenter.vercel.app](https://levyfitnesscenter.vercel.app) | Next.js | [NavaneethaSelvam/LevyFitnessCenter](https://github.com/NavaneethaSelvam/LevyFitnessCenter) |

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
npm run dev
```

---

## ⚡ How to Deploy Updates via Vercel CLI

To push changes and redeploy any branch to production:

```bash
git checkout <branch-name>
# make changes and commit
git push origin <branch-name>
vercel deploy --prod --yes --project <project-name>
```
