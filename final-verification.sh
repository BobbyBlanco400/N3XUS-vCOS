#!/bin/bash
# N3XUS COS v3.0 - Final Canonical State Verification
# Validates all 21 services are operational with N3XUS Handshake enforcement

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     N3XUS COS v3.0 - CANONICAL STATE VERIFICATION         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PASS_COUNT=0
FAIL_COUNT=0

# Function to test handshake
test_handshake() {
    local port=$1
    local name=$2
    local status
    
    # Use timeout command to prevent hanging
    status=$(timeout 5 curl -s -H 'X-N3XUS-Handshake: 55-45-17' -o /dev/null -w "%{http_code}" --connect-timeout 3 http://localhost:$port/ 2>/dev/null || echo "000")
    
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✅${NC} Port $port ($name): HTTP $status"
        PASS_COUNT=$((PASS_COUNT + 1))
        return 0
    elif [ "$status" = "000" ] || [ -z "$status" ]; then
        echo -e "${YELLOW}⏳${NC} Port $port ($name): Not responding"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        return 1
    else
        echo -e "${RED}❌${NC} Port $port ($name): HTTP $status"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        return 1
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Registry Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RUNNING=$(docker ps --filter "network=n3xus-vcos_default" --format "{{.Names}}" 2>/dev/null | wc -l)
echo "Services Running: $RUNNING/21"

if [ "$RUNNING" -lt 21 ]; then
    echo -e "${YELLOW}⚠️  Warning: Not all services are running${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Phase 3-4: Core Runtime"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 3001 "v-supercore"
test_handshake 3002 "puabo-api-ai-hf"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Phase 5-6: Federation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 3010 "federation-spine"
test_handshake 3011 "identity-registry"
test_handshake 3012 "federation-gateway"
test_handshake 3013 "attestation-service"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Phase 7-8: Casino Domain"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 3020 "casino-core"
test_handshake 3030 "ledger-engine"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Phase 9: Financial Core"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 3040 "wallet-engine"
test_handshake 3041 "treasury-core"
test_handshake 3050 "payout-engine"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. Phase 10: Earnings & Media"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 3051 "earnings-oracle"
test_handshake 3060 "pmmg-media-engine"
test_handshake 3061 "royalty-engine"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7. Phase 11-12: Governance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 3070 "governance-core"
test_handshake 3071 "constitution-engine"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8. Nuisance: Compliance Layer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
test_handshake 4001 "payment-partner"
test_handshake 4002 "jurisdiction-rules"
test_handshake 4003 "responsible-gaming"
test_handshake 4004 "legal-entity"
test_handshake 4005 "explicit-opt-in"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "9. N3XUS LAW Enforcement Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test invalid handshake (should return 451)
INVALID_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 --max-time 5 http://localhost:3001/ 2>/dev/null || echo "000")
if [ "$INVALID_STATUS" = "451" ]; then
    echo -e "${GREEN}✅${NC} Invalid handshake correctly rejected (HTTP 451)"
    PASS_COUNT=$((PASS_COUNT + 1))
else
    echo -e "${RED}❌${NC} Invalid handshake not rejected properly (HTTP $INVALID_STATUS)"
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi

# Test health endpoint (should work without handshake)
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 --max-time 5 http://localhost:3001/health 2>/dev/null || echo "000")
if [ "$HEALTH_STATUS" = "200" ]; then
    echo -e "${GREEN}✅${NC} Health endpoint accessible without handshake (HTTP 200)"
    PASS_COUNT=$((PASS_COUNT + 1))
else
    echo -e "${RED}❌${NC} Health endpoint not accessible (HTTP $HEALTH_STATUS)"
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "10. Economics & UI State"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "docker-compose.full.yml" ]; then
    echo -e "${GREEN}✅${NC} docker-compose.full.yml present"
    PASS_COUNT=$((PASS_COUNT + 1))
else
    echo -e "${RED}❌${NC} docker-compose.full.yml missing"
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi

if [ -f "services/README.md" ]; then
    echo -e "${GREEN}✅${NC} Service documentation present"
    PASS_COUNT=$((PASS_COUNT + 1))
else
    echo -e "${RED}❌${NC} Service documentation missing"
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi

if [ -f "PR_CANONICAL_RATIFICATION_V3.md" ]; then
    echo -e "${GREEN}✅${NC} Canonical ratification document present"
    PASS_COUNT=$((PASS_COUNT + 1))
else
    echo -e "${YELLOW}⚠️${NC} Canonical ratification document missing"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    VERIFICATION SUMMARY                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "  Passed: $PASS_COUNT"
echo "  Failed: $FAIL_COUNT"
echo "  Success Rate: $(awk "BEGIN {printf \"%.1f\", ($PASS_COUNT/($PASS_COUNT+$FAIL_COUNT))*100}")%"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}║              ✅ N3XUS COS v3.0 ONLINE                      ║${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}║  All 21 services operational with N3XUS LAW enforcement   ║${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Platform Version:  v3.0"
    echo "Operating Mode:    Phase 3-12 Microservices"
    echo "Registry:          Source of Truth"
    echo "N3XUS LAW:         ACTIVE (55-45-17)"
    echo "Authority:         Founder"
    echo "Status:            CANONICAL"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                                                            ║${NC}"
    echo -e "${RED}║              ⚠️  VERIFICATION FAILED                       ║${NC}"
    echo -e "${RED}║                                                            ║${NC}"
    echo -e "${RED}║  $FAIL_COUNT service(s) not responding correctly                  ║${NC}"
    echo -e "${RED}║                                                            ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Run 'docker compose -f docker-compose.full.yml logs' for details"
    exit 1
fi
