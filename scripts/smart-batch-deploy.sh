#!/bin/bash
# N3XUS COS v3.0 - Smart Batch Deployment
# Deploys 100 services in resource-aware batches

set -e

cd /opt/nexus-cos

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   N3XUS v-COS Smart Batch Deployment                      ║"
echo "║   100 Services in 10 Batches (10 services each)           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check current state
RUNNING=$(docker compose -f docker-compose.full.yml ps 2>/dev/null | grep -c "Up" || echo "0")
echo "Currently Running: $RUNNING services"
echo ""

# Define batches (10 services each)
BATCHES=(
    # Batch 1: Infrastructure + Core (10)
    "postgres redis v-supercore federation-spine identity-registry federation-gateway attestation-service casino-core earnings-oracle governance-core"
    
    # Batch 2: Core Domain Services (10)
    "boom-boom-room pmmg-media-engine ledger-engine payout-engine creator-hub settlement-engine revenue-share commission-tracker vault-manager financial-ops"
    
    # Batch 3: Compliance Layer (10)
    "payment-partner jurisdiction-rules age-gate legal-entity explicit-opt-in kyc-verification aml-screening gdpr-compliance sanctions-check audit-trail"
    
    # Batch 4: Constitution + Analytics (10)
    "constitution-engine analytics-engine metrics-collector reporting-service dashboard-api recommendation-engine search-indexer data-warehouse etl-pipeline ml-inference"
    
    # Batch 5: PUABO Nexus + DSP (10)
    "puabo-nexus-core puabo-nexus-social puabo-nexus-analytics puabo-dsp-core puabo-dsp-metadata-mgr puabo-dsp-distribution puabo-dsp-analytics puabo-blac-core puabo-blac-creator-hub puabo-blac-marketplace"
    
    # Batch 6: PUABO BLAC + NUKI (10)
    "puabo-blac-royalty-engine puabo-nuki-core puabo-nuki-social puabo-nuki-analytics puabo-nuki-marketplace puabo-auth-service puabo-notification-hub puabo-payment-gateway puabo-content-delivery puabo-user-profile"
    
    # Batch 7: V-Suite Creative (10)
    "v-studio-core v-audio-processor v-video-renderer v-collaboration-space v-asset-library v-rights-manager v-distribution-hub v-analytics-dashboard v-monetization-engine v-creator-tools"
    
    # Batch 8: V-Suite Production (10)
    "v-encoding-service v-streaming-optimizer v-cdn-manager video-transcoder audio-mastering live-streaming-engine vod-platform multitrack-editor effects-processor rendering-farm"
    
    # Batch 9: Extended Services Part 1 (10)
    "api-gateway auth-gateway notification-service email-service sms-service webhook-dispatcher event-bus message-queue task-scheduler job-runner"
    
    # Batch 10: Extended Services Part 2 (10)
    "cache-manager session-store rate-limiter circuit-breaker load-balancer health-checker log-aggregator trace-collector monitoring-agent alerting-service"
)

BATCH_NUM=1
TOTAL_BATCHES=${#BATCHES[@]}

for batch in "${BATCHES[@]}"; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Batch $BATCH_NUM/$TOTAL_BATCHES: Deploying 10 services"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Deploy batch
    echo "Services: $batch"
    echo ""
    
    if docker compose -f docker-compose.full.yml up -d --build $batch 2>&1 | tail -20; then
        echo "✅ Batch $BATCH_NUM deployed successfully"
    else
        echo "⚠️  Batch $BATCH_NUM had issues (continuing...)"
    fi
    
    # Wait between batches to allow services to stabilize
    if [ $BATCH_NUM -lt $TOTAL_BATCHES ]; then
        echo ""
        echo "Waiting 30 seconds for services to stabilize..."
        sleep 30
        
        # Check memory
        MEM_USED=$(free -m | awk 'NR==2 {print $3}')
        MEM_TOTAL=$(free -m | awk 'NR==2 {print $2}')
        MEM_PERCENT=$((MEM_USED * 100 / MEM_TOTAL))
        echo "Memory: $MEM_USED/$MEM_TOTAL MB ($MEM_PERCENT%)"
        
        if [ $MEM_PERCENT -gt 85 ]; then
            echo "⚠️  Memory usage high, waiting extra 30 seconds..."
            sleep 30
        fi
        
        echo ""
    fi
    
    ((BATCH_NUM++))
done

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           Batch Deployment Complete!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Final status
RUNNING=$(docker compose -f docker-compose.full.yml ps 2>/dev/null | grep -c "Up" || echo "0")
echo "Services Running: $RUNNING / 101"
echo ""
echo "Run verification: bash scripts/verify-launch.sh"
