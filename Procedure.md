**PATH TRAVERSAL LAB · PROCEDURE**

# Procedure

*Follow the steps below to perform the controlled path traversal experiment.*

## 1. Start the Lab

1. Click **Start Lab**.
2. Wait until the lab status changes to **Running**.
3. Confirm that the target is available at `http://localhost:3000`.

## 2. Observe Normal File Access

1. Open the **Simulation** tab.
2. Select **Normal File**.
3. Use `report.txt` as the requested file.
4. Select **Vulnerable Mode**.
5. Click **Run Experiment**.
6. Observe the returned file content and HTTP response.

> **Expected:** The file is inside the permitted directory, so normal file access succeeds.

## 3. Perform the Controlled Traversal Test

1. Select **Directory Traversal**.
2. Use `../private/users.txt`.
3. Select **Vulnerable Mode**.
4. Click **Run Experiment**.
5. Observe the response and path analysis.

> **Expected:** Vulnerable Mode demonstrates how a user-controlled path can move outside the intended directory.

## 4. Understand the Root Cause

The vulnerability occurs when an application accepts a user-controlled file path without correctly enforcing the boundary of the permitted directory.

The `..` path component can be used to move to a parent directory. If the application does not validate the resulting path, files outside the intended directory may become accessible.

## 5. Test the Secure Implementation

1. Keep the same path: `../private/users.txt`.
2. Switch to **Secure Mode**.
3. Click **Run Experiment** again.
4. Compare the result with Vulnerable Mode.

> **Expected:** Secure Mode detects that the resolved path is outside the permitted directory and blocks the request.

## 6. Compare the Results

| Test | Mode | Expected Result |
| --- | --- | --- |
| `report.txt` | Vulnerable | Normal file is returned |
| `../private/users.txt` | Vulnerable | Controlled traversal demonstration |
| `../private/users.txt` | Secure | Access is blocked |

## 7. Complete the Experiment

1. Review the observed results and explanation.
2. Open **Quiz / Assessment**.
3. Complete the assessment.
4. Use **Reset Lab** to restore a clean state if required.
5. Click **Stop Lab** when the experiment is complete.

> **Learning outcome:** You should be able to explain the path traversal vulnerability, its root cause, the effect of crossing a directory boundary, and how secure path validation prevents unauthorized file access.
