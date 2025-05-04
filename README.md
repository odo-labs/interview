# Technical Interview Project

Welcome to the technical interview project! This repository contains a full-stack application built with Django (backend) and React (frontend), designed to get the core project setup out of the way so we can focus on evaluating your practical skills. You can choose to focus on either backend development or full-stack development during the interview.

**Before the Interview**

Please complete the project setup and make sure you are ready to begin development right at the beginning of the interview. If you run into any problems, please reach out to us.

## Prerequisites

Before starting, ensure you have the following installed:
- Docker
- Docker Compose

The easiest way to install this is to use [Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Project Overview

This project consists of:
- A Django backend with a REST API for managing RFPs (Request for Proposals)
- A React frontend application for displaying and interacting with RFPs
- A PostgreSQL database
- Docker configuration for easy setup and development with minimal prerequisites and setup.

## Getting Started

1. Clone this repository
2. Start the application:
   ```bash
   ./odo run
   ```
   This will start:
   - Django backend on http://localhost:9000
   - React frontend on http://localhost:3002
   - PostgreSQL database
  
   **IMPORTANT:** This command does not return so that it's easy to view logs from the frontend and backend. You'll need to open another terminal for the rest of the commands.
3. Run the init script
   ```bash
   ./odo init
   ```
   This will import the initial RFP data into the database.
4. Run the test suite to verify your setup:
   ```bash
   ./odo tests
   ```
   All tests should pass before proceeding.
5. Run open to bring up the web app
   ```bash
   ./odo open
   ```

The script will show logs from all services. Press Ctrl+C to stop the services.

## Development Environment

The project includes an `odo` script to manage the services:

### Core Commands

In most cirumstances, these should be the only commands you need.

```bash
# Start services and show logs (development mode)
./odo run

# Update services already running
# The services should hot-reload when you make code changes, but this will be
# necessary if making configuration changes.
./odo update

# Generate TypeScript types
# Run this whenever changing backend endpoints
./odo types

# Run the test suite
./odo tests

# Run Django management commands
# This will be important if changing database models. You will likely need to run
# ./odo manage makemigrations && ./odo manage migrate
./odo manage [command]
```

### Other Commands

These other commands are also available

```bash
# Open the browser to the web app
./odo open

# Start services in the background
./odo start

# Stop services
./odo stop

# Setup the project again
./odo setup
```

## Next Steps

Once you have the project running, please review the [FAMILIARIZE.md](FAMILIARIZE.md) document to understand the project structure and components. This will help you prepare for the technical interview.

## Troubleshooting

If you encounter any issues during setup:
1. Ensure Docker and Docker Compose are properly installed and running
2. Check that ports 3002 and 9000 are not in use by other applications
3. Try running `./odo update` to update the services to the latest
4. If that still doesn't work, try running `./odo stop` followed by `./odo run` to reset the environment
5. If tests fail, check the test output for specific error messages

## Interview Preparation

For the interview, you should be familiar with:
- Backend: Python, Django, REST APIs, database design
- Frontend: React, TypeScript, modern web development practices
- General: Docker, API design, testing practices

You can choose to focus on either backend or full-stack development during the interview. The project is designed to be approachable from either perspective.
