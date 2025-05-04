# Project Familiarization Guide

This document provides an in-depth look at the project structure and components. Understanding these components will help you prepare for the technical interview.

## Project Architecture

The project is divided into two main components:

1. **Backend (Django)**
   - Located in the `core/` directory
   - Provides a REST API for RFP management
   - Uses PostgreSQL as the database
   - Includes unit tests for backend functionality

2. **Frontend (React)**
   - Located in the `frontend/` directory
   - Built with TypeScript and modern React practices
   - Uses generated TypeScript types from the backend API
   - Implements a clean, component-based architecture
   - Styled using Tailwind CSS with custom configuration

## Backend Structure

The Django backend is organized as follows:

```
core/
├── core/              # Django project configuration
│   ├── settings.py    # Project settings
│   └── urls.py        # Main URL routing
├── rfps/              # RFP application
│   ├── models/        # Database models
│   ├── serializers.py # API serializers
│   ├── views.py       # API views
│   └── tests/         # Unit tests
└── manage.py          # Django management script
```

### Key Backend Components

1. **Models**
   - Located in `core/rfps/models/`
   - Defines the RFP data structure
   - Includes fields for RFP details, status, and metadata

2. **API Endpoints**
   - RESTful endpoints for RFP operations
   - Documented using Swagger/OpenAPI
   - Accessible at http://localhost:9000/api/

3. **Tests**
   - Unit tests for models and API endpoints
   - Located in `core/rfps/tests/`
   - Run using `./odo tests`

## Frontend Structure

The React frontend is organized as follows:

```
frontend/
├── src/
│   ├── api/          # API client and types
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and components
│   ├── rfps/         # RFP-related components
│   └── App.tsx       # Main application component
├── tailwind.config.js # Tailwind CSS configuration
└── package.json      # Dependencies and scripts
```

### Key Frontend Components

1. **API Integration**
   - TypeScript types generated from backend API
   - API client for making requests
   - Located in `frontend/src/api/`

2. **Components**
   - Reusable UI components
   - RFP-specific components
   - Located in `frontend/src/rfps/`

3. **Hooks**
   - Custom React hooks for data fetching
   - State management utilities
   - Located in `frontend/src/hooks/`

4. **Styling**
   - Uses Tailwind CSS for styling
   - Custom configuration in `tailwind.config.js`
   - Includes custom colors, spacing, and other design tokens
   - Familiarity with Tailwind CSS utility classes is recommended

## Development Workflow

1. **API Development**
   - Modify backend models and views
   - Test changes using unit tests when appropriate
   - Run `./odo types` to update frontend types

2. **Frontend Development**
   - Use `useApiClient` which returns an API client generated from the backend types after running `./odo types`
   - Implement new components as needed
   - Style components using Tailwind CSS utility classes
   - Test changes in the browser