# N3XUS v-COS Phase 3-12 Services

Complete microservices architecture implementing N3XUS Handshake 55-45-17 enforcement across all layers.

## 🔒 N3XUS LAW Enforcement

All services enforce the N3XUS Handshake protocol **55-45-17** at three layers:

### Layer 1: Build-time Validation
```dockerfile
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then 
    echo "❌ BUILD DENIED: Invalid N3XUS Handshake" && exit 1
fi
```
**Effect**: Container build fails if handshake is missing or invalid.

### Layer 2: Runtime Environment Check
```python
if os.environ.get("N3XUS_HANDSHAKE") != "55-45-17":
    sys.exit(1)  # Exit immediately on boot
```
**Effect**: Service terminates on startup if environment variable is invalid.

### Layer 3: Request Middleware
All endpoints (except `/health` and `/metrics`) require:
```
Header: X-N3XUS-Handshake: 55-45-17
```
**Effect**: Returns **HTTP 451** (Unavailable For Legal Reasons) if header is missing or invalid.

---

## 📊 Service Inventory (21 Services)

### 🏛️ Phase 3-4: Core Runtime (2 services)

#### v-supercore (Port 3001)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Governance Authority & Runtime Core
- **Endpoints**:
  - `GET /` - Service info (handshake-required)
  - `GET /law` - N3XUS LAW enforcement status
  - `GET /handshake` - Protocol information
  - `GET /health` - Health check (handshake-exempt)

#### puabo-api-ai-hf (Port 3002)
- **Tech**: Node.js 20 + Express
- **Role**: AI Gateway (HuggingFace-ready)
- **Endpoints**:
  - `GET /` - Service info
  - `POST /inference` - AI inference endpoint
  - `GET /health` - Health check

---

### 🌐 Phase 5-6: Federation Layer (4 services)

#### federation-spine (Port 3010)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Federation coordination backbone
- **Purpose**: Manages cross-sovereign federation state

#### identity-registry (Port 3011)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Sovereign identity management
- **Purpose**: DID registry and verification

#### federation-gateway (Port 3012)
- **Tech**: Node.js 20 + Express
- **Role**: Federation API gateway
- **Purpose**: Cross-system communication bridge

#### attestation-service (Port 3013)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Cryptographic attestation
- **Purpose**: Signature verification and notarization

---

### 🎰 Phase 7-8: Casino Domain (2 services)

#### casino-core (Port 3020)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Casino NEXUS central authority
- **Purpose**: Game state, RNG, compliance enforcement

#### ledger-engine (Port 3030)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Immutable transaction ledger
- **Purpose**: All financial transactions, audit trail

---

### 💰 Phase 9: Financial Core (3 services)

#### wallet-engine (Port 3040)
- **Tech**: Python 3.11 + FastAPI
- **Role**: User wallet management
- **Purpose**: Balance tracking, custody operations

#### treasury-core (Port 3041)
- **Tech**: Python 3.11 + FastAPI
- **Role**: System treasury operations
- **Purpose**: Reserve management, liquidity pools

#### payout-engine (Port 3050)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Payout orchestration
- **Purpose**: Automated disbursements, royalty distribution

---

### 📈 Phase 10: Earnings & Media (3 services)

#### earnings-oracle (Port 3051)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Earnings calculation oracle
- **Purpose**: Revenue splits, commission calculation

#### pmmg-media-engine (Port 3060)
- **Tech**: Python 3.11 + FastAPI
- **Role**: PMMG media processing
- **Purpose**: Media ingestion, transcoding, delivery

#### royalty-engine (Port 3061)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Royalty distribution
- **Purpose**: Creator earnings, NFT royalties

---

### ⚖️ Phase 11-12: Governance (2 services)

#### governance-core (Port 3070)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Governance proposal system
- **Purpose**: DAO voting, proposal lifecycle

#### constitution-engine (Port 3071)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Constitutional rule enforcement
- **Purpose**: System laws, amendment process

---

### 🛡️ Nuisance Services: Compliance Layer (5 services)

#### payment-partner (Port 4001)
- **Tech**: Node.js 20 + Express
- **Role**: Payment processor integration
- **Purpose**: Stripe/PayPal/ACH compliance bridge

#### jurisdiction-rules (Port 4002)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Geographic compliance
- **Purpose**: Regional law enforcement, geo-blocking

#### responsible-gaming (Port 4003)
- **Tech**: Node.js 20 + Express
- **Role**: Responsible gaming enforcement
- **Purpose**: Self-exclusion, limits, cooling-off periods

#### legal-entity (Port 4004)
- **Tech**: Python 3.11 + FastAPI
- **Role**: Legal entity management
- **Purpose**: Corporate structure, licensing, audit trails

#### explicit-opt-in (Port 4005)
- **Tech**: Node.js 20 + Express
- **Role**: User consent management
- **Purpose**: GDPR compliance, consent tracking

---

## 🚀 Deployment

### Local Development (Codespaces)
```bash
# Start Phase 3-4 services
bash scripts/phase3-4-ignite.sh

# Or start specific services
docker compose -f docker-compose.full.yml up -d v-supercore puabo-api-ai-hf
```

### Full Stack (All 21 Services)
```bash
# Launch complete Phase 3-12 stack
bash scripts/full-stack-launch.sh

# Or use Docker Compose directly
docker compose -f docker-compose.full.yml up -d --build
```

### Verify Deployment
```bash
bash scripts/verify-launch.sh
```

---

## 🧪 Testing Handshake Enforcement

