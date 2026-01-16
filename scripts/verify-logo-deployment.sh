#!/bin/bash
# N3XUS v-COS Logo Deployment Verification Script
# Validates all logo targets match canonical source
# N3XUS LAW 55-45-17 Enforcement

CANONICAL_SOURCE="branding/official/N3XUS-vCOS.png"
DEPLOYMENT_TARGETS=(
    "branding/logo.png"
    "frontend/public/assets/branding/logo.png"
    "admin/public/assets/branding/logo.png"
    "creator-hub/public/assets/branding/logo.png"
)

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   N3XUS v-COS Logo Deployment Verification                ║"
echo "║   N3XUS LAW 55-45-17                                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verify canonical source exists
if [ ! -f "$CANONICAL_SOURCE" ]; then
    echo "❌ ERROR: Canonical source not found: $CANONICAL_SOURCE"
    exit 1
fi

# Get canonical MD5 (cross-platform)
if command -v md5sum &> /dev/null; then
    CANONICAL_MD5=$(md5sum "$CANONICAL_SOURCE" | awk '{print $1}')
elif command -v md5 &> /dev/null; then
    CANONICAL_MD5=$(md5 -q "$CANONICAL_SOURCE")
else
    echo "⚠️  Warning: No MD5 utility found (md5sum or md5)"
    CANONICAL_MD5="unavailable"
fi

echo "✅ Canonical source: $CANONICAL_SOURCE"
echo "   MD5: $CANONICAL_MD5"
echo ""

VERIFIED=0
FAILED=0
MISSING=0

for target in "${DEPLOYMENT_TARGETS[@]}"; do
    if [ ! -f "$target" ]; then
        echo "❌ MISSING: $target"
        ((MISSING++))
        continue
    fi
    
    # Get target MD5
    if [ "$CANONICAL_MD5" != "unavailable" ]; then
        if command -v md5sum &> /dev/null; then
            TARGET_MD5=$(md5sum "$target" | awk '{print $1}')
        else
            TARGET_MD5=$(md5 -q "$target")
        fi
        
        if [ "$TARGET_MD5" == "$CANONICAL_MD5" ]; then
            echo "✅ VERIFIED: $target"
            ((VERIFIED++))
        else
            echo "❌ MISMATCH: $target (MD5: $TARGET_MD5)"
            ((FAILED++))
        fi
    else
        # Fallback to size comparison if MD5 unavailable
        CANONICAL_SIZE=$(stat -f%z "$CANONICAL_SOURCE" 2>/dev/null || stat -c%s "$CANONICAL_SOURCE" 2>/dev/null)
        TARGET_SIZE=$(stat -f%z "$target" 2>/dev/null || stat -c%s "$target" 2>/dev/null)
        
        if [ "$TARGET_SIZE" == "$CANONICAL_SIZE" ]; then
            echo "✅ VERIFIED (size): $target"
            ((VERIFIED++))
        else
            echo "❌ MISMATCH (size): $target"
            ((FAILED++))
        fi
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Verification Summary:"
echo "  ✅ Verified: $VERIFIED/${#DEPLOYMENT_TARGETS[@]}"
echo "  ❌ Failed: $FAILED/${#DEPLOYMENT_TARGETS[@]}"
echo "  ❓ Missing: $MISSING/${#DEPLOYMENT_TARGETS[@]}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $VERIFIED -eq ${#DEPLOYMENT_TARGETS[@]} ]; then
    echo ""
    echo "🎉 All logo deployments verified! N3XUS LAW 55-45-17 compliant."
    exit 0
elif [ $MISSING -gt 0 ]; then
    echo ""
    echo "⚠️  Missing logos detected. Run: bash scripts/deploy-holographic-logo.sh"
    exit 1
else
    echo ""
    echo "❌ Logo verification failed. Redeploy canonical source."
    exit 1
fi
