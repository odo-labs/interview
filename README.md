# Technical Interview Project

This is a monorepo project containing a Django backend and React frontend, designed for technical interviews. The project uses Docker for containerization and requires minimal setup.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

- `core/` - Django backend with a REST API
- `frontend/` - React frontend application

## Getting Started

1. Clone the repository
2. Run the following command to start all services:

```bash
./run
```

This will start:
- Django backend on http://localhost:8000
- React frontend on http://localhost:3000
- PostgreSQL database

The script will show logs from all services. Press Ctrl+C to stop the services.

## Managing Services

The project includes a `run` script to manage the services:

```bash
# Start services and show logs (development mode)
./run

# Start services in the background
./run start

# Stop services
./run stop

# Restart services
./run restart
```

## API Endpoints

The Django backend provides the following API endpoints:

- `GET /api/rfps/` - List all RFPs
- `POST /api/rfps/` - Create a new RFP
- `GET /api/rfps/{id}/` - Get a specific RFP
- `PUT /api/rfps/{id}/` - Update a specific RFP
- `DELETE /api/rfps/{id}/` - Delete a specific RFP

## Development

The project is set up with hot-reloading for both frontend and backend. Any changes you make to the code will be automatically reflected in the running containers.

### Backend Development

The Django backend is mounted as a volume, so changes to Python files will be immediately reflected. You can access the Django admin interface at http://localhost:9000/admin.

### Frontend Development

The React frontend is also mounted as a volume, and changes will trigger hot-reloading. The frontend is configured to proxy API requests to the backend. 