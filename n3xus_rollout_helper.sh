#!/usr/bin/env bash
set -e

DEPLOY_DIR="/opt/nexus-cos"
COMPOSE_FILE="docker-compose.unified.yml"
export NEXUS_HANDSHAKE="55-45-17"

phase1_services="\
nexus-cos-postgres nexus-cos-redis nginx \
backend-api auth-service creator-hub content-management musicchain \
pv-keys key-service scheduler session-mgr \
streamcore streaming-service nexus-studio-ai \
vscreen-hollywood v-caster-pro v-prompter-pro v-screen-pro \
puabo-api puaboai-sdk ai-service kei-ai metatwin \
founders-beta puaboverse boom-boom-room glitch \
"

phase2_services="\
nexcoin-ms ledger-mgr token-mgr invoice-gen \
casino-nexus-api vr-world-ms skill-games-ms \
nft-marketplace-ms rewards-ms \
"

rollout_matrix() {
  printf "%s\n" \
  "Phase  Name             Focus                    Status" \
  "1      Foundation/Media Core stack + Media      COMPLETE" \
  "2      Casino           Neon Vault + Casino     PARTIAL" \
  "2.5    OTT Integration  Streaming/Distribution  PARTIAL" \
  "3      N3X-UP           Battle Arena Vertical   AUTHORIZED"
}

cd "$DEPLOY_DIR"

phase1_up() {
  echo "Starting Phase 1 (Foundation/Media)..."
  docker compose -f "$COMPOSE_FILE" up -d $phase1_services
}

phase2_up() {
  echo "Starting Phase 2 (Casino)..."
  docker compose -f "$COMPOSE_FILE" up -d $phase2_services
}

phase2_5_check() {
  echo "Checking Phase 2.5 (OTT Integration)..."
  curl -f http://localhost:3016/health || true
  curl -f http://localhost:8088/health || true
  curl -I http://localhost/v-suite/screen || true
  curl -I http://localhost/streaming || true
}

phase3_check() {
  echo "Checking Phase 3 (N3X-UP routes)..."
  curl -f http://localhost/n3x-up/health || true
  curl -f http://localhost/n3x-up/arena || true
  curl -f http://localhost/n3x-up/battles || true
  curl -f http://localhost/n3x-up/progression || true
  curl -I https://n3xuscos.online/n3x-up || true
  curl -I https://n3xuscos.online/n3x-up/arena || true
}

trae_go_nogo() {
  echo "Running TRAE GO/NO-GO..."
  cd "$DEPLOY_DIR"
  python3 canon-verifier/trae_go_nogo.py
}

status_all() {
  docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

echo "Loaded N3XUS rollout helper."
echo "Use: rollout_matrix | phase1_up | phase2_up | phase2_5_check | phase3_check | trae_go_nogo | status_all"
