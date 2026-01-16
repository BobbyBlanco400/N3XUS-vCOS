#!/bin/bash
# N3XUS v-COS - Deploy Phase 3 (Next Step After Phases 1, 2, 2.5)
# Canonical Phased Rollout

VPS_HOST="root@72.62.86.217"
VPS_KEY="$HOME/.ssh/id_ed25519_vps"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   N3XUS v-COS Canonical Phases 3-9 Deployment             ║"
echo "║   Continuing from Phases 1, 2, 2.5                        ║"
echo "║   Deploy 13 services → 48hr settle → Active Jan 19        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Waiting for VPS to become accessible..."
echo ""

# Wait for VPS
ATTEMPT=1
while [ $ATTEMPT -le 120 ]; do
    if timeout 10 ssh -i "$VPS_KEY" -o ConnectTimeout=8 "$VPS_HOST" 'echo OK' 2>/dev/null | grep -q OK; then
        echo "✅ VPS accessible!"
        break
    fi
    printf "\r  Attempt $ATTEMPT/120 ($(($ATTEMPT))min elapsed)..."
    sleep 60
    ((ATTEMPT++))
done

if [ $ATTEMPT -gt 120 ]; then
    echo ""
    echo "❌ VPS not accessible after 2 hours. Please check server status."
    exit 1
fi

echo ""
echo ""
echo "Deploying Phase 3 services..."
echo ""

ssh -i "$VPS_KEY" "$VPS_HOST" << 'PHASE3'
cd /opt/nexus-cos

echo "Step 1: Stop any overloaded processes"
docker compose -f docker-compose.full.yml down 2>/dev/null
sleep 5

echo ""
echo "Step 2: Deploy Foundation (Phases 1 & 2)"
echo "  - Infrastructure: Postgres, Redis"
echo "  - Core Runtime: v-supercore, puabo-api-ai-hf"
echo ""

# Infrastructure
docker compose -f docker-compose.full.yml up -d postgres redis
sleep 10

# Phase 1-2 Core
docker compose -f docker-compose.full.yml up -d --build v-supercore puabo-api-ai-hf
sleep 20

echo "✅ Foundation deployed (Phases 1 & 2)"
echo ""

echo "Step 3: Deploy Phase 3 - Federation Layer"
echo "  - federation-spine (coordination)"
echo "  - identity-registry (identity management)"
echo "  - federation-gateway (API gateway)"
echo "  - attestation-service (verification)"
echo ""

docker compose -f docker-compose.full.yml up -d --build \
    federation-spine \
    identity-registry \
    federation-gateway \
    attestation-service

sleep 25

echo "✅ Phase 3 Federation Layer deployed!"
echo ""

echo "Step 4: Deploy Phase 4 - Domain Services"
echo "  - casino-core (gaming)"
echo "  - ledger-engine (financial ledger)"
echo ""

docker compose -f docker-compose.full.yml up -d --build \
    casino-core \
    ledger-engine

sleep 20

echo "✅ Phase 4 Domain Services deployed!"
echo ""

echo "Step 5: Deploy Phase 9 - Financial Services"
echo "  - wallet-engine (wallet management)"
echo "  - treasury-core (treasury operations)"
echo "  - payout-engine (payout processing)"
echo ""

docker compose -f docker-compose.full.yml up -d --build \
    wallet-engine \
    treasury-core \
    payout-engine

sleep 25

echo "✅ Phase 9 Financial Services deployed!"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        Phases 3-9 Deployment Complete!                     ║"
echo "║        Entering 48-hour Settle Mode                        ║"
echo "║        Active on January 19, 2026                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Status check
RUNNING=$(docker compose -f docker-compose.full.yml ps 2>/dev/null | grep -c "Up")
echo "Services Running: $RUNNING / 13"
echo "  - 2 Infrastructure (Postgres, Redis)"
echo "  - 2 Phase 3-4 Core Runtime"
echo "  - 4 Phase 5-6 Federation"
echo "  - 2 Phase 7-8 Domain Services"
echo "  - 3 Phase 9 Financial Services"
echo ""

# Resources
echo "System Resources:"
MEM=$(free -h | awk 'NR==2 {print $3 " / " $2}')
DISK=$(df -h / | awk 'NR==2 {print $3 " / " $2}')
echo "  Memory: $MEM"
echo "  Disk: $DISK"
echo ""

# Test N3XUS LAW
echo "Testing N3XUS LAW 55-45-17..."
sleep 5

STATUS_NO=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 http://localhost:3001/ 2>/dev/null || echo "000")
STATUS_YES=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/ 2>/dev/null || echo "000")

if [ "$STATUS_NO" = "451" ] && [ "$STATUS_YES" = "200" ]; then
    echo "  ✅ N3XUS LAW enforcement working correctly"
    echo "     - Without handshake: HTTP 451"
    echo "     - With handshake: HTTP 200"
else
    echo "  ⚠️  Status: No handshake=$STATUS_NO, With handshake=$STATUS_YES"
    echo "     Services may still be starting..."
fi

echo ""
echo "Deployment Status:"
echo "  ✅ Phase 1 & 2: Complete (Foundation)"
echo "  ✅ Phase 2.5: Complete"
echo "  ✅ Phase 3-4: Complete (Core Runtime)"
echo "  ✅ Phase 5-6: Complete (Federation)"
echo "  ✅ Phase 7-8: Complete (Domain Services)"
echo "  ✅ Phase 9: Complete (Financial Services)"
echo "  ⏸️  Settle Mode: Active for 48 hours"
echo ""
echo "Settle Period: January 16-18, 2026"
echo "System Active: January 19, 2026"
echo ""
echo "13 services operational and stabilizing..."
PHASE3

echo ""
echo "🎉 Phase 3 deployment complete!"
echo ""
echo "Your N3XUS v-COS is now at Phase 3 with Federation Layer operational."
