# Settle Period Preparation Workflow
**Date:** January 16-18, 2026  
**Status:** VPS in 48-hour settle mode (no changes)  
**Focus:** Codespaces preparation for January 19 launch

---

## Current VPS State (DO NOT TOUCH)

**Deployed:** Canonical 13 services  
**Memory:** 31% (1.2GB/3.8GB)  
**N3XUS LAW:** HTTP 451/200 enforcement active  
**Protocol:** Monitoring only, no changes

---

## Codespaces Preparation Tasks

### 1. Feature Flags Verification ✅

**Location:** `nexus-cos-vps/config/feature-flags.json`

**Critical Flags to Configure:**

```json
{
  "OTT_STREAMING_ENABLED": {
    "enabled": false,
    "description": "Phase 2.5 OTT / V-Suite streaming",
    "type": "boolean",
    "default": false,
    "category": "streaming",
    "exposure": "internal_only"
  },
  "N3X_UP_ARENA_ENABLED": {
    "enabled": false,
    "description": "Phase 3 N3X-UP Battle Arena",
    "type": "boolean",
    "default": false,
    "category": "gaming",
    "exposure": "internal_only"
  },
  "MARKETPLACE_PHASE2_ENABLED": {
    "enabled": false,
    "description": "Marketplace preview mode",
    "type": "boolean",
    "default": false,
    "category": "marketplace",
    "exposure": "internal_only"
  }
}
```

**Verification Command:**
```bash
cd /workspaces/N3XUS-vCOS/nexus-cos-vps
cat config/feature-flags.json | jq '.feature_flags | to_entries[] | select(.value.enabled == true)'
```

**Expected:** All flags should be `false` or `internal_only` before launch day.

---

### 2. Canon-Verifier Dry Run 🔍

**Location:** `nexus-cos-vps/canon-verifier/`

**Run Full Verification:**
```bash
cd /workspaces/N3XUS-vCOS/nexus-cos-vps/canon-verifier

# Execute full verification pipeline
python3 run_verification.py

# Expected phases:
# - Phase 1: Service Inventory
# - Phase 2: Docker/PM2 Mapping
# - Phase 3: Responsibility Validation
# - Phase 4: Dependency Graph
# - Phase 5: Event Orchestration
# - Phase 6: Meta-Claim Validation
# - Phase 7: Hardware Simulation
# - Phase 8: Performance Sanity
# - Phase 9: Final Verdict
```

**Check Results:**
```bash
# View verification output
ls -la canon-verifier/output/

# Check verdict
cat canon-verifier/output/final-verdict.json
```

**Success Criteria:**
- All phases complete without errors
- No circular dependencies detected
- Performance sanity checks pass
- Final verdict: GO

---

### 3. VPS Monitoring (Remote, Non-Intrusive) 📊

**Create Monitoring Script:**
```bash
cd /workspaces/N3XUS-vCOS

cat <<'EOF' > monitor-vps-settle.sh
#!/usr/bin/env bash
# VPS Settle Period Monitoring (Read-Only)
# Run this every few hours during Jan 16-18

VPS_IP="72.62.86.217"

echo "=== VPS Settle Period Health Check ==="
echo "Date: $(date)"
echo ""

echo "1. System Resources:"
ssh root@$VPS_IP 'free -h && echo && uptime'
echo ""

echo "2. Container Status (should be 13):"
ssh root@$VPS_IP 'docker ps --format "table {{.Names}}\t{{.Status}}" | head -n 15'
echo ""

echo "3. Container Count:"
ssh root@$VPS_IP 'docker ps -q | wc -l'
echo ""

echo "4. N3XUS LAW Enforcement:"
echo -n "Without handshake: "
ssh root@$VPS_IP 'curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3001/'
echo -n "With handshake: "
ssh root@$VPS_IP 'curl -s -o /dev/null -w "HTTP %{http_code}\n" -H "X-N3XUS-Handshake: 55-45-17" http://localhost:3001/'
echo ""

echo "5. Service Health Summary:"
ssh root@$VPS_IP 'docker ps --filter "status=running" | wc -l'
echo " running"
ssh root@$VPS_IP 'docker ps --filter "health=unhealthy" | wc -l'
echo " unhealthy (acceptable if responding)"
echo ""

echo "=== Settle Period Checklist ==="
echo "[ ] Memory <40%"
echo "[ ] Load average <3.0"
echo "[ ] 13 containers running"
echo "[ ] N3XUS LAW: 451 without handshake"
echo "[ ] N3XUS LAW: 200 with handshake"
echo "[ ] No unexpected restarts"
echo ""
EOF

chmod +x monitor-vps-settle.sh
```

