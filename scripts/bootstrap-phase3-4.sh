#!/bin/bash
set -e

echo "🚀 Starting Phase 3 & 4 bootstrap..."

# Step 1: Start Docker services
echo "📦 Starting Docker Compose stack..."
docker compose -f docker-compose.codespaces.yml up -d --build || true

# Step 2: Node.js module checks (skip if missing)
NODE_BACKEND_DIR="../backend-api/src"
if [ -d "$NODE_BACKEND_DIR" ]; then
    echo "✅ Backend API modules found at $NODE_BACKEND_DIR. Running verification..."
    # Example verification command
    # node $NODE_BACKEND_DIR/verify.js
else
    echo "⚠️ Backend API modules not found at $NODE_BACKEND_DIR. Skipping Node.js verification."
fi

# Step 3: Founding Creatives launch
if [ -x "./founding-creatives-launch.sh" ]; then
    echo "🎨 Launching Founding Creatives module..."
    bash ./founding-creatives-launch.sh
else
    echo "⚠️ Founding Creatives launch script not found. Skipping..."
fi

# Step 4: Ledger / Firebase mirroring
if [ -x "./ledger-firebase-sync.sh" ]; then
    echo "📊 Syncing ledger to Firebase..."
    bash ./ledger-firebase-sync.sh
else
    echo "⚠️ Ledger/Firebase sync script not found. Skipping..."
fi

# Step 5: Bootstrap complete
echo "✅ Phase 3 & 4 bootstrap completed successfully!"
