# Technical Interview Project

This is a monorepo project containing a Django backend and React frontend, designed for technical interviews. The project uses Docker for containerization and requires minimal setup and prerequisites.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

- `core/` - Django backend with a REST API
- `frontend/` - React frontend application

## Getting Started

1. Clone the repository
2. Run the following commands to start all services:

```bash
./odo setup
./odo types
./odo run
```

This will start:
- Django backend on http://localhost:9000
- React frontend on http://localhost:3002
- PostgreSQL database

The script will show logs from all services. Press Ctrl+C to stop the services.

## Managing Services

The project includes an `odo` script to manage the services:

*Core Commands*

```bash
# Start services and show logs (development mode)
./odo run

# Update services already running
./odo update

# Generate TypeScript types
# Run this whenever changing backend endpoints
./odo types

# Run the test suite
./odo tests
```

*Other Commands*

```bash
# Start services in the background
./odo start

# Stop services
./odo stop

# Run Django management commands
./odo manage [command]

# Setup the project again
./odo setup
```

## Development

The project is set up with hot-reloading for both frontend and backend. Any changes you make to the code will be automatically reflected in the running containers.