**Run Monitoring:**
```bash
# Check VPS health (run every 6-12 hours)
./monitor-vps-settle.sh

# Expected output:
# - Memory: <40% (stable)
# - Load: <3.0 (stable)
# - 13 containers running
# - N3XUS LAW enforcing (451/200)
```

---

### 4. Phase 2.5 & 3 Code Review 📝

**Phase 2.5 OTT Checklist:**
```bash
# Check V-Suite routing configuration
grep -r "v-suite" nexus-cos-vps/deployment/nginx/
grep -r "OTT_STREAMING" nexus-cos-vps/backend/

# Verify feature flag integration
grep -r "enable_ott_streaming" nexus-cos-vps/
```

**Phase 3 N3X-UP Checklist:**
```bash
# Check N3X-UP routing
grep -r "n3x-up" nexus-cos-vps/deployment/nginx/
grep -r "N3X_UP_ARENA" nexus-cos-vps/backend/

# Verify battle arena services
ls -la nexus-cos-vps/services/battle-arena/
```

**Action Items:**
- [ ] All OTT routes behind `OTT_STREAMING_ENABLED` flag
- [ ] All N3X-UP routes behind `N3X_UP_ARENA_ENABLED` flag
- [ ] Internal/test user detection implemented
- [ ] Graceful degradation if flags disabled

---

### 5. Phase 4 Preparation 🚀

**Verify Phase 4 Documentation:**
```bash
cd /workspaces/N3XUS-vCOS

# Check Phase 4 guides exist
ls -la PHASE_4_*.md
ls -la nexus-cos-vps/pfs/global-launch.yaml
ls -la nexus-cos-vps/pfs/founder-public-transition.yaml
```

**Review Phase 4 Dependencies:**
```bash
# Check jurisdiction engine
ls -la nexus-cos-vps/services/jurisdiction-*/

# Check marketplace expansion
grep -r "MARKETPLACE_PHASE" nexus-cos-vps/config/

# Check creator monetization
ls -la nexus-cos-vps/services/creator-monetization/
```

---

## Daily Settle Period Routine

**Morning Check (08:00):**
```bash
./monitor-vps-settle.sh > logs/vps-settle-$(date +%Y%m%d-%H%M).log
```

**Afternoon Check (14:00):**
```bash
./monitor-vps-settle.sh > logs/vps-settle-$(date +%Y%m%d-%H%M).log
```

**Evening Check (20:00):**
```bash
./monitor-vps-settle.sh > logs/vps-settle-$(date +%Y%m%d-%H%M).log
```

**Analysis:**
```bash
# Compare memory usage across checks
grep "Memory usage" logs/vps-settle-*.log

# Check for any container restarts
grep "Up" logs/vps-settle-*.log | grep -v "Up [0-9]* hours"
```

---

## Red Flags to Watch For

🚨 **Immediate Attention Required:**
- Memory usage >50%
- Load average >5.0
- Any container restarts
- N3XUS LAW enforcement failure (200 without handshake)
- Container count ≠ 13

⚠️ **Monitor Closely:**
- Memory creeping upward (trending toward 50%)
- Load average >3.0
- "Unhealthy" containers (acceptable if responding correctly)
- Disk usage >70%

✅ **Normal/Expected:**
- Memory 30-40% (stable)
- Load 1.0-2.0 (stable)
- Services showing "unhealthy" but responding with HTTP 451/200
- Postgres/Redis showing "healthy"

---

## Pre-Launch Day Checklist (Jan 18 EOD)

- [ ] Canon-verifier passes all phases
- [ ] Feature flags configured and tested
- [ ] Phase 2.5 code behind flags
- [ ] Phase 3 code behind flags
- [ ] Phase 4 documentation reviewed
- [ ] VPS settle period logs show stability
- [ ] No memory/CPU issues detected
- [ ] TRAE coordination advisory sent
- [ ] Launch day plan reviewed

**If all checks pass:** Ready for January 19 launch execution.

---

## Emergency Contacts

**TRAE Team:** See TRAE_DEPLOYMENT_ROLLBACK_ADVISORY.md  
**Canon-Verifier Issues:** Run `python3 canon-verifier/run_verification.py --debug`  
**VPS Emergency:** See rollback_canonical_13.sh on VPS  

---

**Remember:** During settle period, VPS is **READ-ONLY**. All preparation work happens in Codespaces.
