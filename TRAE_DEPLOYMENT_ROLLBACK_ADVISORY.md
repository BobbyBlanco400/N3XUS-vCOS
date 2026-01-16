# URGENT: VPS Deployment Rollback Advisory
**To: TRAE | From: N3XUS v-COS Ops | Date: Jan 16, 2026 | Priority: HIGH**

---

## 🚨 Situation
VPS overloaded deploying 98+ services simultaneously. 3GB RAM insufficient for parallel builds. SSH timing out.

**Action:** Rollback to canonical 13-service deployment immediately.

---

## ✅ Deployment Target: 13 Services (Phases 3-9)

**Breakdown:**
- 2 Infrastructure: Postgres, Redis
- 2 Phase 3-4 Core: v-supercore, puabo-api-ai-hf
- 4 Phase 5-6 Federation: federation-spine, identity-registry, federation-gateway, attestation-service
- 2 Phase 7-8 Domain: casino-core, ledger-engine
- 3 Phase 9 Financial: wallet-engine, treasury-core, payout-engine

**Timeline:**
- **Jan 16 (Today):** Deploy 13 services
- **Jan 16-18:** 48hr settle mode
- **Jan 19:** System active

---

## 🔧 TRAE Action Steps

### 1. Wait for VPS Recovery (30min-2hrs)
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 'uptime'
```

### 2. Stop All Containers
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 \
  'cd /opt/nexus-cos && docker compose -f docker-compose.full.yml down'
```

### 3. Deploy Canonical Stack
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'EOF'
cd /opt/nexus-cos
git pull origin feature/phase3-4-launch
chmod +x scripts/deploy-phase-3.sh
bash scripts/deploy-phase-3.sh
EOF
```

### 4. Verify Deployment
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'EOF'
cd /opt/nexus-cos
echo "Services: $(docker compose -f docker-compose.full.yml ps | grep -c Up)/13"
curl -s -o /dev/null -w "No handshake: HTTP %{http_code}\n" http://localhost:3001/
curl -s -o /dev/null -w "With handshake: HTTP %{http_code}\n" -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/
echo "Memory: $(free -h | awk 'NR==2 {print $3"/"$2}')"
EOF
```

**Expected Results:**
- 13 services running (was 53+ overloaded)
- HTTP 451 without handshake, HTTP 200 with handshake
- Memory: ~1.5GB/3.8GB (40%)
- Load: <2.0

---

## 📋 Service Ports
```
3001  v-supercore          3010  federation-spine
3002  puabo-api-ai-hf      3011  identity-registry
3012  federation-gateway   3013  attestation-service
3020  casino-core          3030  ledger-engine
3040  wallet-engine        3041  treasury-core
3050  payout-engine        5432  postgres
6379  redis
```

---

## 🎯 Why Rollback?
- **98+ services needs:** 16GB RAM (parallel builds)
- **VPS has:** 3GB RAM → OOM killer, SSH timeout
- **13 services uses:** ~1.5GB RAM → stable

---

## 📅 After Settlement (Jan 19+)
- **Phase 10:** earnings-oracle, pmmg-media-engine, royalty-engine
- **Phase 11-12:** governance-core, constitution-engine
- **Compliance:** 5 services
- **Total Future:** Scale to 21+ services gradually

---

## 🔐 Updated Files
**Repo:** BobbyBlanco400/N3XUS-vCOS  
**Branch:** feature/phase3-4-launch  
**Commit:** 2d5dc90

**Key Files:**
- scripts/deploy-phase-3.sh
- docker-compose.full.yml

---

## ⚠️ Critical Rules
**DO NOT:** Deploy 98+ services at once, skip settle period  
**DO:** Follow phased rollout, monitor resources, wait 48hrs

---

## 📞 Coordination Checklist
- [ ] TRAE confirms plan received
- [ ] VPS accessible
- [ ] Rollback executed (13 services)
- [ ] Deployment verified
- [ ] Both teams in 48hr settle mode

**PR:** https://github.com/BobbyBlanco400/N3XUS-vCOS/pull/2

---

## Quick Commands
```bash
# Status check
ssh root@72.62.86.217 'uptime && free -h && docker ps | wc -l'

# Emergency stop
ssh root@72.62.86.217 'cd /opt/nexus-cos && docker compose down'

# Deploy
ssh root@72.62.86.217 'cd /opt/nexus-cos && bash scripts/deploy-phase-3.sh'
```

---

**This rollback ensures system stability and team alignment on canonical phased deployment.**
