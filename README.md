# GreedPeaceX: Investigative Journalism Platform

## Project Overview

GreedPeaceX (GPX) is a digital investigative justice platform. Its mission is to expose corporate corruption and track company ethics via the Greed Index, providing tools for public accountability and action.

The site is built as a **Single-Page Application (SPA)** focused on delivering content quickly and efficiently, adopting a clean, journalistic aesthetic inspired by sites like The Bureau of Investigative Journalism.

## Tech Stack & Architecture

| Component | Technology | Role & Notes |
| :--- | :--- | :--- |
| **Frontend** | **React** (Vite) | Core UI and SPA management. |
| **Styling** | **Tailwind CSS** | Utility-first framework for rapid, consistent styling. |
| **Routing** | **React Router DOM** | Handles clean, shareable URLs (e.g., `/about`, `/report/:slug`). |
| **Backend/Database** | **Supabase** | Backend-as-a-Service (BaaS) for Postgres database, authentication, and serverless functions. |
| **Algorithm/Forms** | **Supabase Edge Functions (Deno/TS)** | Securely handles the Greed Index calculation (`updateGreedIndex`) and all user form submissions (`submitForm`). |
| **Version Control** | **GitHub** | Source code repository. Local development syncs with the `main` branch. |

-----

## Development & Deployment Workflow

This outlines the standard workflow for maintaining and launching the project.

### 1\. Local Development (`localhost`)

The project uses Vite for a fast local development environment.

| Command | Purpose |
| :--- | :--- |
| `npm install` | Installs all necessary dependencies (runs after cloning a fresh repo). |
| `npm run dev` | Starts the local server, typically on `http://localhost:5173`. |

### 2\. Database Synchronization

The project relies on two main Edge Functions:

| Function | Purpose |
| :--- | :--- |
| **`updateGreedIndex`** | **CRON JOB** (Scheduled). Calculates the latest Greed Score for all targets and writes results to the `greed_daily_scores` table. |
| **`submitForm`** | **FORM HANDLER.** Securely receives all form data (Signups, Petitions, Contacts) from the front-end and writes it to the `form_submissions` table. |

**To deploy or update a function:**

1.  Make local edits in `supabase/functions/[function_name]/index.ts`.
2.  Run the deployment command from the project root:
    ```bash
    supabase functions deploy [function_name] --no-verify-jwt
    ```

### 3\. Launch & Deployment

The current live version is hosted via a continuous deployment (CD) service (Netlify/Vercel) linked to the GitHub `main` branch.

**To deploy new changes:**

1.  Commit all changes locally.
2.  Push to GitHub (`git push`).
3.  The hosting platform will automatically build and deploy the new version.

-----

## Core Site Structure & Components

The site uses a state-based routing system built on React Router DOM, with a universal `<Layout>` handling the menu and footer.

| URL Route | State/Path | Component | Key Feature/Notes |
| :--- | :--- | :--- | :--- |
| `/` | `/` | `HomePage` | Centralized, max-width layout. Features the latest Report link and quick links to investigations. |
| `/about` | `/about` | `AboutPage` | Static informational page. Sections link to `/support` and `/action`. |
| `/support` | `/support` | `SupportMissionPage` | Features modals for sign-ups and link placeholders for Stripe donations. |
| `/action` | `/action` | `ActionCampaignsPage` | Features petition modals and a share modal. |
| `/contact` | `/contact` | `ContactPage` | Features complex modals for media, whistleblowers, and volunteers. |
| `/index` | `/index` | `GreedIndexPage` | Full-width table displaying scores from the Supabase `greed_daily_scores` table. |
| `/report/:slug` | Dynamic | `ReportPage` | Template for displaying investigative reports. |

### Data Flow & Security (RLS)

  * All form submissions go to the **`form_submissions`** table via the **`submitForm`** Edge Function.
  * **Important:** The RLS policy for `form_submissions` must allow anonymous users to INSERT data for the forms to function.

-----

This document provides a clean, comprehensive overview of the entire project. You can now use this information to update your `README.md` and keep it safe in your notes for any future handoff. Congratulations on preparing your project for launch\!
