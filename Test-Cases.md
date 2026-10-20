**PATH TRAVERSAL LAB · TEST CASES**

# Test Cases

*Sample Attack & Validation Payloads*

## Recommended Test Payloads

| Category | Payload | Target File | Expected (Vulnerable) | Expected (Secure) |
| --- | --- | --- | --- | --- |
| Normal Access | `report.txt` | Public Document | 200 OK (Content) | 200 OK (Content) |
| Relative Traversal | `../private/users.txt` | User Credentials | 200 OK (Exposed) | 403 Forbidden |
| System File (Linux) | `../../../../etc/passwd` | Linux Accounts | 200 OK (Exposed) | 403 Forbidden |
| System File (Windows) | `..\\..\\Windows\\win.ini` | Windows Config | 200 OK (Exposed) | 403 Forbidden |
| URL Encoded | `%2e%2e%2f%2e%2e%2fetc%2fpasswd` | Linux Accounts | 200 OK (Exposed) | 403 Forbidden |
