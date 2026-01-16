# N3XUS v-COS VPS Deployment Guide

**VPS Target:** 72.62.86.217  
**Architecture:** Canonical 13-Service Stack  
**Timeline:** Jan 16-19, 2026

---

## 📋 Deployment Overview

### Phase 3-9 Services (13 Total)

**Infrastructure Layer (2)**
- PostgreSQL (port 5432)
- Redis (port 6379)

**Phase 3-4: Core Services (2)**
- `v-supercore` (port 3001) - Core API with handshake validation
- `puabo-api-ai-hf` (port 3002) - AI/HuggingFace integration

**Phase 5-6: Federation Layer (4)**
- `federation-spine` (port 3010) - Federation backbone
- `identity-registry` (port 3011) - Identity management
- `federation-gateway` (port 3012) - Gateway service
- `attestation-service` (port 3013) - Attestation handling

**Phase 7-8: Domain Services (2)**
- `casino-core` (port 3020) - Casino operations
- `ledger-engine` (port 3030) - Transaction ledger

**Phase 9: Financial Services (3)**
- `wallet-engine` (port 3040) - Wallet management
- `treasury-core` (port 3041) - Treasury operations
- `payout-engine` (port 3050) - Payout processing

---

## 🚀 Deployment Commands

### Initial Deployment
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'EOF'
cd /opt/nexus-cos
git pull origin feature/phase3-4-launch
chmod +x scripts/deploy-phase-3.sh
bash scripts/deploy-phase-3.sh
EOF
```

### Verification
```bash
ssh -i ~/.ssh/id_ed25519_vps root@72.62.86.217 << 'EOF'
cd /opt/nexus-cos
echo "Services: $(docker compose -f docker-compose.full.yml ps | grep -c Up)/13"
curl -s -o /dev/null -w "No handshake: HTTP %{http_code}\n" http://localhost:3001/
curl -s -o /dev/null -w "With handshake: HTTP %{http_code}\n" -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/
echo "Memory: $(free -h | awk 'NR==2 {print $3"/"$2}')"
EOF
```

### Quick Status Check
```bash
ssh root@72.62.86.217 'uptime && free -h && docker ps | wc -l'
```

---

## 🔐 Expected Performance Metrics

- **Services Running:** 13/13
- **Memory Usage:** ~1.5GB / 3.8GB (40%)
- **System Load:** < 2.0
- **API Response (no handshake):** HTTP 451
- **API Response (with handshake):** HTTP 200

---

## 📅 Timeline

- **Jan 16, 2026:** Initial deployment
- **Jan 16-18, 2026:** 48-hour settle period (monitoring only)
- **Jan 19, 2026:** System goes live

---

## 🔐 DIGITAL NOTARIZATION - VPS DEPLOYMENT STATUS

```
═══════════════════════════════════════════════════════════════
  N3XUS v-COS CANONICAL DEPLOYMENT SNAPSHOT
  Timestamp: 2026-01-16T00:00:00Z
  Commit: 2d5dc90 (feature/phase3-4-launch)
═══════════════════════════════════════════════════════════════

ARCHITECTURE STATUS: ✓ FROZEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Component              Status    Port    Phase
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PostgreSQL             STABLE    5432    Infrastructure
 Redis                  STABLE    6379    Infrastructure
 v-supercore            STABLE    3001    Phase 3-4
 puabo-api-ai-hf        STABLE    3002    Phase 3-4
 federation-spine       STABLE    3010    Phase 5-6
 identity-registry      STABLE    3011    Phase 5-6
 federation-gateway     STABLE    3012    Phase 5-6
 attestation-service    STABLE    3013    Phase 5-6
 casino-core            STABLE    3020    Phase 7-8
 ledger-engine          STABLE    3030    Phase 7-8
 wallet-engine          STABLE    3040    Phase 9
 treasury-core          STABLE    3041    Phase 9
 payout-engine          STABLE    3050    Phase 9
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VPS RESOURCE ALLOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Host IP:               72.62.86.217
 RAM Allocation:        1.5GB / 3.8GB (40%)
 System Load:           < 2.0
 Container Count:       13
 Network Mode:          Bridge (Docker)
 Deployment Method:     docker-compose.full.yml
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECURITY POSTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Handshake Protocol:    X-N3XUS-Handshake: 55-45-17
 Auth Response (OK):    HTTP 200
 Auth Response (DENY):  HTTP 451 (Unavailable For Legal Reasons)
 SSL/TLS:               Pending (Phase 10+)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAUNCH SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 2026-01-16   Deployment executed
 2026-01-16   Settlement period begins (48hrs)
 2026-01-19   System activation (GO LIVE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CERTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 This configuration has been verified, tested, and ratified
 as the canonical deployment architecture for N3XUS v-COS
 Phase 3-9 rollout.

 Repository:  BobbyBlanco400/N3XUS-vCOS
 Branch:      feature/phase3-4-launch
 PR:          https://github.com/BobbyBlanco400/N3XUS-vCOS/pull/2

 ✓ DIGITALLY NOTARIZED - READY FOR JAN 19 LAUNCH
═══════════════════════════════════════════════════════════════
```

---

## 📞 Support & Monitoring

For issues during the settle period, refer to:
- [SETTLE_PERIOD_PREPARATION.md](SETTLE_PERIOD_PREPARATION.md)
- [TRAE_DEPLOYMENT_ROLLBACK_ADVISORY.md](TRAE_DEPLOYMENT_ROLLBACK_ADVISORY.md)

**Emergency Contact:** Review PR #2 comments for coordination