### Valid Handshake (Should Return 200)
```bash
curl -H 'X-N3XUS-Handshake: 55-45-17' http://localhost:3001/
# Response: HTTP 200 OK
# {"service":"v-SuperCore","phase":"3-4","role":"Governance Authority","status":"operational"}
```

### Invalid/Missing Handshake (Should Return 451)
```bash
curl http://localhost:3001/
# Response: HTTP 451 Unavailable For Legal Reasons
# {"error":"N3XUS LAW VIOLATION: Missing or invalid handshake"}
```

### Health Check (No Handshake Required)
```bash
curl http://localhost:3001/health
# Response: HTTP 200 OK
# {"status":"healthy","service":"v-supercore"}
```

---

## 📈 Service Communication

All inter-service communication **MUST** include the N3XUS Handshake header:

```javascript
// Example: Node.js service calling Python service
const axios = require('axios');

const response = await axios.get('http://federation-spine:3010/status', {
  headers: {
    'X-N3XUS-Handshake': '55-45-17'
  }
});
```

```python
# Example: Python service calling Node.js service
import httpx

async with httpx.AsyncClient() as client:
    response = await client.get(
        'http://federation-gateway:3012/api/v1/route',
        headers={'X-N3XUS-Handshake': '55-45-17'}
    )
```

---

## 🔐 Security

- **Non-root execution**: All containers run as UID 1001 (user: `nexus`)
- **Zero bypass paths**: No endpoints accept requests without handshake (except health checks)
- **Build-time validation**: Impossible to build images without correct handshake
- **Runtime validation**: Services exit immediately if environment is tampered with
- **Request validation**: Every request validated at middleware layer

---

## 📦 Technology Stack

| Component | Python Services (13) | Node.js Services (8) |
|-----------|---------------------|----------------------|
| **Base Image** | python:3.11-slim | node:20-alpine |
| **Framework** | FastAPI + Uvicorn | Express 4.18.2 |
| **Services** | v-supercore, federation-spine, identity-registry, attestation-service, casino-core, ledger-engine, wallet-engine, treasury-core, payout-engine, earnings-oracle, pmmg-media-engine, royalty-engine, governance-core, constitution-engine, jurisdiction-rules, legal-entity | puabo-api-ai-hf, federation-gateway, payment-partner, responsible-gaming, explicit-opt-in |
| **Port Range** | 3001, 3010-3011, 3013, 3020, 3030, 3040-3041, 3050-3051, 3060-3061, 3070-3071, 4002, 4004 | 3002, 3012, 4001, 4003, 4005 |

---

## 🏗️ Architecture Principles

1. **Sovereignty First**: Each service is fully autonomous, no shared databases
2. **Zero Trust**: Every request validated, no implicit trust between services
3. **Immutable Infrastructure**: Services are stateless, rebuild instead of patch
4. **Graceful Degradation**: Services continue operating if dependencies fail
5. **Observable by Default**: All services expose health and metrics endpoints

---

## 📝 Service Development Guidelines

### Adding a New Service

1. **Create service directory**: `services/<service-name>/`
2. **Add Dockerfile** with 3-layer handshake enforcement
3. **Implement application code** with handshake middleware
4. **Add to docker-compose.full.yml**:
   ```yaml
   my-new-service:
     build:
       context: ./services/my-new-service
       args:
         N3XUS_HANDSHAKE: "55-45-17"
     environment:
       N3XUS_HANDSHAKE: "55-45-17"
     ports:
       - "3XXX:3000"
     networks:
       - nexus-net
   ```
5. **Test handshake enforcement**
6. **Update this README**

---

## 🐛 Troubleshooting

### Service exits immediately on startup
**Cause**: Invalid `N3XUS_HANDSHAKE` environment variable  
**Fix**: Verify `docker-compose.full.yml` has `N3XUS_HANDSHAKE: "55-45-17"`

### Build fails with "BUILD DENIED"
**Cause**: Missing or invalid build arg  
**Fix**: Verify Dockerfile ARG and docker-compose build args match `55-45-17`

### HTTP 451 on all requests
**Cause**: Missing `X-N3XUS-Handshake` header  
**Fix**: Add header: `X-N3XUS-Handshake: 55-45-17`

### Port conflict
**Cause**: Port already in use  
**Fix**: Stop conflicting service or change port mapping in docker-compose

---

## 📚 Additional Documentation

- **Handshake Protocol**: [N3XUS Handshake 55-45-17 Specification](../docs/infra-core/handshake-55-45-17.md)
- **Deployment Guide**: [VPS Launch Guide](../docs/deployment/VPS_LAUNCH_GUIDE.md)
- **Architecture**: [THIIO Handoff Documentation](../docs/THIIO-HANDOFF/)
- **Federation**: [N3XUS.NET Federation Protocol](../docs/n3xus-net/README.md)

---

## ✅ Verification Checklist

- [x] 21 services implemented
- [x] 3-layer handshake enforcement on all services
- [x] HTTP 451 returned for invalid handshake
- [x] HTTP 200 returned for valid handshake
- [x] Health endpoints exempt from handshake
- [x] Non-root execution (UID 1001)
- [x] Python services use FastAPI + Uvicorn
- [x] Node.js services use Express
- [x] All services in docker-compose.full.yml
- [x] Deployment scripts created
- [x] Documentation complete

---

**Status**: ✅ Phase 3-12 Stack Complete and Operational  
**N3XUS LAW Enforcement**: ✅ ACTIVE across all layers  
**Last Updated**: 2026-01-15  
**Commit**: `37a4ab1` - Fix handshake enforcement to return proper HTTP 451 status
