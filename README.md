# Logivity

Logivity is a full-stack web application made up of an ASP.NET Core Web API backend and a SvelteKit frontend.

## Repository structure

```
logivity-app/
├── logivity-api/   ASP.NET Core Web API (.NET 10)
└── frontend/       SvelteKit app (Svelte 5, TypeScript, Vite)
```

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
dotnet run --launch-profile https
```

The API will listen on:

- `https://localhost:7134`
- `http://localhost:5235` (redirects to HTTPS)

The `https` profile runs the app with `ASPNETCORE_ENVIRONMENT=Development`.

### Trying it out

- Sample endpoint: `GET https://localhost:7134/weatherforecast`
- OpenAPI document (Development only): `GET https://localhost:7134/openapi/v1.json`

You can also send requests from [`logivity-api/logivity-api.http`](logivity-api/logivity-api.http) using Visual Studio, Rider, or the VS Code REST Client extension.

### Configuration

Settings live in `appsettings.json`, and `appsettings.Development.json` overrides them locally. Both files are committed, so don't put secrets in them. For local secrets, use [user secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets):

```bash
dotnet user-secrets init
```

## frontend

A SvelteKit app using Svelte 5 (runes mode is on for all project code), TypeScript, and Vite. It was created with the [`sv`](https://github.com/sveltejs/cli) CLI using the minimal template, and it uses `@sveltejs/adapter-auto` for deployment.

### Prerequisites

- [Node.js](https://nodejs.org/) `^20.19.0` or `>=22.12.0` (required by Vite). `frontend/.npmrc` sets `engine-strict=true`, so `npm install` fails on an unsupported Node version.

### Running the frontend

From the `frontend` folder, install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` by default. Add `-- --open` to open it in your browser (`npm run dev -- --open`).

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
