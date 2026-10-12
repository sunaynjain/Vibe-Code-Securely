# Vibe Coded — Security Lab

> **Interactive Cybersecurity Demonstration & Educational Lab**  
> *"AI can write the code. You still have to own the security."*

---

## 1. Overview

**Vibe Coded — Security Lab** is an interactive, simulation-based cybersecurity demonstration platform designed for software engineers, security researchers, and students. It tells the story of an AI-generated student feedback application (**Feedbackly**) that works reliably on the surface, but harbors four severe, real-world security vulnerabilities in its code:

1. **SQL Injection (Database Manipulation)**
2. **Stored Cross-Site Scripting (Browser Execution)**
3. **Exposed Secrets (Client Bundle Leaks)**
4. **Broken Authorization (Insecure Direct Object References)**

Through a high-contrast **Vercel-style Monochrome × Swiss Brutalist** interface, users step through each vulnerability, inspect the flawed lines of code, compare vulnerable versus hardened implementations in a real-time diff viewer, apply secure fixes, execute automated verification test harnesses, and study the **Secure Vibe Coding Playbook**.

---

## 2. Key Implemented Features

- **Feedbackly Demo Application**: Fully interactive student feedback portal featuring an architectural client-to-server data-transmission schematic.
- **Admin Management Console**: Realistic developer operations dashboard displaying live submission records, system latency, and uptime telemetry.
- **SQL Injection Investigation**:
  - Highlights raw string concatenation vulnerabilities in login routines.
  - Interactive diff viewer contrasting vulnerable code against prepared parameterized statements (`?` parameter binding).
- **Stored XSS Investigation**:
  - Highlights unsafe `innerHTML` DOM assignments.
  - Interactive demonstration of safe `textContent` node rendering that neutralizes malicious script payloads.
- **Exposed Secret Investigation**:
  - Highlights API tokens bundled into client-facing JavaScript assets.
  - Demonstrates backend proxy architecture isolating secrets strictly within server-side environment variables (`process.env`).
- **Broken Authorization Investigation**:
  - Demonstrates horizontal privilege escalation (IDOR) on `/api/users/:id`.
  - Implements explicit resource ownership verification (`req.user.id !== req.params.id`).
- **Source Code Review Workspace**:
  - Segmented `VULNERABLE` vs `SECURE REPLACEMENT` controls.
  - Side-by-side code review with inline syntax problem annotations.
  - Line-level diff viewer with red `-` and green `+` indicators.
- **Continuous Mission Flow**: Sequential transition flow from SQLi → XSS → Secrets → Authorization → Lab Summary with progress tracking.
- **Secure Vibe Coding Playbook**:
  - Rule 01: Prompt for Security (specification comparison).
  - Rule 02: Make AI Audit Its Own Code (threat-modeling prompts).
  - Rule 03: Read the Dangerous Parts (interactive 5-point component auditor).
  - Rule 04: Test Like an Attacker ("Can I break it?" mindset).
  - Rule 05: Scan Before You Ship (multi-stage verification pipeline).
  - The Secure Vibe Coding Loop: Animated 7-stage engineering lifecycle.
  - 30-Second Security Checklist: Five critical pre-deployment verification criteria.
- **Swiss Brutalist Finale**: Memorable typographic presentation conclusion with presenter controls and demonstration reset capabilities.

---

## 3. Technology Stack

- **Frontend Core**: React 19, TypeScript
- **Bundler & Tooling**: Vite 8, oxlint
- **Styling**: Tailwind CSS v4, Swiss brutalist design tokens
- **Animation**: Framer Motion
- **State Management**: Zustand (100% in-memory; refresh resets demo state cleanly)
- **Icons**: Lucide React
- **Containerization & Production Hosting**: Docker, Docker Compose, Nginx 1.27 (Alpine Slim)

---

## 4. Directory Structure

