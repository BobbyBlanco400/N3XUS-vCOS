FROM python:3.11-slim

# Layer 1: Build-time validation
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then \
    echo "❌ N3XUS HANDSHAKE VIOLATION: Build denied" && exit 1; fi

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir fastapi==0.104.1 uvicorn==0.24.0

# Create non-root user
RUN useradd -u 1001 -m nexus
USER nexus

COPY app.py .

# Layer 2: Runtime validation happens in app.py
ENV N3XUS_HANDSHAKE=""

EXPOSE 3000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3000"]
