# hyper-killer

Keeps a Hyper account that is used for only short-lived tasks (e.g. CI) clean by removing:

  * containers (running or not) after 1 hour
  * volumes, if unattached
  * images, after 1 day or if dangling

To install:

```
hyper cron create \
    --name hyper-killer \
    --minute=*/15 \
    --hour=* \
    --size s1 \
    -e HYPER_ACCESS_KEY=... \
    -e HYPER_SECRET_KEY=... \
    celtra/hyper-killer
```
