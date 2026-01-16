# N3XUS v-COS Official Logo Deployment Guide

## Overview

The N3XUS v-COS logo deployment system enforces **N3XUS LAW 55-45-17** by maintaining a single source of truth for all branding assets. This prevents logo drift across multiple application surfaces.

---

## System Architecture

### Canonical Source
**Location:** `branding/official/N3XUS-vCOS.png`

**Properties:**
- Format: PNG with transparency
- Dimensions: 512x512 pixels (recommended)
- Size: ~226KB
- Purpose: Single source of truth for all logos

**N3XUS LAW Enforcement:**
- Only this file should be modified for logo updates
- All other logos are propagated copies
- Bootstrap verification blocks system startup if missing

### Deployment Targets

1. **Root Branding:** `branding/logo.png`
   - Used by: Documentation, README, root-level references
   - Access: Public

2. **Frontend Application:** `frontend/public/assets/branding/logo.png`
   - Used by: Main web application UI
   - Access: Public (served at /assets/branding/logo.png)

3. **Admin Dashboard:** `admin/public/assets/branding/logo.png`
   - Used by: Administrative interface
   - Access: Authenticated users

4. **Creator Hub:** `creator-hub/public/assets/branding/logo.png`
   - Used by: Creator tools and management
   - Access: Creator accounts

---

## Deployment Process

### Automatic Deployment

**Command:**
```bash
bash scripts/deploy-holographic-logo.sh
```

**Process:**
1. Verifies canonical source exists
2. Creates target directories if missing
3. Copies canonical PNG to all 4 targets
4. Reports success/failure for each target
5. Returns exit code 0 on success, 1 on failure

**Output Example:**
```
╔════════════════════════════════════════════════════════════╗
║   N3XUS v-COS Holographic Logo Deployment                 ║
║   N3XUS LAW 55-45-17                                       ║
╚════════════════════════════════════════════════════════════╝

✅ Canonical source verified: branding/official/N3XUS-vCOS.png
   Size: 231424 bytes

✅ Deployed: branding/logo.png
✅ Deployed: frontend/public/assets/branding/logo.png
✅ Deployed: admin/public/assets/branding/logo.png
✅ Deployed: creator-hub/public/assets/branding/logo.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deployment Summary:
  ✅ Successful: 4/4
  ❌ Failed: 0/4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Holographic logo deployment complete!
   Run: bash scripts/verify-logo-deployment.sh
```

### Manual Deployment

If automatic deployment fails, manually copy the canonical source:

```bash
cp branding/official/N3XUS-vCOS.png branding/logo.png
cp branding/official/N3XUS-vCOS.png frontend/public/assets/branding/logo.png
cp branding/official/N3XUS-vCOS.png admin/public/assets/branding/logo.png
cp branding/official/N3XUS-vCOS.png creator-hub/public/assets/branding/logo.png
```

---

## Verification

### Automatic Verification

**Command:**
```bash
bash scripts/verify-logo-deployment.sh
```

**Validation:**
- MD5 checksum comparison (Linux: md5sum, macOS: md5)
- Fallback to file size comparison if MD5 unavailable
- Checks all 4 targets against canonical source

**Output Example:**
```
╔════════════════════════════════════════════════════════════╗
║   N3XUS v-COS Logo Deployment Verification                ║
║   N3XUS LAW 55-45-17                                       ║
╚════════════════════════════════════════════════════════════╝

✅ Canonical source: branding/official/N3XUS-vCOS.png
   MD5: 3c49109346849875ec117d02a61798eb

✅ VERIFIED: branding/logo.png
✅ VERIFIED: frontend/public/assets/branding/logo.png
✅ VERIFIED: admin/public/assets/branding/logo.png
✅ VERIFIED: creator-hub/public/assets/branding/logo.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verification Summary:
  ✅ Verified: 4/4
  ❌ Failed: 0/4
  ❓ Missing: 0/4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 All logo deployments verified! N3XUS LAW 55-45-17 compliant.
```

### Manual Verification

