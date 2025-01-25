# Blog Next.js Project

## Overview

This project is a **Next.js** application designed to be lightweight, efficient, and containerized using Docker. It serves as a customizable blog platform, leveraging modern front-end tools such as **React**, **Tailwind CSS**, and **Markdown** for content rendering. The project is optimized for production using a multi-stage Docker build process.

---

## Features

- **Markdown Rendering**: Uses `cherry-markdown` for seamless content formatting.
- **Image Optimization**: Powered by `plaiceholder` for handling image placeholders efficiently.
- **Authentication**: Implements token-based authentication using `jsonwebtoken`.
- **Next.js Turbopack**: Utilized for faster development builds.
- **Tailwind CSS**: Integrated for responsive and modern styling.
- **ESLint**: Ensures code quality and adherence to best practices.

---

## Setup & Deployment

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. The development server will be available at [http://localhost:3000](http://localhost:3000).

---

### Building & Running with Docker

1. **Build the Docker image**:
   ```bash
   docker build -t blog-next .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 blog-next
   ```

3. Access the app at [http://localhost:3000](http://localhost:3000).

---

## Docker Workflow

### Multi-Stage Build Process

1. **Stage 1 (Builder)**: 
   - Installs dependencies.
   - Builds the Next.js app.
   - Prunes dev dependencies.

2. **Stage 2 (Final Image)**:
   - Uses a minimal Node.js Alpine base image.
   - Copies production files.
   - Runs the app as a non-root user for security.
