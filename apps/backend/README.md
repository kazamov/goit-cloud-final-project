# Backend API - GOIT Cloud Final Project

This is the backend API service built with NestJS, PostgreSQL, and Drizzle ORM.

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- Docker and Docker Compose
- npm

### Setup Instructions

1. **Navigate to backend directory**:
   ```bash
   cd apps/backend
   ```

2. **Install dependencies** (from root):
   ```bash
   cd ../../ && npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration if needed
   ```

4. **Start the database**:
   ```bash
   npm run docker:up
   ```

5. **Run database migrations**:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8000/api`

## 📂 Project Structure

```
apps/backend/
├── README.md              # This file
├── DATABASE.md           # Database setup guide
├── docker-compose.yml    # PostgreSQL container config
├── drizzle.config.ts     # Drizzle ORM configuration
├── .env.example         # Environment variables template
├── database/            # Database-related files
│   └── init.sql        # Database initialization script
└── src/
    ├── main.ts         # Application entry point
    ├── app/           # Main application module
    ├── database/      # Database services and schema
    ├── users/         # Users module (CRUD)
    └── posts/         # Posts module (CRUD)
```

## 🛠 Available Scripts

### Database Management
```bash
npm run db:generate    # Generate migration files
npm run db:migrate     # Run pending migrations
npm run db:push        # Push schema directly (dev only)
npm run db:studio      # Open Drizzle Studio GUI
```

### Docker Operations
```bash
npm run docker:up      # Start PostgreSQL container
npm run docker:down    # Stop containers
npm run docker:logs    # View database logs
```

### Development
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
```

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `name`
- `createdAt`
- `updatedAt`

### Posts Table
- `id` (Primary Key)
- `title`
- `content`
- `authorId` (Foreign Key → users.id)
- `createdAt`
- `updatedAt`

## 🔌 API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/posts` - Get all posts with authors
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get post by ID with author
- `GET /api/posts/user/:userId` - Get posts by user
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Health Check
- `GET /api` - API health check with database status

## 🐳 Docker Setup

The PostgreSQL database runs in a Docker container with the following configuration:
- **Image**: postgres:16
- **Port**: 5432
- **Database**: goit_db
- **User**: postgres
- **Password**: postgres

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/goit_db

# Application Configuration
PORT=8000
NODE_ENV=development
```

## 📝 Development Guidelines

1. **Database Changes**: Always generate migrations when modifying the schema
2. **Environment**: Use the `.env` file for local configuration
3. **Error Handling**: Implement proper error handling with appropriate HTTP status codes
4. **Type Safety**: Leverage TypeScript and Drizzle ORM for type-safe database operations

## 🔍 Database GUI

Access Drizzle Studio for a visual database interface:
```bash
npm run db:studio
```

This will open a web interface to browse and manage your database.

## 📚 Documentation

- [DATABASE.md](./DATABASE.md) - Detailed database setup guide
- [NestJS Documentation](https://docs.nestjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
