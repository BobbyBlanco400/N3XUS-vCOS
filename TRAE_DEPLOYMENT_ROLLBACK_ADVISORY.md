# URGENT: VPS Deployment Rollback Advisory
**To: TRAE**  
**From: N3XUS v-COS Operations**  
**Date: January 16, 2026**  
**Priority: HIGH**

---

## 🚨 Situation Update

The VPS deployment attempted to deploy **98+ services simultaneously** which overloaded the server (3GB RAM insufficient for parallel builds). SSH connections are timing out, and the system is unresponsive.

**Immediate Action Required:** Roll back to canonical phased deployment to restore stability.

---

## ✅ Rollback Plan (LOCKED IN)

### Current Deployment Target
**13 Services Total** (Phases 3-9)

**Breakdown:**
- 2 Infrastructure (Postgres, Redis)
- 2 Phase 3-4: Core Runtime (v-supercore, puabo-api-ai-hf)
- 4 Phase 5-6: Federation (federation-spine, identity-registry, federation-gateway, attestation-service)
- 2 Phase 7-8: Domain Services (casino-core, ledger-engine)
- 3 Phase 9: Financial Services (wallet-engine, treasury-core, payout-engine)

### Timeline
- **January 16, 2026 (Today):** Deploy 13 services
- **January 16-18:** 48-hour settle mode (monitoring, no changes)
- **January 19, 2026:** System fully active

---

## 🔧 Steps for TRAE to Match Deployment

### Step 1: Access VPS When Available
Wait for VPS to recover from overload (SSH will be accessible again in 30min-2hrs).

```bash
# Test SSH connectivity
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 'uptime'
```

### Step 2: Stop All Running Containers
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'STOP'
cd /opt/nexus-cos
docker compose -f docker-compose.full.yml down
STOP
```

This will:
- Stop all overloaded build processes
- Free up RAM and CPU
- Clear any stuck containers

### Step 3: Deploy Canonical Phases 3-9
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'DEPLOY'
cd /opt/nexus-cos

# Pull latest scripts
git pull origin feature/phase3-4-launch

# Make script executable
chmod +x scripts/deploy-phase-3.sh

# Run canonical deployment (Phases 3-9)
bash scripts/deploy-phase-3.sh
DEPLOY
```

**Or manually sync and run from local:**
```bash
# From local dev environment
cd /workspaces/N3XUS-vCOS

# Sync deployment script to VPS
rsync -avz -e "ssh -i ~/.ssh/id_ed25519_vps" \
    scripts/deploy-phase-3.sh \
    root@72.62.86.217:/opt/nexus-cos/scripts/

# Execute on VPS
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 \
    'cd /opt/nexus-cos && bash scripts/deploy-phase-3.sh'
```

### Step 4: Verify Deployment
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'VERIFY'
cd /opt/nexus-cos

# Check running services
docker compose -f docker-compose.full.yml ps | grep "Up" | wc -l
# Expected: 13

# Test N3XUS LAW enforcement
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3001/
# Expected: HTTP 451 (without handshake)

curl -s -o /dev/null -w "HTTP %{http_code}\n" \
    -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/
# Expected: HTTP 200 (with handshake)

# Check resources
echo "Memory: $(free -h | awk 'NR==2 {print $3 " / " $2}')"
echo "Disk: $(df -h / | awk 'NR==2 {print $3 " / " $2}')"
VERIFY
```

---

## 📊 Expected Results

### Service Count
- **Before:** 53+ services (overloaded state)
- **After:** 13 services (stable state)

### Resource Usage
- **Memory:** ~1.5GB / 3.8GB (40% - healthy)
- **Disk:** ~25GB / 48GB (52% - healthy)
- **Load Average:** <2.0 (stable)

### Service Ports
```
3001  v-supercore
3002  puabo-api-ai-hf
3010  federation-spine
3011  identity-registry
3012  federation-gateway
3013  attestation-service
3020  casino-core
3030  ledger-engine
3040  wallet-engine
3041  treasury-core
3050  payout-engine
5432  postgres
6379  redis
```

---

## 🎯 Why This Rollback?

### Problem with 98+ Service Deployment
- **RAM Requirements:** ~16GB needed for parallel builds
- **Available RAM:** 3GB (insufficient)
- **Result:** OOM killer, SSH timeouts, system unresponsive

### Benefits of Canonical 13-Service Deployment
- **Stable:** Well within 3GB RAM capacity
- **Tested:** Proven phase-by-phase approach
- **Monitored:** 48-hour settle period ensures stability
- **Scalable:** Can add more phases after settle period

---

## 📅 Next Steps After Settlement

**Phase 10 (January 19+):**
- earnings-oracle
- pmmg-media-engine
- royalty-engine

**Phase 11-12 (TBD):**
- governance-core
- constitution-engine

**Compliance Layer (TBD):**
- 5 compliance services

**Total Future:** Can gradually scale to 21+ services over time

---

## 🔐 Critical Files Updated

**Repository:** BobbyBlanco400/N3XUS-vCOS  
**Branch:** feature/phase3-4-launch  
**Latest Commit:** 2d5dc90 "Deploy through Phase 9: 13 services total, 48hr settle"

**Key Files:**
- `scripts/deploy-phase-3.sh` - Canonical deployment script
- `docker-compose.full.yml` - Service orchestration
- All service Dockerfiles - N3XUS LAW enforcement

**All changes committed and pushed** - TRAE can pull latest from branch.

---

## ⚠️ Important Notes

### DO NOT:
- ❌ Deploy all 98+ services at once (will crash VPS)
- ❌ Run parallel builds without sufficient RAM
- ❌ Skip the settle period (stability critical)

### DO:
- ✅ Follow canonical phased rollout
- ✅ Monitor resources during deployment
- ✅ Wait 48 hours for settle period
- ✅ Add phases gradually after stable

---

## 📞 Coordination

**Status Sync Required:**
- [ ] TRAE confirms rollback plan received
- [ ] TRAE confirms VPS is accessible
- [ ] TRAE executes rollback to 13 services
- [ ] TRAE verifies deployment success (13 services up)
- [ ] Both teams in sync for 48-hour settle mode

**Communication Channel:**
- Repository: https://github.com/BobbyBlanco400/N3XUS-vCOS
- PR #2: https://github.com/BobbyBlanco400/N3XUS-vCOS/pull/2
- Branch: feature/phase3-4-launch

---

## 🎯 Success Criteria

✅ VPS accessible via SSH  
✅ 13 services running (not 98+)  
✅ Memory usage <50%  
✅ N3XUS LAW enforcement active (HTTP 451/200)  
✅ All services healthy  
✅ Enter 48-hour settle mode  
✅ System ready January 19, 2026  

---

**This rollback protects system stability and ensures both teams are aligned on the canonical phased deployment strategy.**

---

## Quick Reference Commands

```bash
# Check VPS status
ssh root@72.62.86.217 'uptime && free -h && docker ps --format "{{.Names}}" | wc -l'

# Emergency stop all
ssh root@72.62.86.217 'cd /opt/nexus-cos && docker compose down'

# Deploy canonical 13 services
ssh root@72.62.86.217 'cd /opt/nexus-cos && bash scripts/deploy-phase-3.sh'

# Monitor deployment
ssh root@72.62.86.217 'cd /opt/nexus-cos && watch -n 5 "docker ps --format \"{{.Names}}\t{{.Status}}\""'
```

---

**End of Advisory**
