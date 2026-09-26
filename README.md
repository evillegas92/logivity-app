# Logivity

Logivity is a full-stack web application. Right now the repository contains only the backend API.

## Repository structure

```
logivity-app/
└── logivity-api/   ASP.NET Core Web API (.NET 10)
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

## Documentation
- Dotnet Backend: https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-10.0&tabs=visual-studio-code