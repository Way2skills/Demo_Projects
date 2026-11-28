# Demo Projects Collection - Way2skills

A unified repository containing demo web projects, organized into dedicated branches for independent development and multi-project deployment on Vercel.

---

## 🚀 Projects Overview & Deployments

| # | Project Name | Git Branch | Live URL | Framework | Source Repo |
|---|--------------|------------|----------|-----------|-------------|
| 1 | **DittoPetCare** | [`dittopetcare`](https://github.com/Way2skills/Demo_Projects/tree/dittopetcare) | 🔗 [dittopetcare-beige.vercel.app](https://dittopetcare-beige.vercel.app) | Next.js | [Dharani-ravikumar/DittoPetCare](https://github.com/Dharani-ravikumar/DittoPetCare) |
| 2 | **Crueze Timeline** | [`crueze-timeline`](https://github.com/Way2skills/Demo_Projects/tree/crueze-timeline) | 🔗 [crueze-timeline.vercel.app](https://crueze-timeline.vercel.app) | Next.js | [harinivs4033-afk/crueze-timeline](https://github.com/harinivs4033-afk/crueze-timeline) |
| 3 | **Neolen Furniture** | [`neolen-furniture`](https://github.com/Way2skills/Demo_Projects/tree/neolen-furniture) | 🔗 [neolen-furniture.vercel.app](https://neolen-furniture.vercel.app) | Next.js | [sowmiya0710s-rgb/neolen-furniture](https://github.com/sowmiya0710s-rgb/neolen-furniture) |
| 4 | **BabyHunt** | [`babyhunt`](https://github.com/Way2skills/Demo_Projects/tree/babyhunt) | 🔗 [babyhunt.vercel.app](https://babyhunt.vercel.app) | Next.js | [NithyaBabukathiravan/BabyHunt](https://github.com/NithyaBabukathiravan/BabyHunt) |
| 5 | **Shinewood** | [`shinewood`](https://github.com/Way2skills/Demo_Projects/tree/shinewood) | 🔗 [shinewood-xi.vercel.app](https://shinewood-xi.vercel.app) | Next.js | [NavaneethaSelvam/shinewood](https://github.com/NavaneethaSelvam/shinewood) |
| 6 | **Healthy New Lifestyle** | [`healthynewlifestyle`](https://github.com/Way2skills/Demo_Projects/tree/healthynewlifestyle) | 🔗 [healthynewlifestyle.vercel.app](https://healthynewlifestyle.vercel.app) | Next.js | [NavaneethaSelvam/HealthyNewLifestyle](https://github.com/NavaneethaSelvam/HealthyNewLifestyle) |
| 7 | **Levy Fitness Center** | [`levyfitnesscenter`](https://github.com/Way2skills/Demo_Projects/tree/levyfitnesscenter) | 🔗 [levyfitnesscenter.vercel.app](https://levyfitnesscenter.vercel.app) | Next.js | [NavaneethaSelvam/LevyFitnessCenter](https://github.com/NavaneethaSelvam/LevyFitnessCenter) |
| 8 | **Nool & Zari** | [`nool-and-zari`](https://github.com/Way2skills/Demo_Projects/tree/nool-and-zari) | 🔗 [nool-and-zari-sigma.vercel.app](https://nool-and-zari-sigma.vercel.app) | Next.js | [Nithesh783/nool-and-zari](https://github.com/Nithesh783/nool-and-zari) |
| 9 | **BIAA Beauty** | [`biaabeauty`](https://github.com/Way2skills/Demo_Projects/tree/biaabeauty) | 🔗 [biaabeauty-durozen.netlify.app](https://biaabeauty-durozen.netlify.app/) | Vite + React | [JeevakumaranS/BiaaBeauty](https://github.com/JeevakumaranS/BiaaBeauty) |
| 10 | **Decode Institution** | [`decode-institution`](https://github.com/Way2skills/Demo_Projects/tree/decode-institution) | 🔗 [decode-institution.vercel.app](https://decode-institution.vercel.app) | Vite + React | [manojkumarsr30-code/Decode_Institution](https://github.com/manojkumarsr30-code/Decode_Institution) |
| 11 | **Tile Showroom** | [`tile-showroom`](https://github.com/Way2skills/Demo_Projects/tree/tile-showroom) | 🔗 [tile-showroom-livid.vercel.app](https://tile-showroom-livid.vercel.app) | Next.js | [manojkumarsr30-code/Tile-Showroom](https://github.com/manojkumarsr30-code/Tile-Showroom) |

---

## 🛠️ How to Switch Branches Locally

To work on or run any project locally:

```bash
# 1. Fetch all latest branches
git fetch --all

# 2. Switch to the desired project branch (e.g. tile-showroom)
git checkout tile-showroom

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
