# N3XUS COS - Creator Stack Template (v2.5.0)

This is the standard scaffold for deploying a new Tenant-Mini Platform.

## 📦 Contents

- `infra/`: Docker Compose & NGINX configs
- `services/`: Backend microservices (Node.js/Go)
- `frontend/`: React + Vite SPA
- `telemetry/`: Usage tracking (Privacy Preserved)

## 🚀 Quick Start

```bash
# Initialize
./init-stack.sh

# Start Dev Server
npm run dev

# Deploy
./deploy.sh
```

## 🔐 Handshake 55-45-17

This stack is pre-configured to comply with N3XUS Governance.
**DO NOT MODIFY** `services/handshake.ts` or `infra/revenue-split.conf`.
