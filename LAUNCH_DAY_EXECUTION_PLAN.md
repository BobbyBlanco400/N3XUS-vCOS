# N3XUS v-COS – January 19 Launch Execution Plan

This document captures the **canonical rollout execution plan** for the N3XUS v‑COS stack,
aligned with the Canonical 13 baseline, Phases 2 / 2.5 / 3, and Phase 4 Global Launch.

> **Target Launch Date:** January 19, 2026  
> **Environment:** Production VPS (Canonical 13 + N3XUS LAW enforced)

---

## 0. Pre-Launch Baseline (Now → January 18)

**Goal:** Keep production stable on Canonical 13 + LAW while finishing build/test work in Codespaces and staging.

- Production VPS:
  - Keep only the **Canonical 13 services** running.
  - Maintain **N3XUS LAW** handshake enforcement:
    - Blocked without `X-N3XUS-Handshake: 55-45-17`
    - 200 OK with the handshake header.
  - Monitor:
    - `docker ps` (no unexpected containers or restart loops)
    - `free -h` and `uptime` (healthy memory/CPU)
- Codespaces / Staging:
  - Complete wiring for:
    - Remaining **Phase 2** modules
    - **Phase 2.5 OTT** (V-Suite / streaming)
    - **Phase 3 N3X-UP** (battle arena)
  - Validate PF overlays and configs:
    - `pfs/marketplace-phase2.yaml`
    - `pfs/marketplace-phase3.yaml`
    - `pfs/global-launch.yaml`
    - `pfs/founder-public-transition.yaml`
    - `pfs/nexus-expansion-master.yaml`
    - `pfs/nexus-master-launch-pf.yaml`
  - Ensure all risky changes are behind **feature flags** or overlays.

---

## 1. Launch Day Block 1 (08:00–11:00) – Preflight & GO/NO-GO

**Goal:** Confirm the Canonical 13 + LAW baseline is healthy and Phase 4 is "armed" but not executed.

Recommended commands (run from your workstation or Codespaces, targeting the VPS):

```bash
# 1. Container and system health
ssh root@72.62.86.217 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
ssh root@72.62.86.217 'free -h && uptime'

# 2. N3XUS LAW handshake enforcement
ssh root@72.62.86.217 'curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3001/'               # Expected: 451
ssh root@72.62.86.217 'curl -s -o /dev/null -w "HTTP %{http_code}\n" -H "X-N3XUS-Handshake: 55-45-17" http://localhost:3001/'  # Expected: 200

# 3. TRAE / canon-verifier check
ssh root@72.62.86.217 '
  cd /opt/nexus-cos/canon-verifier && \
  python3 inventory_phase/enumerate_services.py && \
  python3 extensions/docker_pm2_mapping.py && \
  python3 responsibility_validation/validate_claims.py && \
  python3 dependency_tests/dependency_graph.py && \
  python3 event_orchestration/canonical_events.py && \
  python3 meta_claim_validation/identity_metatwin_chain.py && \
  python3 hardware_simulation/simulate_vhardware.py && \
  python3 performance_sanity/check_runtime_health.py && \
  python3 final_verdict/generate_verdict.py
'
```

Then run **Phase 4 prechecks** (do not launch yet):

```bash
ssh root@72.62.86.217 '
  cd /opt/nexus-cos && \
  bash validate-phase4-deployment.sh
'
```

**Exit criteria for Block 1:**

- Canonical 13 services healthy.
- N3XUS LAW enforced (HTTP 451 without handshake, HTTP 200 with handshake).
- Canon-verifier / TRAE reports GO.
- `validate-phase4-deployment.sh` passes (prechecks green, rollback script can be generated).

---

## 2. Launch Day Block 2 (11:00–14:00) – Controlled Activation of Phases 2.5 and 3

**Goal:** Bring Phase 2.5 OTT and Phase 3 N3X‑UP online with **limited exposure** and tight monitoring.

### 2.1 Phase 2.5 – OTT / Streaming (Limited Exposure)

- Enable OTT-related feature flags to **internal/test users** or a small percentage.
- Verify routes from the public domain:

```bash
ssh root@72.62.86.217 '
  curl -I https://n3xuscos.online/v-suite/screen || true
  curl -I https://n3xuscos.online/v-suite/prompter || true
  curl -I https://n3xuscos.online/v-suite/caster || true
  curl -I https://n3xuscos.online/v-suite/stage || true
'
```

- Check logs and container status frequently:

```bash
ssh root@72.62.86.217 '
  docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
'
```

### 2.2 Phase 3 – N3X‑UP / Battle Arena (Internal Only)

- Enable N3X‑UP routes for internal/test accounts only (plus N3XUS LAW handshake).
- Test basic arena flows:

