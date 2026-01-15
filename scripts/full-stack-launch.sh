#!/bin/bash
set -e

echo "🚀 N3XUS v-COS Phase 3-12 Full Stack Launch"
echo "============================================"
echo ""
echo "📦 21 Microservices with N3XUS Handshake 55-45-17 enforcement"
echo "   Phase 3-4: Core Runtime (2)"
echo "   Phase 5-6: Federation (4)"
echo "   Phase 7-12: Domain Services (10)"
echo "   Nuisance: Compliance Layer (5)"
echo ""

# Detect environment
if [ -n "$CODESPACES" ]; then
    echo "💻 Environment: GitHub Codespaces"
    COMPOSE_FILE="docker-compose.codespaces.yml"
else
    echo "🖥️  Environment: Production"
    COMPOSE_FILE="docker-compose.full.yml"
fi

echo "📝 Using: $COMPOSE_FILE"
echo ""

# Start services
echo "🔨 Building and starting all services..."
docker compose -f $COMPOSE_FILE up -d --build --remove-orphans

echo ""
echo "✅ N3XUS v-COS Full Stack Deployed!"
echo ""
echo "🔍 Verifying services..."
sleep 5

# Count running containers
RUNNING=$(docker ps --format "{{.Names}}" | wc -l)
echo "   Running containers: $RUNNING"

echo ""
echo "🎯 Service Endpoints:"
echo "   Phase 3-4:  http://localhost:3001-3002"
echo "   Phase 5-6:  http://localhost:3010-3013"
echo "   Phase 7-12: http://localhost:3020-3071"
echo "   Compliance: http://localhost:4001-4005"
echo ""
echo "📊 Health Checks:"
echo "   curl http://localhost:3001/health"
echo "   curl -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/"
echo ""
echo "============================================"
