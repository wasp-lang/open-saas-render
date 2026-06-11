# Open SaaS x Render Template

You've decided to build a SaaS app with the Open SaaS x Render template. Great choice.

This template is:

1. fully open-source and free to use
2. comes with a ton of features out of the box
3. pre-configured for Render Blueprint deployments

> [!WARNING]
> This is a special version of Open SaaS designed for Render deployments.
> Do not use Wasp's built-in deploy commands, as they will not use this repo's Render Blueprint setup.

## Using This Open SaaS x Render Template

This repo contains the Open SaaS template folders and a root `render.yaml` Blueprint that creates:

1. a PostgreSQL database
2. a Node.js server Web Service
3. a static React client Web Service

### Prerequisites

1. Create a [Render](https://render.com/) account.
2. Push this repo to GitHub, GitLab, or Bitbucket.
3. Install the Wasp CLI locally if you plan to develop the app:

```bash
npm i -g @wasp.sh/wasp-cli@latest
```

Render builds the app from source, so you do not need to run `wasp build` locally before deploying. If you change the data model, run `wasp db migrate-dev` locally and commit the generated files in `app/migrations/` before deploying.

### Initial Deployment

The default `render.yaml` values are:

1. app prefix: `open-saas-render`
2. Render plan: `free`
3. Render region: `oregon`
4. Git branch: `main`
5. Wasp CLI version: `0.24`

Change these values in `render.yaml` before deploying if needed.

To deploy:

1. In the Render Dashboard, click `New > Blueprint`.
2. Connect your Git repository and select the branch containing `render.yaml`.
3. Render will show the resources it will create. Do not fill out the environment variables form yet.
4. Click `Apply`.

The first deploy can fail while the services are being created because the public URLs are not known yet.

### Set Environment Variables

After Render creates the services, note their URLs. They usually look like:

```text
https://open-saas-render-server.onrender.com
https://open-saas-render-client.onrender.com
```

On the `open-saas-render-server` Web Service, go to `Settings > Environment` and set:

```text
WASP_SERVER_URL=https://open-saas-render-server.onrender.com
WASP_WEB_CLIENT_URL=https://open-saas-render-client.onrender.com
```

On the `open-saas-render-client` Static Site, go to `Settings > Environment` and set:

```text
REACT_APP_API_URL=https://open-saas-render-server.onrender.com
```

Then save and rebuild both services.

> [!WARNING]
> `REACT_APP_API_URL` must be set before the client build runs because Vite embeds it into the compiled JavaScript.

If you enable integrations such as Google auth, payments, analytics, file uploads, AI features, or email sending, add their required environment variables to the relevant Render service too.

Render's free PostgreSQL database expires after 30 days. Use a paid Render plan or an external database provider for production.

### Redeploying

Render auto-deploys when you push to the branch configured in `render.yaml`.

If you have new database model changes, run this locally first and commit the generated migration files:

```bash
cd app
wasp db migrate-dev
```

## Local Development

1. Install the Wasp CLI:

```bash
npm i -g @wasp.sh/wasp-cli@latest
```

2. Start the database:

```bash
cd app
wasp start db
```

3. In another terminal, start the app:

```bash
cd app
wasp start
```

4. Configure integrations using the [Open SaaS Docs](https://docs.opensaas.sh), including auth, payments, analytics, email sending, file uploads, and AI-assisted coding.

## What's Inside?

1. `app` - Your web app, built with [Wasp](https://wasp.sh).
2. `e2e-tests` - [Playwright](https://playwright.dev/) tests for your Wasp web app.
3. `blog` - Your blog and docs, built with [Astro](https://docs.astro.build) and [Starlight](https://starlight.astro.build/).
4. `render.yaml` - Render Blueprint for the database, server, and client.

The template is built on top of:

- [Wasp](https://wasp.sh) - a full-stack React, Node.js, and Prisma framework
- [Astro](https://starlight.astro.build/) - blog and docs
- [Stripe](https://stripe.com), [Lemon Squeezy](https://lemonsqueezy.com/), or [Polar](https://polar.sh) - products and payments
- [ShadCN UI](https://ui.shadcn.com/) - components and styling
- [Plausible](https://plausible.io) or [Google Analytics](https://analytics.google.com/) - analytics
- [OpenAI](https://openai.com) - AI example features
- [AWS S3](https://aws.amazon.com/s3/) - file uploads
- [Mailgun](https://www.mailgun.com/), [SendGrid](https://sendgrid.com/), or SMTP - email sending
- [Playwright](https://playwright.dev) - end-to-end tests

## Getting Help and Providing Feedback

1. [Open an issue](https://github.com/wasp-lang/open-saas/issues)
2. [Join the Wasp Discord](https://discord.gg/aCamt5wCpS)
