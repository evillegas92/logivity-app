# Logivity

Logivity is a full-stack web application made up of an ASP.NET Core Web API backend and a SvelteKit frontend.

## Repository structure

```
logivity-app/
├── logivity-api/   ASP.NET Core Web API (.NET 10)
└── frontend/       SvelteKit app (Svelte 5, TypeScript, Vite)
```

## Quick start

To run the backend and the frontend together from the repo root, first install dependencies and create the frontend's `.env` (one-time setup). `npm install` at the root also installs the frontend's dependencies:

```bash
npm install
cp frontend/.env.example frontend/.env
```

Then start both apps:

```bash
npm start
```

This starts the API on `http://localhost:5235`, waits until it's listening, then starts the frontend on `http://localhost:5173` and opens it in your browser. Output from each app is prefixed with `[api]` or `[web]`. Press Ctrl+C to stop both; if either app exits, the other is stopped too.

To run just one of them from the root, use `npm run start:api` or `npm run start:web`. `start:web` waits for the API, so start the API first; it gives up after 2 minutes. The sections below describe running each app on its own from its folder.

## logivity-api

An ASP.NET Core Web API targeting .NET 10, using controllers and built-in OpenAPI document generation (`Microsoft.AspNetCore.OpenApi`).

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- A trusted HTTPS development certificate. If you haven't set one up on this machine yet, run:

  ```bash
  dotnet dev-certs https --trust
  ```

### Running the API

From the `logivity-api` folder:

```bash
cd logivity-api
dotnet run --launch-profile http
```

The `http` profile listens on `http://localhost:5235`, and this is the URL the frontend calls in local development. The `https` profile listens on `https://localhost:7134` and redirects HTTP to HTTPS. The frontend's server-side rendering (Node) doesn't trust the .NET dev certificate, so use the `http` profile when you run the frontend. Both profiles run the app with `ASPNETCORE_ENVIRONMENT=Development`.

### Trying it out

- List shipments: `GET http://localhost:5235/api/Shipments`
- Get one shipment: `GET http://localhost:5235/api/Shipments/{id}`
- Create a shipment: `POST http://localhost:5235/api/Shipments` with `origin`, `destination`, `pickupDate` (`YYYY-MM-DD`) and `description`. New shipments start with status `Open`.
- OpenAPI document (Development only): `GET http://localhost:5235/openapi/v1.json`

You can also send requests from [`logivity-api/logivity-api.http`](logivity-api/logivity-api.http) using Visual Studio, Rider, or the VS Code REST Client extension.

### Configuration

Settings live in `appsettings.json`, and `appsettings.Development.json` overrides them locally. Both files are committed, so don't put secrets in them. For local secrets, use [user secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets):

```bash
dotnet user-secrets init
```

#### CORS

The API only accepts cross-origin requests from the origins listed in `Cors:AllowedOrigins`. `appsettings.Development.json` allows the frontend dev server (`http://localhost:5173`). For other environments, set the origins in that environment's configuration, for example `Cors__AllowedOrigins__0=https://app.example.com`.

## frontend

A SvelteKit app using Svelte 5 (runes mode is on for all project code), TypeScript, and Vite. It was created with the [`sv`](https://github.com/sveltejs/cli) CLI using the minimal template, and it uses `@sveltejs/adapter-auto` for deployment.

### Prerequisites

- [Node.js](https://nodejs.org/) `^20.19.0` or `>=22.12.0` (required by Vite). `frontend/.npmrc` sets `engine-strict=true`, so `npm install` fails on an unsupported Node version.

### Running the frontend

From the `frontend` folder, install dependencies and start the dev server:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev -- --port 5173
```

`.env` sets `PUBLIC_API_BASE_URL`, the base URL of the API (default `http://localhost:5235`). It's git-ignored, so change it locally or set the variable in your deployment environment. The value is baked in at build time (`$env/static/public`), and the build fails if it isn't set.

Always pass `--port 5173`. The API's CORS policy only allows `http://localhost:5173`. The `dev` script uses `--strictPort`, so if 5173 is busy, Vite exits with an error instead of moving to another port the API would reject. To open the app in your browser too, add `--open`: `npm run dev -- --port 5173 --open`.

### Other scripts

| Command | Description |
| --- | --- |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Type-check the project with `svelte-check` |
| `npm run check:watch` | Run `svelte-check` in watch mode |

### Editor and AI tooling

- VS Code: install the recommended [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) (`svelte.svelte-vscode`).
- Claude Code: the repo's [`.claude/settings.json`](.claude/settings.json) enables the official Svelte plugin (`svelte@svelte` from [`sveltejs/ai-tools`](https://github.com/sveltejs/ai-tools)). Open Claude Code at the repo root and accept the prompt to install it.

## Documentation
- Dotnet Backend: https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-10.0&tabs=visual-studio-code
- SvelteKit Frontend: https://svelte.dev/docs/kit
