# Raspberry Pi Backend

This is a simple Dockerized Node.js + PostgreSQL backend deployed to a Raspberry Pi. It serves as the backend for a blog API, exposing basic CRUD functionality. The project is integrated with GitHub Actions for CI/CD and is reverse proxied through NGINX Proxy Manager with SSL provided by Let's Encrypt.

## Stack

- **Node.js + Express** – REST API
- **PostgreSQL** – Relational database
- **Docker + Docker Compose** – Containerized application
- **NGINX Proxy Manager** – Reverse proxy and SSL termination
- **DuckDNS** – Dynamic DNS mapping to Raspberry Pi’s changing IP
- **GitHub Actions** – Automated deployment pipeline on push to `main` branch

## Project Goals

- Build a real-world backend service that runs on local hardware (Raspberry Pi)
- Practice infrastructure setup with Docker, environment management, and persistent storage
- Enable a secure public API endpoint using SSL and reverse proxying
- Automate deployments using GitHub Actions and SSH

## Endpoint

Once deployed, the backend is available at: https://api.simostack.com/posts

## API

### GET /posts

Returns all blog posts.

### POST /posts

Creates a new post.

### DELETE /posts/:id

Deletes a post by ID.

## Deployment Pipeline

1. **Push to `main`** triggers a GitHub Actions workflow.
2. The workflow connects to the Raspberry Pi over SSH using a deploy key.
3. It pulls the latest code and restarts the containers using Docker Compose.

### Workflow Secrets

| Secret Name     | Purpose                                         |
| --------------- | ----------------------------------------------- |
| `PI_HOST`       | DuckDNS hostname of the Raspberry Pi            |
| `PI_DEPLOY_KEY` | Private SSH key for GitHub-to-Pi authentication |

## NGINX Proxy Setup

NGINX Proxy Manager is used to forward public requests from `api.simostack.com` to the internal backend running on port `3080`, with SSL certificates managed via Let's Encrypt.

## License

This project is for educational and personal development use.