```text
vibe-coded-security-lab/
├── .dockerignore              # Docker build exclusion rules
├── .env.example               # Template environment configuration
├── .gitignore                 # Git ignore rules
├── .oxlintrc.json             # Linter configuration
├── compose.yaml               # Project-level Docker Compose specification
├── Dockerfile                 # Multi-stage production container build (Node -> Nginx)
├── index.html                 # Single-page application entry HTML
├── nginx.conf                 # Production Nginx reverse-proxy & SPA routing config
├── package.json               # Package manifests and build scripts
├── package-lock.json          # Deterministic dependency lockfile
├── public/                    # Static public assets
├── README.md                  # Project documentation
├── src/                       # Source code
│   ├── App.tsx                # Main presentation shell and router
│   ├── index.css              # Global Swiss monochrome stylesheet
│   ├── main.tsx               # React application mounting point
│   ├── store.ts               # Zustand application store & demo state
│   ├── components/
│   │   ├── CodeViewer.tsx     # Diff viewer, syntax highlighter & data flow
│   │   └── InvestigationLayout.tsx # Standardized investigation workspace shell
│   └── views/
│       ├── Admin.tsx          # Admin console view
│       ├── AIReview.tsx       # AI prompt security view
│       ├── FeedbackApp.tsx    # Feedbackly interactive application
│       ├── Finale.tsx         # Presentation finale view
│       ├── FinalVerification.tsx # Attack re-verification test view
│       ├── LabComplete.tsx    # 4/4 completion summary
│       ├── Landing.tsx        # High-contrast editorial hero landing page
│       ├── Playbook.tsx       # Secure Vibe Coding Playbook & 5 rules
│       ├── SecurityLab.tsx    # 4-module security lab index
│       ├── SecurityLabTransition.tsx # Threat sandbox initialization view
│       └── modules/           # Vulnerability modules (SQL, XSS, Secret, Auth)
└── tsconfig*.json             # TypeScript compiler configurations
```

---

## 5. Prerequisites

Before running the project, ensure you have one of the following installed:

- **Docker & Docker Compose** (Recommended): Docker Engine 24+ and Docker Compose v2+
- **Local Node.js Environment** (Alternative): Node.js 20+ and npm 10+

---

## 6. Docker Deployment (Recommended)

### Step 1: Configure Environment (Optional)

Copy the sample environment file if you wish to customize the exposed host port:

```bash
cp .env.example .env
```

By default, the application will bind to port `3000`.

### Step 2: Build and Start Container

Run the following command from the `projects/vibe-coded-security-lab` directory:

```bash
docker compose up --build -d
```

### Step 3: Access the Application

Open your browser and navigate to:

👉 **[http://localhost:3000](http://localhost:3000)**

### Step 4: Verify Running Services

Check the container status and health check:

```bash
docker compose ps
```

### Step 5: View Application Logs

```bash
docker compose logs -f
```

### Step 6: Stop the Application

```bash
docker compose down
```

---

## 7. Local Development (Without Docker)

If Docker is not installed on your system, you can run the project directly using Node.js:

```bash
# 1. Install dependencies
npm ci

# 2. Start Vite development server
npm run dev

# 3. Open browser at http://localhost:5173
```

To create a production build locally:

```bash
npm run build
npm run preview
```

---

## 8. Troubleshooting

| Issue | Cause | Resolution |
| :--- | :--- | :--- |
| **Port 3000 already in use** | Another service is using host port 3000 | Set `PORT=3001` in `.env` or run `PORT=8080 docker compose up -d` |
| **404 on page reload** | Web server does not route SPA requests to `index.html` | The included `nginx.conf` handles this via `try_files $uri $uri/ /index.html;`. Ensure you build using the provided Dockerfile. |
| **Container unhealthy** | Nginx health endpoint unreachable | Verify container port 80 is listening using `docker compose logs` |

---

## 9. Educational Safety & Ethics Notice

> **IMPORTANT**: This application is built strictly for **educational demonstrations, security research, and engineering training**.
> 
> All vulnerabilities (SQL Injection, Stored XSS, Exposed Secrets, Broken Authorization) are **contained client-side simulations**. The application does **NOT** contain real exploitable server vulnerabilities, does not connect to external production databases, does not expose real credentials, and must not be used for malicious purposes.
