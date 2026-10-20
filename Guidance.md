# Path Traversal Lab - Student Guidance

## 1. Aim

To understand how path traversal vulnerabilities allow a user to access files outside the intended directory and how proper path validation prevents unauthorized file access.

---

## 2. Before Starting the Simulation

Make sure:

- Docker Desktop is running.
- The Path Traversal Lab application is open.
- Use only the files and paths provided by this experiment.

---

## 3. Start the Lab

1. Open a terminal in the `lab-package` folder.
2. Run `docker compose up --build -d`.
3. Wait until the container is running (check with `docker ps`).
4. The target application runs at `http://localhost:3000`.
5. When you are finished, run `docker compose down`.

The target application contains a controlled file structure for demonstrating path traversal.

---

## 4. Understand the File Structure

The experiment uses the following simplified file structure:

```text
public/
├── report.txt
└── welcome.txt

private/
└── users.txt

config/
└── database.txt