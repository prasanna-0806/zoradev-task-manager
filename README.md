# Mini Task Manager

A simple full-stack task manager built for the ZoraDev Full Stack Developer Intern selection task. Users can add, view, complete, and delete tasks. The frontend is React, the backend is Node.js + Express, and tasks are stored in memory on the server.

**Live Demo:** [Add your Vercel link here]
**Backend API:** [Add your Render link here]

## Tech Stack

- **Frontend:** React 18, plain CSS (pink/blue palette, no gradients)
- **Backend:** Node.js, Express, CORS
- **Storage:** In-memory JavaScript array (no database)

## Folder Structure

```
task-manager/
├── backend/                # Express REST API
│   ├── server.js           # API server with all endpoints
│   ├── package.json        # Backend dependencies
│   └── .gitignore
├── frontend/               # React app
│   ├── public/
│   │   └── index.html      # HTML entry point
│   ├── src/
│   │   ├── App.js          # Main component (fetches & manages tasks)
│   │   ├── App.css         # Styles for the task UI
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── .env.example        # Example env file (copy to .env)
│   ├── package.json        # Frontend dependencies
│   └── .gitignore
└── README.md               # You are here
```

## Run Locally

You'll need **Node.js 16+** and npm installed.

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
```

### 2. Start the backend

```bash
cd backend
npm install
npm start
```

The API will be running at `http://localhost:5000`. Test it with:

```bash
curl http://localhost:5000/tasks
```

### 3. Start the frontend (in a new terminal)

```bash
cd frontend
npm install
npm start
```

The React app will open at `http://localhost:3000`. It connects to the local backend by default.

### 4. Optional: configure the API URL

Copy `frontend/.env.example` to `frontend/.env` and set `REACT_APP_API_URL` if your backend runs somewhere other than `http://localhost:5000`.

```bash
cp frontend/.env.example frontend/.env
```

## API Endpoints

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | `/tasks`       | Returns all tasks          |
| POST   | `/tasks`       | Creates a new task         |
| DELETE | `/tasks/:id`   | Deletes a task by ID       |
| PATCH  | `/tasks/:id`   | Toggles completion (bonus) |

### Request/Response examples

**POST /tasks**

```json
// Request body
{ "title": "Buy groceries" }

// Response
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-04-28T10:30:00.000Z"
}
```

## Deployment

### Backend (Render)

1. Push the repo to GitHub.
2. On Render, create a new **Web Service** pointing to the repo.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Render assigns a public URL like `https://task-manager-api.onrender.com`.

### Frontend (Vercel)

1. On Vercel, import the same GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Add an environment variable:
   - `REACT_APP_API_URL` = your Render backend URL
4. Deploy. Vercel detects the React app automatically.

## Assumptions & Decisions

- **In-memory storage.** Tasks reset every time the backend restarts. The brief explicitly allows this, and adding a database would be over-engineering for the scope.
- **No authentication.** The brief said no login required, so the app is single-user.
- **Auto-incrementing integer IDs.** Simpler than UUIDs and easier to read in URLs. Fine for in-memory storage.
- **Task title only.** No descriptions, due dates, or categories. Kept the data model minimal so the full-stack integration is the focus.
- **Bonus toggle included.** Added a `PATCH /tasks/:id` endpoint and a checkbox in the UI to mark tasks complete/incomplete. Completed tasks get a strikethrough and a soft pink background.
- **Pink & blue palette, no gradients.** Solid colors only — pink (#ec4899) for primary actions, blue (#2563eb) for the heading and active task tiles, soft tints for backgrounds.
- **Fetch API over Axios.** Saves a dependency and is plenty for three endpoints.
- **Error handling.** Any failed API call shows a banner above the task list rather than crashing or silently failing.
- **CORS enabled for all origins.** Makes development across localhost ports and the deployed URL friction-free. In a production app I'd lock this down to the deployed frontend domain.

## What I'd add with more time

- Persist tasks to SQLite or a JSON file so they survive server restarts.
- Edit task title in place (currently you can only delete and re-add).
- Optimistic UI updates so the list feels instant on slow connections.
- Basic tests with Jest + Supertest for the API.

---

Built by Mahesh for the ZoraDev Full Stack Developer Intern selection task.
