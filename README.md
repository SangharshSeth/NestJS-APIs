
# NestJS Starter Project

Welcome to the NestJS Starter Project! This project provides a solid foundation to quickly get started with a NestJS application, complete with database connection, environment variable management, and essential scaffolding.

## Features

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: A powerful and flexible ORM for connecting with MySQL.
- **Environment Variables**: Centralized configuration using environment variables.
- **Docker**: Containerized development environment with Docker support.
- **pnpm**: Fast, disk space-efficient package manager.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)

## Getting Started

1. **Clone the repository:**

    ```sh
    git clone https://github.com/sangharshseth/nestjs-starter-project.git
    cd nestjs-starter-project
    ```

2. **Install dependencies:**

    ```sh
    pnpm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your configuration. Refer to `.env.example` for required variables.

    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=password
    DB_NAME=nestjs_starter
    ```

4. **Run the application:**

    ```sh
    pnpm start:dev
    ```

    The application will start on `http://localhost:3000`.

## Docker Support

1. **Build the Docker image:**

    ```sh
    docker build -t nestjs-starter .
    ```

2. **Run the Docker container:**

    ```sh
    docker run -p 3000:3000 --env-file .env nestjs-starter
    ```

    The application will be available on `http://localhost:3000`.

## Project Structure