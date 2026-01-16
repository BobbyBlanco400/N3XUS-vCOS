#!/bin/bash
set -e

echo "🚀 Phase 3 & 4 Ignition Starting..."

# --- Step 0: Detect environment ---
if [ -n "$CODESPACES" ]; then
    echo "💻 Running in Codespaces"
    COMPOSE_FILE="docker-compose.codespaces.yml"
else
    echo "🖥️ Running in Production"
    COMPOSE_FILE="docker-compose.final.yml"
fi

# --- Step 1: Start Docker stack ---
echo "📦 Starting Docker Compose stack ($COMPOSE_FILE)..."
docker compose -f $COMPOSE_FILE up -d --build || true

# --- Step 2: Run Phase 3 & 4 bootstrap ---
if [ -x "./bootstrap-phase3-4.sh" ]; then
    echo "🔧 Running Phase 3 & 4 bootstrap..."
    bash ./bootstrap-phase3-4.sh
else
    echo "⚠️ bootstrap-phase3-4.sh not found. Skipping..."
fi

# --- Step 3: Launch Founding Creatives ---
if [ -x "./founding-creatives-launch.sh" ]; then
    echo "🎨 Launching Founding Creatives..."
    bash ./founding-creatives-launch.sh
else
    echo "⚠️ founding-creatives-launch.sh not found. Skipping..."
fi

# --- Step 4: Optional Ledger/Firebase sync ---
if [ -x "./ledger-firebase-sync.sh" ]; then
    echo "📊 Syncing ledger to Firebase..."
    bash ./ledger-firebase-sync.sh
else
    echo "⚠️ ledger-firebase-sync.sh not found. Skipping..."
fi

# --- Step 5: Ignition complete ---
echo "✅ Phase 3 & 4 Ignition Complete!"