```bash
# Check canonical source
ls -lh branding/official/N3XUS-vCOS.png
file branding/official/N3XUS-vCOS.png

# Check all targets exist
ls -lh branding/logo.png
ls -lh frontend/public/assets/branding/logo.png
ls -lh admin/public/assets/branding/logo.png
ls -lh creator-hub/public/assets/branding/logo.png

# Compare MD5 checksums (Linux)
md5sum branding/official/N3XUS-vCOS.png branding/logo.png

# Compare MD5 checksums (macOS)
md5 branding/official/N3XUS-vCOS.png branding/logo.png
```

---

## Updating the Logo

### Process

1. **Replace canonical source:**
   ```bash
   cp /path/to/new-logo.png branding/official/N3XUS-vCOS.png
   ```

2. **Deploy to all surfaces:**
   ```bash
   bash scripts/deploy-holographic-logo.sh
   ```

3. **Verify deployment:**
   ```bash
   bash scripts/verify-logo-deployment.sh
   ```

4. **Commit changes:**
   ```bash
   git add branding/ frontend/ admin/ creator-hub/
   git commit -m "Update N3XUS v-COS official logo"
   git push origin feature/logo-update
   ```

5. **Deploy to VPS:**
   ```bash
   rsync -avz --delete branding/ root@YOUR_VPS_IP:/opt/nexus-cos/branding/
   rsync -avz --delete frontend/public/assets/branding/ root@YOUR_VPS_IP:/opt/nexus-cos/frontend/public/assets/branding/
   rsync -avz --delete admin/public/assets/branding/ root@YOUR_VPS_IP:/opt/nexus-cos/admin/public/assets/branding/
   rsync -avz --delete creator-hub/public/assets/branding/ root@YOUR_VPS_IP:/opt/nexus-cos/creator-hub/public/assets/branding/
   ```

### Recommendations

**Image Specifications:**
- Format: PNG with transparency (alpha channel)
- Dimensions: 512x512 pixels minimum (1024x1024 preferred)
- Color space: sRGB
- Compression: Optimized (use tools like pngquant)
- Max size: 500KB

**Testing:**
- Test on light and dark backgrounds
- Verify transparency renders correctly
- Check scaling at various sizes (32px, 64px, 128px, 256px)
- Validate browser compatibility (Chrome, Firefox, Safari, Edge)

---

## Bootstrap Integration

The system bootstrap script (`scripts/bootstrap.sh`) includes logo verification:

```bash
# Logo verification (N3XUS LAW 55-45-17 enforcement)
if [ ! -f "branding/official/N3XUS-vCOS.png" ]; then
    echo "❌ ERROR: Canonical logo not found: branding/official/N3XUS-vCOS.png"
    echo "   System cannot start without official branding."
    echo "   Run: bash scripts/deploy-holographic-logo.sh"
    exit 1
fi
```

**Enforcement:**
- Blocks system startup if canonical logo missing
- Ensures branding consistency from first boot
- Prevents deployment of unbranded systems

---

## VPS Deployment

### Initial Deployment

```bash
# Sync from local to VPS
rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    branding/ root@72.62.86.217:/opt/nexus-cos/branding/

rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    frontend/public/assets/branding/ root@72.62.86.217:/opt/nexus-cos/frontend/public/assets/branding/

rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    admin/public/assets/branding/ root@72.62.86.217:/opt/nexus-cos/admin/public/assets/branding/

rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    creator-hub/public/assets/branding/ root@72.62.86.217:/opt/nexus-cos/creator-hub/public/assets/branding/
```

### Verification on VPS

```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'VERIFY'
cd /opt/nexus-cos
bash scripts/verify-logo-deployment.sh
VERIFY
```

---

## Troubleshooting

### Canonical Source Not Found

**Error:**
```
❌ ERROR: Canonical source not found: branding/official/N3XUS-vCOS.png
```

**Solution:**
1. Verify you're in the project root directory
2. Check file exists: `ls -la branding/official/`
3. Re-download if missing: Contact repository administrator

### MD5 Mismatch

**Error:**
```
❌ MISMATCH: frontend/public/assets/branding/logo.png (MD5: abc123...)
```

