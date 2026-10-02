# Path Traversal Virtual Lab

**A hands-on cybersecurity lab for understanding directory traversal and
secure file access.**

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Isolated%20Lab-2496ED?logo=docker&logoColor=white)


## About

Path Traversal is a web security vulnerability where an application
improperly handles user-supplied file paths, potentially allowing access
to files outside the intended directory.

This project provides an interactive, local lab where learners can
explore normal file access, observe a controlled traversal scenario, and
compare vulnerable and secure handling.

## Technical Overview

-   **Frontend:** React + Vite --- experiment interface and learning
    content.
-   **Desktop Manager:** Electron --- controls the lab environment.
-   **Target:** Node.js + Express --- simulated file-serving
    application.
-   **Runtime:** Docker Compose --- runs the target in an isolated
    environment.

``` text
React UI → Electron Lab Manager → Docker → Express Target
```

## Setup

### Prerequisites

-   Node.js and npm
-   Docker Desktop (running)
-   Git

### 1. Clone the repository

``` bash
git clone https://github.com/dmelloarlen/path-traversal-simulation.git
cd path-traversal-simulation
```

### 2. Install frontend dependencies

``` bash
cd website
npm install
npm run build
```

### 3. Install and launch Electron

Open a new terminal:

``` bash
cd electron-manager
npm install
npm start
```

### 4. Run the lab

Use the **Start** button in the Electron Lab Controller.

To run the Docker target manually, from `lab-package`:

``` bash
docker compose up --build -d
```

The target is available at `http://localhost:3000`.

To stop it:

``` bash
docker compose down
```
  
> **Safety:** Use only the included simulated files and run this lab
> locally for educational purposes. Do not test systems without
> authorization.
