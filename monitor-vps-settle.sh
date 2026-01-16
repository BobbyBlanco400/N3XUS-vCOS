#!/usr/bin/env bash
# VPS Settle Period Monitoring (Read-Only)
# Run this every few hours during Jan 16-18

VPS_IP="72.62.86.217"

echo "=== VPS Settle Period Health Check ==="
echo "Date: $(date)"
echo ""

echo "1. System Resources:"
ssh root@$VPS_IP 'free -h && echo && uptime'
echo ""

echo "2. Container Status (should be 13):"
ssh root@$VPS_IP 'docker ps --format "table {{.Names}}\t{{.Status}}" | head -n 15'
echo ""

echo "3. Container Count:"
ssh root@$VPS_IP 'docker ps -q | wc -l'
echo ""

echo "4. N3XUS LAW Enforcement:"
echo -n "Without handshake: "
ssh root@$VPS_IP 'curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3001/'
echo -n "With handshake: "
ssh root@$VPS_IP 'curl -s -o /dev/null -w "HTTP %{http_code}\n" -H "X-N3XUS-Handshake: 55-45-17" http://localhost:3001/'
echo ""

echo "5. Service Health Summary:"
RUNNING=$(ssh root@$VPS_IP 'docker ps --filter "status=running" | wc -l')
UNHEALTHY=$(ssh root@$VPS_IP 'docker ps --filter "health=unhealthy" | wc -l')
echo "$((RUNNING - 1)) running containers"
echo "$((UNHEALTHY - 1)) unhealthy (acceptable if responding)"
echo ""

echo "=== Settle Period Checklist ==="
echo "[ ] Memory <40%"
echo "[ ] Load average <3.0"
echo "[ ] 13 containers running"
echo "[ ] N3XUS LAW: 451 without handshake"
echo "[ ] N3XUS LAW: 200 with handshake"
echo "[ ] No unexpected restarts"
echo ""
