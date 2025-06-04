# GOIT Cloud Final Project

## Overview

This is a full-stack application built as a final project for the GOIT Cloud course. The project demonstrates modern web development practices using a monorepo architecture managed by Nx, with a React/Next.js frontend and a NestJS backend.

## Architecture

The project follows a monorepo pattern using [Nx](https://nx.dev) as the build system and workspace orchestrator. This allows for efficient development, testing, and deployment of multiple interconnected applications.

### Project Structure

```
goit-cloud-final-project/
├── apps/
│   ├── frontend/          # Next.js React application
│   └── backend/           # NestJS API server
├── package.json           # Root workspace configuration
├── nx.json               # Nx workspace configuration
├── tsconfig.base.json    # Base TypeScript configuration
└── README.md             # Project documentation
```

## Applications

### Frontend (`apps/frontend`)
- **Framework**: Next.js 15.2.4 with React 19.0.0
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Development Server**: Runs on default Next.js port (3000)
- **Features**:
  - Server-side rendering (SSR) capabilities
  - API routes for serverless functions
  - Modern React features with React 19
  - Type-safe development with TypeScript

### Backend (`apps/backend`)
- **Framework**: NestJS 10.0.2
- **Language**: TypeScript
- **Architecture**: Modular, decorator-based
- **API Prefix**: `/api`
- **Port**: 3000 (configurable via `PORT` environment variable)
- **Features**:
  - RESTful API architecture
  - Dependency injection
  - Built-in testing support
  - Production-ready structure

## Technology Stack

### Core Technologies
- **Frontend**: Next.js, React, TypeScript
- **Backend**: NestJS, Node.js, TypeScript
- **Build Tool**: Nx monorepo
- **Package Manager**: npm (with workspaces)

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Bundling**: Webpack (backend), Next.js built-in (frontend)
- **Testing**: Jest (via NestJS testing utilities)

### Dependencies
- **Frontend Dependencies**:
  - `next`: ~15.2.4
  - `react`: 19.0.0
  - `react-dom`: 19.0.0

- **Backend Dependencies**:
  - `@nestjs/common`: ^10.0.2
  - `@nestjs/core`: ^10.0.2
  - `@nestjs/platform-express`: ^10.0.2
  - `reflect-metadata`: ^0.1.13
  - `rxjs`: ^7.8.0

## Development Workflow

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development servers**:
   ```bash
   # Start frontend (also starts backend due to dependency)
   npx nx dev frontend
   
   # Or start backend independently
   npx nx serve backend
   ```

3. **Build for production**:
   ```bash
   npx nx build frontend
   npx nx build backend
   ```

### Nx Commands

- **Run tasks**: `npx nx <target> <project>`
- **View project graph**: `npx nx graph`
- **Show available targets**: `npx nx show project <project-name>`
- **List installed plugins**: `npx nx list`

### Project Dependencies

The frontend has a dependency on the backend, configured in the Nx workspace. When running `npx nx dev frontend`, the backend will automatically start first, ensuring the full-stack application is available for development.

## API Structure

### Backend Endpoints
- **Base URL**: `http://localhost:3000/api`
- **Health Check**: `GET /api` - Returns basic application data

### Frontend API Routes
- **Hello API**: `GET /api/hello` - Simple API route example

## Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)

### TypeScript Configuration
- Shared base configuration in `tsconfig.base.json`
- App-specific configurations in respective `tsconfig.json` files
- Strict type checking enabled

### ESLint Configuration
- Consistent linting across all applications
- TypeScript-aware rules
- Next.js specific rules for frontend
- Prettier integration for code formatting

## Deployment Considerations

The project is structured for cloud deployment with:
- Separate build processes for frontend and backend
- Environment-based configuration
- Production-optimized builds
- Nx Cloud integration for CI/CD optimization

## Development Features

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Jest for testing (NestJS integration)

### Development Experience
- Hot reload for both applications
- Integrated development workflow via Nx
- Shared dependencies and configurations
- Efficient build caching

## Future Enhancements

This project structure supports easy scaling and addition of:
- Additional microservices
- Shared libraries
- Database integration
- Authentication systems
- Frontend component libraries
- API documentation (Swagger/OpenAPI)
- Monitoring and logging systems

## License

MIT License - This project is open source and available under the MIT License.

---

*Generated on June 4, 2025 - This documentation reflects the current state of the GOIT Cloud Final Project repository.*
