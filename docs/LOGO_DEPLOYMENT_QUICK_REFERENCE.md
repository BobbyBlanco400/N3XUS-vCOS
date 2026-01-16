# N3XUS v-COS Logo Deployment - Quick Reference

## Commands

### Deploy Logo
```bash
bash scripts/deploy-holographic-logo.sh
```

### Verify Deployment
```bash
bash scripts/verify-logo-deployment.sh
```

### Update Logo
```bash
# 1. Replace canonical source
cp /path/to/new-logo.png branding/official/N3XUS-vCOS.png

# 2. Deploy
bash scripts/deploy-holographic-logo.sh

# 3. Verify
bash scripts/verify-logo-deployment.sh
```

---

## File Locations

### Canonical Source (modify only this)
```
branding/official/N3XUS-vCOS.png
```

### Deployment Targets (auto-generated)
```
branding/logo.png
frontend/public/assets/branding/logo.png
admin/public/assets/branding/logo.png
creator-hub/public/assets/branding/logo.png
```

---

## VPS Deployment

### Sync to VPS
```bash
# All branding
rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    branding/ root@72.62.86.217:/opt/nexus-cos/branding/

# Frontend
rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    frontend/public/assets/branding/ \
    root@72.62.86.217:/opt/nexus-cos/frontend/public/assets/branding/

# Admin
rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    admin/public/assets/branding/ \
    root@72.62.86.217:/opt/nexus-cos/admin/public/assets/branding/

# Creator Hub
rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    creator-hub/public/assets/branding/ \
    root@72.62.86.217:/opt/nexus-cos/creator-hub/public/assets/branding/
```

### Verify on VPS
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 \
    'cd /opt/nexus-cos && bash scripts/verify-logo-deployment.sh'
```

---

## Troubleshooting

### Logo Not Found
```bash
ls -lh branding/official/N3XUS-vCOS.png
```

### MD5 Mismatch
```bash
bash scripts/deploy-holographic-logo.sh
bash scripts/verify-logo-deployment.sh
```

### Permission Issues
```bash
chmod +x scripts/deploy-holographic-logo.sh
chmod +x scripts/verify-logo-deployment.sh
chmod -R u+w branding/ frontend/ admin/ creator-hub/
```

---

## N3XUS LAW 55-45-17

**Rule:** Modify ONLY `branding/official/N3XUS-vCOS.png`

**Propagation:** Automatic via deployment script

**Verification:** MD5 checksum validation

---

**Documentation:** See `docs/OFFICIAL_LOGO_DEPLOYMENT_GUIDE.md` for complete guide
