#!/bin/bash
set -e

echo "🔍 N3XUS v-COS Launch Verification"
echo "===================================="

# Check if we're in Codespaces
if [ -n "$CODESPACES" ]; then
    echo "✅ Running in GitHub Codespaces"
    COMPOSE_FILE="docker-compose.codespaces.yml"
else
    echo "✅ Running in Production environment"
    COMPOSE_FILE="docker-compose.final.yml"
fi

# Check if Docker Compose file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ Docker Compose file not found: $COMPOSE_FILE"
    exit 1
fi
echo "✅ Docker Compose file found: $COMPOSE_FILE"

# Check Docker service
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not installed"
    exit 1
fi
echo "✅ Docker installed"

# Check running containers
echo ""
echo "📦 Checking running containers..."
RUNNING_CONTAINERS=$(docker ps --format "table {{.Names}}\t{{.Status}}" | grep -v NAMES || true)

if [ -z "$RUNNING_CONTAINERS" ]; then
    echo "⚠️  No containers currently running"
else
    echo "$RUNNING_CONTAINERS"
    CONTAINER_COUNT=$(docker ps -q | wc -l)
    echo "✅ $CONTAINER_COUNT container(s) running"
fi

# Check specific services
echo ""
echo "🔧 Checking N3XUS services..."
EXPECTED_SERVICES=("v-supercore" "puabo_api_ai_hf")

for service in "${EXPECTED_SERVICES[@]}"; do
    if docker ps --format "{{.Names}}" | grep -q "$service"; then
        echo "✅ $service is running"
    else
        echo "⚠️  $service is not running"
    fi
done

# Check scripts directory
echo ""
echo "📝 Checking deployment scripts..."
SCRIPTS=("bootstrap-phase3-4.sh" "phase3-4-ignite.sh" "founding-creatives-launch.sh")

for script in "${SCRIPTS[@]}"; do
    if [ -f "scripts/$script" ]; then
        echo "✅ scripts/$script exists"
    else
        echo "⚠️  scripts/$script not found"
    fi
done

echo ""
echo "===================================="
echo "✅ Launch verification complete!"
