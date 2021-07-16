# Astro World
Web application that will allow end users to upload images and answer some trivia for my dog's, Astro Blue, first birthday party.

## Technologies

### Backend
- <span>ASP.NET</span> 5
- <span>ASP.NET</span> Web Api
- DotNet CLI
- EF Core

### Frontend
- React
- NPM (Node Package Manager)

## Backend

### User Secrets (Development)
1. `dotnet user-secrets set <Key> "<value>"`
2. `dotnet user-secrets list`
3. Using secret in program is already setup, just have to use the `IConfiguration` object with the key you specified in step 1

### Migrations
1. `dotnet ef migrations add <unique titel> - .\Persistance\Migrations`
2. `dotnet ef database update`
3. _Optional:_ `dotnet ef migrations script`
4. _Optional:_ `dotnet ef migrations remove`

### Useful SQL Scripts
```sql
-- Shows current identity field value
DBCC CHECKIDENT(<table>); GO;
-- Resets current identity field value to new seed value
DBCC CHECKIDENT(<table>, RESEED, <new seed value>); GO;
```

## Frontend

### Debug
1. `npm i`
2. Add .env file and add variable `REACT_APP_API_URL=(URL of api)`
3. `npm start`