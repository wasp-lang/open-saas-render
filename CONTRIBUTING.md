# Updating the Template to Latest Wasp Version

## Template Files

Start by removing the old template folders:

```shell
rm -rf app e2e-tests blog
```

Then recreate the template file structure from the latest template version:

```shell
wasp new saas-app -t saas && \
cp -r saas-app/{app,e2e-tests,blog} . && \
cp saas-app/.gitignore . && \
rm -rf saas-app
```

## Changes on Top of Template

### Email Sender

Change the email sender to `Mailgun`.

### Re-add Mailgun Example Env Vars

Make sure `app/.env.server.example` has the Mailgun env vars:

```env
# See our guide for setting up mailgun emailing: https://wasp.sh/docs/advanced/email#mailgun
MAILGUN_API_KEY=your-mailgun-key
MAILGUN_DOMAIN=your-mailgun-domain
```

## Re-add the Initial Migration

Start the database in a separate terminal window:

```bash
cd app/
wasp db start
```

Run the migrations to generate the `package-lock.json` and `migrations` dir:

```bash
cd app/
cp .env.server.example .env.server
wasp db migrate-dev --name "init"
```

## Test That Everything Works

Start the app:

```bash
# Make sure the database is still running from the previous step.
cd app/
wasp start
```

## Render Blueprint

Bump the Wasp CLI version in both `render.yaml` build commands:

```diff
-npm install -g @wasp.sh/wasp-cli@old
+npm install -g @wasp.sh/wasp-cli@new
```

Check the latest [Render deployment guide](https://wasp.sh/docs/guides/deployment/cloud-providers/render) and update `render.yaml` if the recommended commands changed.

### Smoke Test the Blueprint

1. Push a branch containing the updated `render.yaml`.
2. Open the [Render dashboard](https://dashboard.render.com/) and log in with the Wasp account.
3. Click `New > Blueprint` and select the branch.
4. Apply the Blueprint and wait until the database, server, and client services are created.
5. Set `WASP_SERVER_URL` and `WASP_WEB_CLIENT_URL` on the server service.
6. Set `REACT_APP_API_URL` on the client service.
7. Save and rebuild both services.
8. Verify the client URL loads and the server returns `200`.
9. Do not expect login or email flows to work during this smoke test unless real provider env vars are configured.

If a service fails, inspect its build and deploy logs. Common causes are missing variables, stale Wasp build commands, or changes in Wasp's generated output layout.
