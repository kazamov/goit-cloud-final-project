# Database Setup Guide

This guide explains how to set up and work with the PostgreSQL database using Drizzle ORM.

## Prerequisites

- Docker and Docker Compose
- Node.js 22+
- npm

## Quick Start

1. **Start the database**:
   ```bash
   npm run docker:up
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Generate and run migrations**:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start the backend**:
   ```bash
   npx nx serve backend
   ```

## Available Scripts

### Database Operations
- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:migrate` - Run pending migrations
- `npm run db:push` - Push schema changes directly to database (dev only)
- `npm run db:studio` - Open Drizzle Studio (database GUI)

### Docker Operations
- `npm run docker:up` - Start PostgreSQL container
- `npm run docker:down` - Stop and remove containers
- `npm run docker:logs` - View database logs

## Database Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment (development/production)
- `PORT` - Backend server port

### Database Schema

The current schema includes:
- **Users** table with email, name, timestamps
- **Posts** table with title, content, author relationship

Schema files are located in `apps/backend/src/database/schema/`

## API Endpoints

### Users API
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Example Usage

Create user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

Get all users:
```bash
curl http://localhost:3000/api/users
```

## Development Workflow

1. **Make schema changes** in `apps/backend/src/database/schema/`
2. **Generate migration**: `npm run db:generate`
3. **Review migration** in `apps/backend/src/database/migrations/`
4. **Apply migration**: `npm run db:migrate`
5. **Test changes** with the API

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL container is running: `docker ps`
- Check connection string in `.env`
- Verify database credentials

### Migration Issues
- Check migration files in `apps/backend/src/database/migrations/`
- Ensure database is accessible
- Review Drizzle configuration in `drizzle.config.ts`

### Port Conflicts
- Change PostgreSQL port in `docker-compose.yml` if 5432 is in use
- Update `DATABASE_URL` accordingly

## Database Management

### Using Drizzle Studio
```bash
npm run db:studio
```
Opens a web interface at `https://local.drizzle.studio`

### Direct Database Access
```bash
docker exec -it goit-postgres psql -U postgres -d goit_db
```

## Production Considerations

- Use strong passwords and secure connection strings
- Enable SSL connections
- Set up database backups
- Monitor database performance
- Use connection pooling for high traffic

## File Structure

```
apps/backend/src/database/
├── schema/
│   └── index.ts          # Database schema definitions
├── migrations/           # Generated migration files
├── database.service.ts   # Database connection service
├── database.module.ts    # NestJS database module
└── migration.service.ts  # Migration management service
```
