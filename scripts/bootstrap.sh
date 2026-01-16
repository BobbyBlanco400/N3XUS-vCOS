#!/bin/bash
# N3XUS COS v3.0 - Bootstrap Environment Setup
# Prepares system for 98+ microservices deployment

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     N3XUS COS v3.0 - BOOTSTRAP ENVIRONMENT SETUP          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check prerequisites
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Checking Prerequisites"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Docker
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version | awk '{print $3}' | sed 's/,//')
    echo -e "${GREEN}✅${NC} Docker installed: $DOCKER_VERSION"
else
    echo -e "${RED}❌${NC} Docker not found. Please install Docker."
    exit 1
fi

# Docker Compose
if docker compose version &> /dev/null; then
    COMPOSE_VERSION=$(docker compose version | awk '{print $4}')
    echo -e "${GREEN}✅${NC} Docker Compose installed: $COMPOSE_VERSION"
else
    echo -e "${RED}❌${NC} Docker Compose not found. Please install Docker Compose."
    exit 1
fi

# curl
if command -v curl &> /dev/null; then
    echo -e "${GREEN}✅${NC} curl installed"
else
    echo -e "${RED}❌${NC} curl not found. Please install curl."
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. System Requirements Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Available memory
TOTAL_MEM=$(free -g | awk '/^Mem:/{print $2}')
echo "Total Memory: ${TOTAL_MEM}GB"
if [ "$TOTAL_MEM" -lt 16 ]; then
    echo -e "${YELLOW}⚠️  Warning: 16GB+ RAM recommended for 98+ services${NC}"
else
    echo -e "${GREEN}✅${NC} Sufficient memory available"
fi

# Disk space
AVAILABLE_DISK=$(df -BG . | awk 'NR==2 {print $4}' | sed 's/G//')
echo "Available Disk: ${AVAILABLE_DISK}GB"
if [ "$AVAILABLE_DISK" -lt 50 ]; then
    echo -e "${YELLOW}⚠️  Warning: 50GB+ disk space recommended${NC}"
else
    echo -e "${GREEN}✅${NC} Sufficient disk space available"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Environment Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << 'ENVEOF'
# N3XUS COS v3.0 Environment Configuration

# N3XUS LAW Enforcement
N3XUS_HANDSHAKE=55-45-17

# Database Configuration
POSTGRES_DB=nexus_db
POSTGRES_USER=nexus
POSTGRES_PASSWORD=nexus_secure_pass
DATABASE_URL=postgresql://nexus:nexus_secure_pass@postgres:5432/nexus_db

# Redis Configuration
REDIS_URL=redis://redis:6379

# Service Configuration
NODE_ENV=production
LOG_LEVEL=info
ENVEOF
    echo -e "${GREEN}✅${NC} Created .env file"
else
    echo -e "${GREEN}✅${NC} .env file already exists"
fi

# Set file permissions
chmod 600 .env
echo -e "${GREEN}✅${NC} Set secure permissions on .env"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Docker Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Docker daemon
if docker info &> /dev/null; then
    echo -e "${GREEN}✅${NC} Docker daemon running"
else
    echo -e "${RED}❌${NC} Docker daemon not running. Please start Docker."
    exit 1
fi

# Create network if it doesn't exist
if docker network ls | grep -q "n3xus-vcos_nexus-net"; then
    echo -e "${GREEN}✅${NC} Docker network exists"
else
    docker network create n3xus-vcos_nexus-net 2>/dev/null || true
    echo -e "${GREEN}✅${NC} Created Docker network"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Service Directories"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SERVICE_COUNT=$(find services -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l)
echo "Service Directories: $SERVICE_COUNT"

if [ "$SERVICE_COUNT" -ge 98 ]; then
    echo -e "${GREEN}✅${NC} All service directories present"
else
    echo -e "${YELLOW}⚠️  Warning: Expected 98+ service directories, found $SERVICE_COUNT${NC}"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  BOOTSTRAP COMPLETE                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Review .env file for any custom configuration"
echo "  2. Run: bash scripts/full-stack-launch.sh"
echo "  3. Verify: bash scripts/verify-launch.sh"
echo ""
echo -e "${GREEN}Environment ready for N3XUS COS v3.0 deployment${NC}"
