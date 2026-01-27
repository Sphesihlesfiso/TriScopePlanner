# Tri Scope Planner

Tri Scope Planner is a modern scheduling web app that allows users to plan and organize tasks on a **daily, weekly, or monthly basis**. Users can set start and end times, add titles and descriptions, and seamlessly sync tasks with **Google Calendar** using the Google Calendar API.

Built with **React (Vite)**, **Shadcn/UI**, **Node.js (TypeScript)**, **Tailwind CSS**, and **PostgreSQL**, it provides a clean, responsive, and user-friendly experience.

---

## Features

- **Task Scheduling**
  - Add tasks with a **title**, **description**, **start time**, and **end time**.
  - Schedule tasks on a **daily, weekly, or monthly** basis.
- **Google Calendar Integration**
  - Sync tasks directly to Google Calendar.
  - View tasks alongside other calendar events.
- **Responsive UI**
  - Built with **Shadcn/UI** and **Tailwind CSS** for mobile-friendly, modern design.
- **Backend & Database**
  - Node.js + TypeScript backend handles authentication, tasks, and calendar integration.
  - PostgreSQL database stores user accounts and scheduled tasks.

---

## Tech Stack

| Frontend                                                                                                                | Backend                                                                                                                     | Database                                                                                                                  | APIs                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" width="20"/> React + Vite       | <img src="https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png" width="20"/> Node.js + TypeScript | <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" width="20"/> PostgreSQL | <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Google_Calendar_icon_%282020%29.svg" width="20"/> Google Calendar API |
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png" width="20"/> Tailwind CSS | <img src="https://raw.githubusercontent.com/github/explore/main/topics/express/express.png" width="20"/> Express            |                                                                                                                           |                                                                                                                                     |
| <img src="https://shadcn.dev/favicon.ico" width="20"/> Shadcn/UI                                                        |                                                                                                                             |                                                                                                                           |                                                                                                                                     |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL
- Google Cloud account for Calendar API credentials

### Installation

```bash
git clone https://github.com/yourusername/tri-scope-planner.git
cd tri-scope-planner
cd client
npm install
cd ../server
npm install
cd client
npm run dev
cd server
npm run dev

```
