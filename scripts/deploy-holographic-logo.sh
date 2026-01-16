#!/bin/bash
# N3XUS v-COS Holographic Logo Deployment Script
# Propagates canonical logo from branding/official/N3XUS-vCOS.png to all surfaces
# N3XUS LAW 55-45-17 Enforcement

set -e

CANONICAL_SOURCE="branding/official/N3XUS-vCOS.png"
DEPLOYMENT_TARGETS=(
    "branding/logo.png"
    "frontend/public/assets/branding/logo.png"
    "admin/public/assets/branding/logo.png"
    "creator-hub/public/assets/branding/logo.png"
)

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   N3XUS v-COS Holographic Logo Deployment                 ║"
echo "║   N3XUS LAW 55-45-17                                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verify canonical source exists
if [ ! -f "$CANONICAL_SOURCE" ]; then
    echo "❌ ERROR: Canonical source not found: $CANONICAL_SOURCE"
    echo "   Please place the official logo at this location first."
    exit 1
fi

echo "✅ Canonical source verified: $CANONICAL_SOURCE"
CANONICAL_SIZE=$(stat -f%z "$CANONICAL_SOURCE" 2>/dev/null || stat -c%s "$CANONICAL_SOURCE" 2>/dev/null || echo "unknown")
echo "   Size: $CANONICAL_SIZE bytes"
echo ""

# Deploy to all targets
DEPLOYED=0
FAILED=0

for target in "${DEPLOYMENT_TARGETS[@]}"; do
    TARGET_DIR=$(dirname "$target")
    
    # Create target directory if it doesn't exist
    if [ ! -d "$TARGET_DIR" ]; then
        echo "📁 Creating directory: $TARGET_DIR"
        mkdir -p "$TARGET_DIR"
    fi
    
    # Copy canonical source to target
    if cp "$CANONICAL_SOURCE" "$target"; then
        echo "✅ Deployed: $target"
        ((DEPLOYED++))
    else
        echo "❌ FAILED: $target"
        ((FAILED++))
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Deployment Summary:"
echo "  ✅ Successful: $DEPLOYED/${#DEPLOYMENT_TARGETS[@]}"
echo "  ❌ Failed: $FAILED/${#DEPLOYMENT_TARGETS[@]}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo "🎉 Holographic logo deployment complete!"
    echo "   Run: bash scripts/verify-logo-deployment.sh"
    exit 0
else
    echo ""
    echo "⚠️  Some deployments failed. Check permissions and paths."
    exit 1
fi
