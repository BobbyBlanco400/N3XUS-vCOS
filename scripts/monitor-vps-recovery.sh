#!/bin/bash
# N3XUS v-COS VPS Recovery Monitor
# Continuously checks VPS until it responds

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   N3XUS v-COS VPS Recovery Monitor                        ║"
echo "║   Checking 72.62.86.217 every 60 seconds                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "VPS is currently overloaded from building 47+ Docker images."
echo "This will monitor until it recovers."
echo ""
echo "Press Ctrl+C to stop monitoring"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ATTEMPT=1
START_TIME=$(date +%s)

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - START_TIME))
    ELAPSED_MIN=$((ELAPSED / 60))
    
    echo "[$ATTEMPT] $(date '+%H:%M:%S') (${ELAPSED_MIN}m elapsed) - Checking VPS..."
    
    # Try to connect with 8 second timeout
    if timeout 10 ssh -i "$HOME/.ssh/id_ed25519_vps" -o ConnectTimeout=8 -o StrictHostKeyChecking=no root@72.62.86.217 << 'VPS_CHECK' 2>/dev/null
cd /opt/nexus-cos
echo "✅ VPS IS ACCESSIBLE!"
echo ""
echo "Services Running: $(docker compose -f docker-compose.full.yml ps 2>/dev/null | grep -c Up || echo '0') / 101"
echo "Memory: $(free -h | awk 'NR==2 {print $3 " / " $2}')"
echo "Load: $(uptime | awk -F'load average:' '{print $2}')"
VPS_CHECK
    then
        echo ""
        echo "╔════════════════════════════════════════════════════════════╗"
        echo "║          🎉 VPS HAS RECOVERED!                            ║"
        echo "╚════════════════════════════════════════════════════════════╝"
        echo ""
        echo "Next steps:"
        echo "  1. Stop all containers: ssh root@72.62.86.217 'cd /opt/nexus-cos && docker compose down'"
        echo "  2. Reboot VPS: ssh root@72.62.86.217 'sudo reboot'"
        echo "  3. Wait 2 minutes for reboot"
        echo "  4. Run: bash scripts/smart-batch-deploy.sh (on VPS after RAM upgrade)"
        echo ""
        break
    fi
    
    echo "    Still overloaded... waiting 60 seconds"
    echo ""
    sleep 60
    ((ATTEMPT++))
    
    # Show status every 10 attempts (10 minutes)
    if [ $((ATTEMPT % 10)) -eq 0 ]; then
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "Status: Still waiting... (${ELAPSED_MIN} minutes elapsed)"
        echo "The VPS will recover when:"
        echo "  - Docker builds complete or are killed by OOM"
        echo "  - Memory pressure releases"
        echo "  - System stabilizes"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
    fi
done
