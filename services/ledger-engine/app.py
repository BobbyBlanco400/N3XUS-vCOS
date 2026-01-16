import os
import sys
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

# Layer 2: Runtime validation
if os.environ.get("N3XUS_HANDSHAKE") != "55-45-17":
    print("❌ BOOT DENIED: Invalid N3XUS Handshake", file=sys.stderr)
    sys.exit(1)

app = FastAPI(title="Ledger-Engine", version="1.0.0")

# Layer 3: Request middleware
@app.middleware("http")
async def nexus_handshake(request: Request, call_next):
    if request.url.path in ["/health", "/metrics"]:
        return await call_next(request)
    if request.headers.get("X-N3XUS-Handshake") != "55-45-17":
        return JSONResponse(
            status_code=451,
            content={"error": "N3XUS LAW VIOLATION: Missing or invalid handshake"}
        )
    return await call_next(request)

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "ledger-engine"}

@app.get("/")
async def root():
    return {
        "service": "Ledger Engine",
        "phase": "7-8",
        "role": "Immutable Transaction Ledger",
        "status": "operational"
    }
