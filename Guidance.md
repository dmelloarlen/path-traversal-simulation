# Path Traversal Lab - Student Guidance

## 1. Aim

To understand how path traversal vulnerabilities allow a user to access files outside the intended directory and how proper path validation prevents unauthorized file access.

---

## 2. Before Starting

Make sure:

- Docker Desktop is running.
- The Path Traversal Lab application is open.
- The Lab Controller shows the lab as Ready or Stopped.
- Use only the files and paths provided by this experiment.

---

## 3. Start the Lab

1. Open the **Simulation** section.
2. Open the **Lab Controller**.
3. Click **Start Lab**.
4. Wait until the status changes to **Running**.
5. The target application runs at:

   `http://localhost:3000`

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