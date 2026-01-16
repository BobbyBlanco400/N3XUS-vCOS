#!/bin/bash
# scripts/founding-creatives-launch.sh
# Founding Creatives Launch for N3XUS v-COS

set -euo pipefail

echo "=============================="
echo "Initializing Founding Creatives Launch"
echo "=============================="

MAX_SLOTS=100
ENTRY_FEE=50
ASSET_TYPES=("IMVU-L" "AR/VR" "MusicLoop")

# Open launch window
echo "[INFO] Opening Founding Creatives launch window..."
node -e "
const { RegistrationService } = require('../backend-api/src');
const service = new RegistrationService({ maxFoundingSlots: $MAX_SLOTS });
service.openLaunchWindow().then(() => console.log('[OK] Launch window opened.')).catch(err => console.error(err));
"

# Generate assets
echo "[INFO] Generating initial assets..."
node -e "
const { AssetPipeline } = require('../backend-api/src');
const pipeline = new AssetPipeline();
pipeline.generateAssets('founding-creatives', { types: ${ASSET_TYPES[@]} })
    .then(() => console.log('[OK] Assets generated.'))
    .catch(err => console.error(err));
"

echo "[INFO] Founding Creatives launch initialization complete."
exit 0
