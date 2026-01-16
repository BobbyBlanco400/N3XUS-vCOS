#!/bin/bash
# N3XUS COS v3.0 - Deployment Verification
# Tests 98+ services deployment with sampling strategy

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     N3XUS COS v3.0 - DEPLOYMENT VERIFICATION              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

# Test representative sample from each category
echo "Testing sample services from each category..."
echo ""

# Phase 3-4: Core Runtime
echo "━━ Phase 3-4: Core Runtime ━━"
curl -s -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/health >/dev/null && echo -e "${GREEN}✅${NC} v-supercore" && ((PASS++)) || echo -e "${RED}❌${NC} v-supercore" && ((FAIL++))

# Phase 5-6: Federation  
echo "━━ Phase 5-6: Federation ━━"
curl -s -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3010/health >/dev/null && echo -e "${GREEN}✅${NC} federation-spine" && ((PASS++)) || echo -e "${RED}❌${NC} federation-spine" && ((FAIL++))

# Compliance
echo "━━ Compliance Layer ━━"
curl -s -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:4001/health >/dev/null && echo -e "${GREEN}✅${NC} payment-partner" && ((PASS++)) || echo -e "${RED}❌${NC} payment-partner" && ((FAIL++))

# PUABO Universe
echo "━━ PUABO Universe ━━"
curl -s -H 'X-N3XUS-Handshake: 55-45-17' --connect-timeout 5 http://localhost:4010/health >/dev/null && echo -e "${GREEN}✅${NC} puabo-nexus-core" && ((PASS++)) || echo -e "${RED}❌${NC} puabo-nexus-core" && ((FAIL++))

# V-Suite
echo "━━ V-Suite ━━"
curl -s -H 'X-N3XUS-Handshake: 55-45-17' --connect-timeout 5 http://localhost:4030/health >/dev/null && echo -e "${GREEN}✅${NC} v-creative-studio" && ((PASS++)) || echo -e "${RED}❌${NC} v-creative-studio" && ((FAIL++))

# Extended Services
echo "━━ Extended Services ━━"
curl -s -H 'X-N3XUS-Handshake: 55-45-17' --connect-timeout 5 http://localhost:4051/health >/dev/null && echo -e "${GREEN}✅${NC} data-lake-manager" && ((PASS++)) || echo -e "${RED}❌${NC} data-lake-manager" && ((FAIL++))

# N3XUS LAW Enforcement Test
echo ""
echo "━━ N3XUS LAW Enforcement ━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 http://localhost:3001/ 2>/dev/null)
if [ "$STATUS" = "451" ]; then
    echo -e "${GREEN}✅${NC} HTTP 451 enforcement active"
    ((PASS++))
else
    echo -e "${RED}❌${NC} HTTP 451 enforcement failed (got $STATUS)"
    ((FAIL++))
fi

# Container count
echo ""
echo "━━ Container Status ━━"
RUNNING=$(docker compose -f docker-compose.full.yml ps | grep -c "Up" || echo "0")
echo "Containers Running: $RUNNING/101"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  VERIFICATION SUMMARY                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo "Containers: $RUNNING/101"
echo ""

if [ $FAIL -eq 0 ] && [ $RUNNING -ge 90 ]; then
    echo -e "${GREEN}✅ N3XUS COS v3.0 ONLINE${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some services may still be initializing${NC}"
    echo "Run: docker compose -f docker-compose.full.yml logs [service-name]"
    exit 1
fi
