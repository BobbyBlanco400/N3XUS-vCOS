#!/bin/bash
# N3XUS COS v3.0 - Full Stack Launch
# Deploys all 98+ microservices with orchestrated startup

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       N3XUS COS v3.0 - FULL STACK DEPLOYMENT              ║"
echo "║              98+ Microservices Launch                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Pre-flight Checks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ ! -f "docker-compose.full.yml" ]; then
    echo -e "${YELLOW}❌ docker-compose.full.yml not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅${NC} Starting full 98+ service stack..."
echo ""

docker compose -f docker-compose.full.yml down 2>/dev/null || true
docker compose -f docker-compose.full.yml up -d --build

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              DEPLOYMENT COMPLETE                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Wait 2-3 minutes for services to initialize, then run:"
echo "  bash scripts/verify-launch.sh"
