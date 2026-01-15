# CANONICAL RATIFICATION INDEX
**Quick Reference for N3XUS COS v3.0 State**

---

## 📍 Quick Commands

```bash
# Verify full stack operational status
bash final-verification.sh

# Deploy all 21 services
docker compose -f docker-compose.full.yml up -d --build

# Check service status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test handshake enforcement (should return HTTP 200)
curl -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/

# Test handshake enforcement (should return HTTP 451)
curl -i http://localhost:3001/

# View service logs
docker logs <service-name>

# Restart specific service
docker compose -f docker-compose.full.yml restart <service-name>

# Stop all services
docker compose -f docker-compose.full.yml down
```

---

## 📊 Service Status Table

| Service | Port | Phase | Status | Technology |
|---------|------|-------|--------|------------|
| v-supercore | 3001 | 3-4 | ✅ LIVE | Python/FastAPI |
| puabo-api-ai-hf | 3002 | 3-4 | ✅ LIVE | Node.js/Express |
| federation-spine | 3010 | 5-6 | ✅ LIVE | Python/FastAPI |
| identity-registry | 3011 | 5-6 | ✅ LIVE | Python/FastAPI |
| federation-gateway | 3012 | 5-6 | ✅ LIVE | Node.js/Express |
| attestation-service | 3013 | 5-6 | ✅ LIVE | Python/FastAPI |
| casino-core | 3020 | 7-8 | ✅ LIVE | Python/FastAPI |
| ledger-engine | 3030 | 7-8 | ✅ LIVE | Python/FastAPI |
| wallet-engine | 3040 | 9 | ✅ LIVE | Python/FastAPI |
| treasury-core | 3041 | 9 | ✅ LIVE | Python/FastAPI |
| payout-engine | 3050 | 9 | ✅ LIVE | Python/FastAPI |
| earnings-oracle | 3051 | 10 | ✅ LIVE | Python/FastAPI |
| pmmg-media-engine | 3060 | 10 | ✅ LIVE | Python/FastAPI |
| royalty-engine | 3061 | 10 | ✅ LIVE | Python/FastAPI |
| governance-core | 3070 | 11-12 | ✅ LIVE | Python/FastAPI |
| constitution-engine | 3071 | 11-12 | ✅ LIVE | Python/FastAPI |
| payment-partner | 4001 | Compliance | ✅ LIVE | Node.js/Express |
| jurisdiction-rules | 4002 | Compliance | ✅ LIVE | Python/FastAPI |
| responsible-gaming | 4003 | Compliance | ✅ LIVE | Node.js/Express |
| legal-entity | 4004 | Compliance | ✅ LIVE | Python/FastAPI |
| explicit-opt-in | 4005 | Compliance | ✅ LIVE | Node.js/Express |

---

## 🔐 N3XUS Handshake Protocol

**Signature**: `55-45-17`  
**Header**: `X-N3XUS-Handshake: 55-45-17`  
**Invalid Response**: HTTP 451 (Unavailable For Legal Reasons)  
**Valid Response**: HTTP 200 with service data

### Test Examples

```bash
# Valid handshake - returns service info
curl -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/
# {"service":"v-SuperCore","phase":"3-4","role":"Governance Authority","status":"operational"}

# Invalid handshake - returns 451
curl -i http://localhost:3001/
# HTTP/1.1 451 Unavailable For Legal Reasons
# {"error":"N3XUS LAW VIOLATION: Missing or invalid handshake"}

# Health check - no handshake required
curl http://localhost:3001/health
# {"status":"healthy","service":"v-supercore"}
```

---

## 📁 Key Files

| File | Purpose | Location |
|------|---------|----------|
| **docker-compose.full.yml** | 21-service orchestration | `/docker-compose.full.yml` |
| **services/README.md** | Service documentation | `/services/README.md` |
| **scripts/full-stack-launch.sh** | Deployment script | `/scripts/full-stack-launch.sh` |
| **scripts/verify-launch.sh** | Verification script | `/scripts/verify-launch.sh` |
| **final-verification.sh** | Canonical state verification | `/final-verification.sh` |
| **PR_CANONICAL_RATIFICATION_V3.md** | Official ratification doc | `/PR_CANONICAL_RATIFICATION_V3.md` |

---

## 🏗️ Architecture Principles

1. **Sovereignty First** - Each service is fully autonomous
2. **Zero Trust** - Every request validated, no implicit trust
3. **Immutable Infrastructure** - Rebuild instead of patch
4. **Graceful Degradation** - Continue operating if dependencies fail
5. **Observable by Default** - Health and metrics endpoints on all services

---

## 📈 Deployment Status

**Total Services**: 21  
**Operational**: 21 (100%)  
**Success Rate**: 100%  
**Handshake Compliance**: 21/21 (100%)  
**Last Verification**: 2026-01-15 21:30 UTC

---

## 🚨 Emergency Procedures

### Service Failure
```bash
# Check logs
docker logs <service-name>

# Restart service
docker compose -f docker-compose.full.yml restart <service-name>

# Force rebuild
docker compose -f docker-compose.full.yml up -d --build --force-recreate <service-name>
```

### Network Issues
```bash
# Recreate network
docker compose -f docker-compose.full.yml down
docker compose -f docker-compose.full.yml up -d
```

### Complete Reset (Nuclear Option)
```bash
# Stop all
docker compose -f docker-compose.full.yml down

# Remove volumes (if needed)
docker volume prune -f

# Rebuild everything
docker compose -f docker-compose.full.yml up -d --build
```

---

## 📞 Support References

- **Documentation**: `/services/README.md`
- **Ratification**: `/PR_CANONICAL_RATIFICATION_V3.md`
- **PR #2**: https://github.com/BobbyBlanco400/N3XUS-vCOS/pull/2
- **Branch**: `feature/phase3-4-launch`

---

## ✅ Verification Checklist

- [ ] All 21 services running (`docker ps`)
- [ ] Handshake enforcement active (test with curl)
- [ ] Health endpoints responding
- [ ] No container restart loops
- [ ] Logs showing clean startup
- [ ] Port mappings correct (3001-3071, 4001-4005)
- [ ] Network connectivity between services

---

**Last Updated**: 2026-01-15  
**Status**: ✅ N3XUS COS v3.0 OPERATIONAL
