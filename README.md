# Raspberry Pi Backend API

This is one of my proudest projects — a fully containerized backend service running on a Raspberry Pi, wired up with reverse proxying, CI/CD, and secure public access. It pulls together everything I’ve learned about Docker, deployment automation, network config, and running real services on local hardware.

## Stack

- **Node.js + Express** — REST API
- **PostgreSQL** — Relational database
- **Docker + Docker Compose** — Containerized deployment
- **NGINX Proxy Manager** — Reverse proxy & SSL via Let’s Encrypt
- **DuckDNS** — Dynamic DNS to track Pi’s public IP
- **GitHub Actions** — CI/CD pipeline triggered on `main` branch push
- **CORS** — Locked down to specific frontend origins

## Project Goals

- Run a real backend on a Raspberry Pi with production-style patterns
- Practice container orchestration, persistent volumes, and network exposure
- Secure the API with reverse proxy, SSL, and strict CORS policies
- Automate deployments via GitHub Actions over SSH

## Public Endpoint

Once deployed, the backend is live at:  
`https://api.simostack.com/posts`

Includes a `/health` endpoint for uptime monitoring.

## API Overview

**GET /posts** — Returns all blog posts  
**POST /posts** — Creates a new post  
**DELETE /posts/:id** — Deletes a post by ID  
**GET /health** — Simple API health check

## CI/CD Deployment

1. Push to `main` triggers a GitHub Actions workflow
2. Workflow connects to Raspberry Pi over SSH using a deploy key
3. App is pulled and restarted via `docker-compose`

### GitHub Secrets Used

| Secret          | Description                         |
| --------------- | ----------------------------------- |
| `PI_HOST`       | DuckDNS hostname of Raspberry Pi    |
| `PI_DEPLOY_KEY` | Private SSH key used for deployment |

## NGINX Proxy Configuration

Traffic to `api.simostack.com` is forwarded by **NGINX Proxy Manager** to the internal backend on port `3080`. SSL is handled automatically via **Let’s Encrypt**, and CORS is restricted to specific trusted domains.

## CORS Setup

The API is restricted to calls from `https://simostack.com` and `http://localhost:5173`, to allow safe development and production usage. All other origins are rejected silently.

## Code Snippet (CORS Configuration)

```js
const allowedOrigins = ["https://simostack.com", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false); // reject unknown origins
    },
    methods: ["GET", "POST", "DELETE"],
  })
);
```

## License

This project is open-source and built for personal development and learning.
