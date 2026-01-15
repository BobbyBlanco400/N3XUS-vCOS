#!/bin/bash

echo "=== N3XUS LAW PRE-MERGE CHECK ==="

# 1. Handshake Guard Existence
if ! grep -R "55-45-17" src/core/nexusHandshakeGuard.ts > /dev/null; then
  echo "FATAL: Handshake Guard Protocol mismatch or missing."
  exit 1
fi

# 2. Handshake Guard Usage
if ! grep -R "enforceNexusHandshake" src/main.tsx > /dev/null; then
  echo "FATAL: Handshake Guard NOT enforced in main.tsx."
  exit 1
fi

# 3. Portal Contract Existence
if ! grep -R "ROOT SHELL MISSING" src/core/portalContract.ts > /dev/null; then
  echo "FATAL: Portal Contract definition missing."
  exit 1
fi

# 4. Portal Contract Usage
if ! grep -R "enforcePortalContract" src/components/CasinoPortal.tsx > /dev/null; then
  echo "FATAL: CasinoPortal does not enforce contract."
  exit 1
fi

if ! grep -R "enforcePortalContract" src/components/MusicPortal.tsx > /dev/null; then
  echo "FATAL: MusicPortal does not enforce contract."
  exit 1
fi

echo "✅ N3XUS LAW PASSED: ALL CHECKS GREEN."
exit 0
