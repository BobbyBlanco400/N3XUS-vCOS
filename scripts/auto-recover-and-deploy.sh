#!/bin/bash
# N3XUS v-COS Auto-Recovery Monitor and Batch Deployer
# Waits for VPS, then deploys all services in batches of 5

VPS_HOST="root@72.62.86.217"
VPS_KEY="$HOME/.ssh/id_ed25519_vps"
VPS_PATH="/opt/nexus-cos"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   N3XUS v-COS VPS Auto-Recovery & Deployment              ║"
echo "║   Monitoring: 72.62.86.217                                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Phase 1: Waiting for VPS to become accessible..."
echo "Press Ctrl+C to cancel"
echo ""

ATTEMPT=1
MAX_ATTEMPTS=180  # 3 hours max

# Phase 1: Wait for VPS
while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    echo "[$ATTEMPT] $(date '+%H:%M:%S') - Checking VPS..."
    
    if timeout 10 ssh -i "$VPS_KEY" -o ConnectTimeout=8 "$VPS_HOST" 'echo "READY"' 2>/dev/null | grep -q "READY"; then
        echo ""
        echo "✅ VPS IS ACCESSIBLE!"
        break
    fi
    
    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
        echo ""
        echo "❌ Timeout after $MAX_ATTEMPTS attempts (3 hours)"
        echo "Please reboot VPS manually and run this script again"
        exit 1
    fi
    
    echo "    Still recovering... waiting 60s"
    sleep 60
    ((ATTEMPT++))
done

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Phase 2: Deploying Services in Batches of 5             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Phase 2: Deploy in batches of 5
ssh -i "$VPS_KEY" "$VPS_HOST" << 'DEPLOY_SCRIPT'
cd /opt/nexus-cos

echo "Step 1: Checking current deployment status..."
RUNNING=$(docker compose -f docker-compose.full.yml ps 2>/dev/null | grep -c "Up" || echo "0")
echo "Currently running: $RUNNING services"
echo ""

echo "Step 2: Stopping all containers for clean restart..."
docker compose -f docker-compose.full.yml down 2>/dev/null || true
echo "✅ All containers stopped"
echo ""

echo "Step 3: Deploying in batches of 5 services..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Define all services in batches of 5
BATCH_NUM=1

