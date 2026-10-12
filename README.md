# CyberSanket

A unified repository for interactive cybersecurity laboratories, practical vulnerability investigations, and DevSecOps training demonstrations.

---

## Laboratory Projects

| Project | Description | Stack | Status | Directory |
| :--- | :--- | :--- | :--- | :--- |
| **Vibe Coded — Security Lab** | Interactive investigation of AI-generated application vulnerabilities (SQLi, Stored XSS, Exposed Secrets, IDOR) with code diffing, fix application, and secure vibe coding playbook. | React 19, TypeScript, Tailwind v4, Nginx, Docker | Production Ready | [`projects/vibe-coded-security-lab`](projects/vibe-coded-security-lab) |

---

## Quickstart (Docker Compose)

You can launch the entire laboratory suite or individual projects using Docker Compose from the root directory.

### 1. Start the Laboratories

```bash
docker compose up --build -d
```

### 2. Access the Application

- **Vibe Coded — Security Lab**: [http://localhost:3000](http://localhost:3000)

### 3. Check Service Health

```bash
docker compose ps
```

### 4. View Runtime Logs

```bash
docker compose logs -f
```

### 5. Stop the Laboratories

```bash
docker compose down
```

---

## Repository Structure

```text
CyberSanket/
├── .gitignore
├── compose.yaml                      # Root multi-project Docker Compose specification
├── README.md                         # Repository documentation and catalog
└── projects/
    └── vibe-coded-security-lab/      # Vibe Coded — Security Lab project
        ├── compose.yaml              # Project-level Docker Compose
        ├── Dockerfile                # Multi-stage production container build
        ├── nginx.conf                # Nginx SPA and security configuration
        ├── package.json
        ├── README.md                 # Detailed project guide
        └── src/                      # Application source code
```

---

## Educational Ethics & Responsible Use

All laboratories contained within **CyberSanket** are designed exclusively for **educational research, authorized training, and developer security awareness**. All simulated vulnerabilities and mock credentials are safe, synthetic demonstrations designed to teach secure software development principles.