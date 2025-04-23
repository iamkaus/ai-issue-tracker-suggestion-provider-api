# AI Issue Tracker with Suggestions Provider

A modern issue tracking system with AI-powered suggestions to help streamline workflow and improve productivity.

## 📋 Overview

This project implements an intelligent issue tracking system that provides contextual suggestions to users. Built with Node.js and Prisma ORM, it offers a robust REST API for managing issues while leveraging AI to offer helpful recommendations.

## 🏗️ Project Structure

```
ai-issue-tracker-suggestions-provider/
├── helper/
│   └── fetch.repo.helper.js        # Helper utilities for repository operations
├── node_modules/                   # Node.js dependencies
├── prisma/                         # Prisma ORM configuration
│   ├── migrations/                 # Database migration files
│   └── schema.prisma               # Prisma schema definition
├── src/                            # Source code
│   ├── config/                     # Configuration files
│   │   ├── arcjet.config.js        # Arcjet security configuration
│   │   ├── env.config.js           # Environment configuration loader
│   │   ├── gemini.config.js        # Google Gemini AI configuration
│   │   └── prisma.client.js        # Prisma client configuration
│   ├── controllers/                # API controllers
│   │   ├── auth.controller.js      # Authentication controller
│   │   ├── issue.controller.js     # Issue management controller
│   │   ├── suggestions.controller.js # AI suggestions controller
│   │   └── user.controller.js      # User management controller
│   ├── middlewares/                # Express middlewares
│   │   ├── admin.middleware.js     # Admin access control middleware
│   │   ├── arcjet-rate-limiting.middleware.js # Rate limiting middleware
│   │   └── user.middleware.js      # User authentication middleware
│   └── routes/                     # API routes
│       ├── auth.routes.js          # Authentication routes
│       ├── issues.routes.js        # Issue management routes
│       ├── suggestions.routes.js   # AI suggestions routes
│       └── user.route.js           # User management routes
├── .env                            # Environment variables (not in version control)
├── .env.development.example        # Example development environment variables
├── .env.development.local          # Local development environment variables (not in version control)
├── .gitignore                      # Git ignore file
├── app.js                          # Main application entry point
├── eslint.config.js                # ESLint configuration
├── LICENSE                         # Project license
├── package.json                    # Node.js dependencies and scripts
├── package-lock.json               # Lock file for Node.js dependencies
├── README.md                       # Project documentation (this file)
└── TO-DO.md                        # Project roadmap and pending tasks
```

## ✨ Features

- **User Authentication**: Secure login and registration with role-based access control
- **Issue Management**: Create, read, update, and delete issues with full CRUD operations
- **AI-Powered Suggestions**: Contextually relevant suggestions using Google's Gemini AI
- **Rate Limiting**: Protection against abuse with Arcjet rate limiting
- **RESTful API**: Well-structured endpoints for all operations
- **Database Integration**: Robust data persistence with Prisma ORM

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A database supported by Prisma (PostgreSQL recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamkaus/ai-issue-tracker-suggestion-provider-api.git
   cd ai-issue-tracker-suggestions-provider
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.development.example .env.development.local
   ```
   Edit `.env.development.local` with your configuration.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

The application can be configured using environment variables. See `.env.development.example` for available options.

Key configurations include:
- Database connection
- Authentication secrets
- Gemini AI API keys
- Rate limiting settings

## 🔐 API Endpoints

### Authentication
- `POST /auth/sign-in` - User login
- `POST /auth/sign-up` - User registration
-  `POST /auth/sign-out` - User sign out

### Issues
- `GET /issues/get-issue/:id` - Fetch an issue with provided issue id
- `GET /issues/get-user-issues/:id` - List all the issues created by a user with provided user id
- `POST /issues/create-issue` - Create new issue
- `PUT /issues/update-issue/:id` - Update issue
- `DELETE /issues/delete-issue/:id` - Delete issue

### Suggestions
- `GET /suggestions/create-suggestion` - Create a new issue with [ title, description, status, priority, assigneeId ]
- `GET /suggestions/get-suggestions` - Fetches all the suggestions
- `GET /suggestions/get-suggestions/:id` - Fetch a suggestion with specific suggestion id

### Users
- `GET /users/get-users` - List users (admin only)
- `GET /users/get-user/:id` - Get user details
- `PUT /users/update-user/:id` - Update user
- `DELETE /users/delete-user/:id` - Delete user

## 🧪 Testing

Run tests with:
[ at the moment there is no test file ]

```bash
npm test
```

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🌱 Contributing

See [TO-DO.md](TO-DO.md) for planned features and improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or suggestions, please open an issue in the repository.