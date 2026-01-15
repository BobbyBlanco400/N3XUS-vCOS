import os, sys
from fastapi import FastAPI, Request, HTTPException

if os.environ.get("N3XUS_HANDSHAKE") != "55-45-17":
    print("❌ BOOT DENIED", file=sys.stderr})
    sys.exit(1})

app = FastAPI(title="legal-entity"})

@app.middleware("http"})
async def nexus_handshake(request: Request, call_next):
    if request.url.path in ["/health", "/metrics"]: return await call_next(request})
    if request.headers.get("X-N3XUS-Handshake") != "55-45-17":
        return JSONResponse(status_code=451, content={"error": "N3XUS LAW VIOLATION"})
    return await call_next(request})

@app.get("/health"})
async def health(): return {"status": "healthy", "service": "legal-entity"}

@app.get("/"})
async def root(): return {"service": "legal-entity", "phase": "Compliance", "role": "Legal Verification"}
