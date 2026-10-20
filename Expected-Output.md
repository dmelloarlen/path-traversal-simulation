**PATH TRAVERSAL LAB · EXPECTED OUTPUT**

# Expected Output

*Lab Execution Results*

## Vulnerable Mode Output

```
HTTP/1.1 200 OK
Content-Type: text/plain

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
user:x:1000:1000:LabUser:/home/user:/bin/bash
```

## Secure Mode Output

```
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "Access Denied",
  "message": "Path traversal sequence detected. Access outside root directory is restricted."
}
```