**Solution:**
```bash
# Redeploy from canonical source
bash scripts/deploy-holographic-logo.sh

# Verify again
bash scripts/verify-logo-deployment.sh
```

### Permission Denied

**Error:**
```
cp: cannot create regular file 'frontend/public/assets/branding/logo.png': Permission denied
```

**Solution:**
```bash
# Fix directory permissions
chmod -R u+w frontend/public/assets/branding/
chmod -R u+w admin/public/assets/branding/
chmod -R u+w creator-hub/public/assets/branding/

# Make scripts executable
chmod +x scripts/deploy-holographic-logo.sh
chmod +x scripts/verify-logo-deployment.sh
```

### Missing Target Directories

**Error:**
```
❌ MISSING: frontend/public/assets/branding/logo.png
```

**Solution:**
```bash
# Create missing directories
mkdir -p frontend/public/assets/branding
mkdir -p admin/public/assets/branding
mkdir -p creator-hub/public/assets/branding

# Deploy again
bash scripts/deploy-holographic-logo.sh
```

---

## Integration with Applications

### Frontend (React/Vue/Angular)

```javascript
// Import logo from public assets
<img src="/assets/branding/logo.png" alt="N3XUS v-COS" />

// Or use as background
<div style="background-image: url('/assets/branding/logo.png')"></div>
```

### Admin Dashboard

```html
<!-- Logo in navigation -->
<nav class="navbar">
  <img src="/assets/branding/logo.png" alt="N3XUS v-COS Admin" class="logo" />
</nav>
```

### Creator Hub

```jsx
// React component
import Logo from '/assets/branding/logo.png';

function Header() {
  return (
    <header>
      <img src={Logo} alt="N3XUS v-COS Creator Hub" />
    </header>
  );
}
```

---

## Security Considerations

**Access Control:**
- Logo files are publicly accessible (served via HTTP)
- No authentication required
- Safe to cache aggressively

**Cache Headers:**
```nginx
location /assets/branding/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Content Security Policy:**
```
img-src 'self' data: https:;
```

---

## Performance Optimization

**Image Optimization:**
```bash
# Compress PNG (lossless)
pngquant --quality=80-95 branding/official/N3XUS-vCOS.png -o branding/official/N3XUS-vCOS-optimized.png

# Convert to WebP for web
cwebp -q 90 branding/official/N3XUS-vCOS.png -o branding/official/N3XUS-vCOS.webp
```

**Responsive Images:**
```html
<picture>
  <source srcset="/assets/branding/logo.webp" type="image/webp">
  <source srcset="/assets/branding/logo.png" type="image/png">
  <img src="/assets/branding/logo.png" alt="N3XUS v-COS">
</picture>
```

---

## N3XUS LAW 55-45-17 Compliance

**Principles:**
1. **Single Source of Truth:** One canonical file, multiple propagated copies
2. **Holographic Deployment:** Atomic updates across all surfaces
3. **Verification Enforcement:** Bootstrap blocks without validation
4. **Zero Drift:** MD5 checksums ensure bit-perfect replication

**Compliance Checklist:**
- [ ] Canonical source exists at `branding/official/N3XUS-vCOS.png`
- [ ] All 4 targets deployed and verified
- [ ] MD5 checksums match canonical source
- [ ] Bootstrap verification passes
- [ ] Documentation updated
- [ ] VPS deployment synchronized

---

## Support

**Issues:**
- GitHub: [BobbyBlanco400/N3XUS-vCOS/issues](https://github.com/BobbyBlanco400/N3XUS-vCOS/issues)
- Tag: `branding`, `logo-deployment`, `n3xus-law`

**Documentation:**
- Quick Start: `docs/START_HERE_LOGO_DEPLOYMENT.md`
- Quick Reference: `docs/LOGO_DEPLOYMENT_QUICK_REFERENCE.md`
- Implementation: `docs/LOGO_DEPLOYMENT_IMPLEMENTATION_SUMMARY.md`

---

**N3XUS LAW 55-45-17:** Canonical truth, holographic enforcement, zero compromise.
