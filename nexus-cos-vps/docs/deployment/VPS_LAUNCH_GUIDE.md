# VPS Launch Guide: N3XUS COS

## Overview
This guide details how to launch the N3XUS Creative Operating System on a Virtual Private Server (VPS) running Ubuntu 22.04/24.04.

## Prerequisites
1. **VPS**: Ubuntu 22.04 LTS (min 4GB RAM, 2 vCPU).
2. **Domain**: `n3xuscos.online` pointing to VPS IP.
3. **Wildcard DNS**: `*.n3xuscos.online` pointing to VPS IP.

## Deployment Steps

### 1. Upload Code to VPS
Use `scp` or `git` to get the codebase onto your server.
```bash
scp -r nexus-cos-main user@your-vps-ip:/home/user/
```

### 2. Run Launch Script
SSH into your VPS and execute the launch script:
```bash
cd nexus-cos-main
chmod +x infra/vps/launch-vps.sh
./infra/vps/launch-vps.sh
```

### 3. SSL Configuration
The script will prompt you to run Certbot. For wildcard certificates, you may need DNS validation.
```bash
sudo certbot --nginx -d n3xuscos.online -d *.n3xuscos.online
```

## Verification
- **Main Platform**: https://n3xuscos.online
- **Tenant Example**: https://clubsaditty.n3xuscos.online

## Troubleshooting
- **Logs**: `docker compose -f docker-compose.prod.yml logs -f`
- **Nginx**: `sudo tail -f /var/log/nginx/error.log`
