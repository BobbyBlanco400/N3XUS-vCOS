import os
import sys
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

# Layer 2: Runtime validation
def validate_handshake_env():
    if os.environ.get("N3XUS_HANDSHAKE") != "55-45-17":
        print("❌ BOOT DENIED: Invalid N3XUS Handshake", file=sys.stderr)
        sys.exit(1)

validate_handshake_env()

app = FastAPI(title="v-SuperCore", version="1.0.0")

# Layer 3: Request middleware
@app.middleware("http")
async def nexus_handshake(request: Request, call_next):
    # Health check exempt from handshake
    if request.url.path in ["/health", "/metrics"]:
        return await call_next(request)
    
    # All other endpoints require handshake
    if request.headers.get("X-N3XUS-Handshake") != "55-45-17":
        return JSONResponse(
            status_code=451,
            content={"error": "N3XUS LAW VIOLATION: Missing or invalid handshake"}
        )
    
    return await call_next(request)

@app.get("/health")
async def health():
    """Health check endpoint (handshake-exempt)"""
    return {"status": "healthy", "service": "v-supercore"}

@app.get("/")
async def root():
    """Root endpoint (handshake-required)"""
    return {
        "service": "v-SuperCore",
        "phase": "3-4",
        "role": "Governance Authority",
        "status": "operational"
    }

@app.get("/law")
async def law():
    """N3XUS LAW enforcement status"""
    return {
        "law": "N3XUS LAW 55-45-17",
        "enforcement": "ACTIVE",
        "layers": ["build", "runtime", "request"]
    }

@app.get("/handshake")
async def handshake_info():
    """Handshake protocol information"""
    return {
        "protocol": "55-45-17",
        "validation_layers": 3,
        "status": "enforced"
    }
