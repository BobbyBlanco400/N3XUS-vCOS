# START HERE: N3XUS v-COS Logo Deployment

## Quick Start (3 Steps)

### Step 1: Verify Canonical Source
```bash
ls -lh branding/official/N3XUS-vCOS.png
```

**Expected:** `N3XUS-vCOS.png` exists (226KB, 512x512)

### Step 2: Deploy to All Surfaces
```bash
bash scripts/deploy-holographic-logo.sh
```

**Result:** Canonical logo propagates to:
- `branding/logo.png`
- `frontend/public/assets/branding/logo.png`
- `admin/public/assets/branding/logo.png`
- `creator-hub/public/assets/branding/logo.png`

### Step 3: Verify Deployment
```bash
bash scripts/verify-logo-deployment.sh
```

**Expected:** All 4 targets verified (MD5 match canonical source)

---

## N3XUS LAW 55-45-17 Enforcement

**Single Source of Truth:**
- **ONLY modify:** `branding/official/N3XUS-vCOS.png`
- **NEVER edit:** Target locations directly

**Deployment Gate:**
- Bootstrap script blocks if canonical logo missing
- System startup requires logo verification

---

## Updating the Logo

```bash
# 1. Replace canonical source
cp /path/to/new-logo.png branding/official/N3XUS-vCOS.png

# 2. Deploy
bash scripts/deploy-holographic-logo.sh

# 3. Verify
bash scripts/verify-logo-deployment.sh

# 4. Commit
git add branding/ frontend/ admin/ creator-hub/
git commit -m "Update N3XUS v-COS logo"
```

---

## Architecture

```
branding/official/N3XUS-vCOS.png  ← Canonical source (modify only this)
          │
          └─→ scripts/deploy-holographic-logo.sh propagates to:
              ├─ branding/logo.png
              ├─ frontend/public/assets/branding/logo.png
              ├─ admin/public/assets/branding/logo.png
              └─ creator-hub/public/assets/branding/logo.png
```

---

## Troubleshooting

**Logo not deploying?**
```bash
# Check canonical source
file branding/official/N3XUS-vCOS.png

# Check permissions
chmod +x scripts/deploy-holographic-logo.sh
chmod +x scripts/verify-logo-deployment.sh
```

**MD5 mismatch?**
```bash
# Redeploy from canonical source
bash scripts/deploy-holographic-logo.sh
```

---

## Full Documentation

- **Complete Guide:** `docs/OFFICIAL_LOGO_DEPLOYMENT_GUIDE.md`
- **Quick Reference:** `docs/LOGO_DEPLOYMENT_QUICK_REFERENCE.md`
- **Implementation Details:** `docs/LOGO_DEPLOYMENT_IMPLEMENTATION_SUMMARY.md`

---

**N3XUS LAW 55-45-17:** One canonical source, holographic deployment, zero drift.
