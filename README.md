# Raspberry Pi Backend

This is my proudest project because it brings everything together — running a real backend service on a Raspberry Pi using tools I’ve genuinely enjoyed learning. It uses Docker, GitHub Actions, and NGINX Proxy Manager for secure reverse proxying, with deployments automated over SSH. Getting the networking right, exposing the API publicly, and wiring it all together on local hardware taught me a lot — and it made the whole thing feel real.

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

Very simple for now - this is just the start.

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