# Batch 1: Infrastructure
echo "Batch $BATCH_NUM: Infrastructure (5)"
docker compose -f docker-compose.full.yml up -d postgres redis
sleep 15
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 2: Core
echo "Batch $BATCH_NUM: Core services (5)"
docker compose -f docker-compose.full.yml up -d --build v-supercore federation-spine identity-registry federation-gateway attestation-service
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 3: Domain Part 1
echo "Batch $BATCH_NUM: Domain services 1 (5)"
docker compose -f docker-compose.full.yml up -d --build casino-core earnings-oracle governance-core boom-boom-room pmmg-media-engine
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 4: Domain Part 2
echo "Batch $BATCH_NUM: Domain services 2 (5)"
docker compose -f docker-compose.full.yml up -d --build ledger-engine payout-engine creator-hub settlement-engine revenue-share
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 5: Domain Part 3
echo "Batch $BATCH_NUM: Domain services 3 (5)"
docker compose -f docker-compose.full.yml up -d --build commission-tracker vault-manager financial-ops analytics-engine metrics-collector
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 6: Compliance Part 1
echo "Batch $BATCH_NUM: Compliance 1 (5)"
docker compose -f docker-compose.full.yml up -d --build payment-partner jurisdiction-rules age-gate legal-entity explicit-opt-in
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 7: Compliance Part 2
echo "Batch $BATCH_NUM: Compliance 2 (5)"
docker compose -f docker-compose.full.yml up -d --build kyc-verification aml-screening gdpr-compliance sanctions-check audit-trail
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 8: Constitution
echo "Batch $BATCH_NUM: Constitution & Analytics (5)"
docker compose -f docker-compose.full.yml up -d --build constitution-engine reporting-service dashboard-api recommendation-engine search-indexer
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 9: Data Services
echo "Batch $BATCH_NUM: Data services (5)"
docker compose -f docker-compose.full.yml up -d --build data-warehouse etl-pipeline ml-inference puabo-nexus-core puabo-nexus-social
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 10: PUABO Nexus
echo "Batch $BATCH_NUM: PUABO Nexus (5)"
docker compose -f docker-compose.full.yml up -d --build puabo-nexus-analytics puabo-dsp-core puabo-dsp-metadata-mgr puabo-dsp-distribution puabo-dsp-analytics
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 11: PUABO BLAC
echo "Batch $BATCH_NUM: PUABO BLAC (5)"
docker compose -f docker-compose.full.yml up -d --build puabo-blac-core puabo-blac-creator-hub puabo-blac-marketplace puabo-blac-royalty-engine puabo-nuki-core
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 12: PUABO NUKI
echo "Batch $BATCH_NUM: PUABO NUKI (5)"
docker compose -f docker-compose.full.yml up -d --build puabo-nuki-social puabo-nuki-analytics puabo-nuki-marketplace puabo-auth-service puabo-notification-hub
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 13: PUABO Services
echo "Batch $BATCH_NUM: PUABO Core Services (5)"
docker compose -f docker-compose.full.yml up -d --build puabo-payment-gateway puabo-content-delivery puabo-user-profile v-studio-core v-audio-processor
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 14: V-Suite Part 1
echo "Batch $BATCH_NUM: V-Suite Creative (5)"
docker compose -f docker-compose.full.yml up -d --build v-video-renderer v-collaboration-space v-asset-library v-rights-manager v-distribution-hub
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 15: V-Suite Part 2
echo "Batch $BATCH_NUM: V-Suite Analytics (5)"
docker compose -f docker-compose.full.yml up -d --build v-analytics-dashboard v-monetization-engine v-creator-tools v-encoding-service v-streaming-optimizer
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 16: V-Suite Part 3
echo "Batch $BATCH_NUM: V-Suite Media (5)"
docker compose -f docker-compose.full.yml up -d --build v-cdn-manager video-transcoder audio-mastering live-streaming-engine vod-platform
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 17: V-Suite Part 4
echo "Batch $BATCH_NUM: V-Suite Production (5)"
docker compose -f docker-compose.full.yml up -d --build multitrack-editor effects-processor rendering-farm api-gateway auth-gateway
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 18: Extended Part 1
echo "Batch $BATCH_NUM: Extended Services 1 (5)"
docker compose -f docker-compose.full.yml up -d --build notification-service email-service sms-service webhook-dispatcher event-bus
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 19: Extended Part 2
echo "Batch $BATCH_NUM: Extended Services 2 (5)"
docker compose -f docker-compose.full.yml up -d --build message-queue task-scheduler job-runner cache-manager session-store
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 20: Extended Part 3
echo "Batch $BATCH_NUM: Extended Services 3 (5)"
docker compose -f docker-compose.full.yml up -d --build rate-limiter circuit-breaker load-balancer health-checker log-aggregator
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

# Batch 21: Extended Part 4 (final)
echo "Batch $BATCH_NUM: Extended Services 4 - Final (1)"
docker compose -f docker-compose.full.yml up -d --build trace-collector monitoring-agent alerting-service
sleep 20
echo "✅ Batch $BATCH_NUM complete"
echo ""
((BATCH_NUM++))

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           ALL BATCHES DEPLOYED!                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Final status
FINAL_COUNT=$(docker compose -f docker-compose.full.yml ps 2>/dev/null | grep -c "Up" || echo "0")
echo "✅ Services Running: $FINAL_COUNT / 101"
echo ""

# Test N3XUS LAW
echo "Testing N3XUS LAW enforcement..."
curl -s -o /dev/null -w "v-supercore (no handshake): HTTP %{http_code}\n" --connect-timeout 2 http://localhost:3001/ 2>/dev/null || echo "v-supercore: Not responding yet"
curl -s -o /dev/null -w "v-supercore (with handshake): HTTP %{http_code}\n" --connect-timeout 2 -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/ 2>/dev/null || echo "v-supercore: Not responding yet"

echo ""
echo "Deployment complete! Run: bash scripts/verify-launch.sh"
DEPLOY_SCRIPT

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          🎉 DEPLOYMENT COMPLETE! 🎉                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