```bash
ssh root@72.62.86.217 '
  curl -f http://localhost/n3x-up/health     || true
  curl -f http://localhost/n3x-up/arena      || true
  curl -f http://localhost/n3x-up/battles    || true
  curl -f http://localhost/n3x-up/progression || true
'
```

- Monitor:
  - Resource usage under expected demo load.
  - Logs for N3X‑UP-related services.

**Exit criteria for Block 2:**

- OTT routes respond correctly, no crash loops.
- N3X‑UP arena works for internal/test users.
- System load is stable (no runaway CPU/memory).

---

## 3. Launch Day Block 3 (14:00–17:00) – Phase 4 Global Launch Execution

**Goal:** Execute the Phase 4 deployment script and move from internal/test exposure to real launch posture.

> **Important:** Phase 4 is fully documented in:
> - `PHASE_4_DEPLOYMENT_GUIDE.md`
> - `PHASE_4_QUICK_REFERENCE.md`
> - `PHASE_4_IMPLEMENTATION_COMPLETE.md`

### 3.1 Execute Phase 4 Script

Run the Phase 4 deployment script on the VPS (exact command may vary; follow the Phase 4 guide):

```bash
ssh root@72.62.86.217 '
  cd /opt/nexus-cos && \
  sudo ./deploy-phase-4-full-launch.sh
'
```

This should:

- Re-run prechecks.
- Generate a **rollback script** in the Phase 4 audit directory.
- Apply the **expansion overlay** (jurisdiction engine, marketplace, creator monetization, founder-to-public transition, global launch PF).

Verify:

```bash
ssh root@72.62.86.217 '
  ls -la /var/log/nexus-cos/phase4-audit/ && \
  tail -n 50 /var/log/nexus-cos/phase4-audit/deployment-*.log
'
```

### 3.2 Widen Feature Flags

After Phase 4 deployment succeeds:

- Widen marketplace and OTT flags from internal/test to your intended day-one audience.
- Gradually increase exposure if using percentage-based flags.

**Exit criteria for Block 3:**

- Phase 4 script completes successfully.
- Rollback script exists and is executable.
- Marketplace, OTT, and N3X‑UP are active at intended exposure levels.
- Canonical 13 backbone remains stable.

---

## 4. Launch Day Block 4 (17:00–End of Day) – Live Monitoring & Verification

**Goal:** Operate the stack in production under real traffic, with full visibility and an active rollback path.

### 4.1 Run Full Verification on Live Phase 4 Stack

Repeat the canon-verifier / TRAE pipeline on the now fully launched stack:

```bash
ssh root@72.62.86.217 '
  cd /opt/nexus-cos/canon-verifier && \
  python3 inventory_phase/enumerate_services.py && \
  python3 extensions/docker_pm2_mapping.py && \
  python3 responsibility_validation/validate_claims.py && \
  python3 dependency_tests/dependency_graph.py && \
  python3 event_orchestration/canonical_events.py && \
  python3 meta_claim_validation/identity_metatwin_chain.py && \
  python3 hardware_simulation/simulate_vhardware.py && \
  python3 performance_sanity/check_runtime_health.py && \
  python3 final_verdict/generate_verdict.py
'
```

### 4.2 Continuous Monitoring

Keep at least the following running in one or more terminals:

```bash
# Containers
ssh root@72.62.86.217 'watch -n 30 "docker ps --format \"table {{.Names}}\t{{.Status}}\t{{.Ports}}\""' 

# System resources
ssh root@72.62.86.217 'watch -n 30 "free -h && echo && uptime"'

# Gateway + LAW
ssh root@72.62.86.217 'watch -n 60 "curl -s -o /dev/null -w \"HTTP %{http_code}\n\" -H \"X-N3XUS-Handshake: 55-45-17\" http://localhost:3001/"'
```

### 4.3 Rollback Readiness

If any critical issue appears:

```bash
ssh root@72.62.86.217 '
  ls -la /var/log/nexus-cos/phase4-audit/rollback-*.sh && \
  sudo /var/log/nexus-cos/phase4-audit/rollback-*.sh
'
```

Use feature flags as the first line of defense (dial back exposure) before full rollback.

---

## 5. Summary

By following this plan:

- **Before the 19th:** All risky changes are built and tested off-box; production stays on Canonical 13 + LAW.
- **On the 19th:** You use the full day to:
  - Validate the baseline,
  - Bring Phases 2.5 and 3 online in controlled steps,
  - Execute Phase 4,
  - And monitor the fully launched system with rollback ready.

This document is intended to be committed to the repository and used as part of the launch-day PR for GitHub Codespaces collaborators.

