FROM python:3.11-slim

# Build-time handshake validation
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then \
      echo "❌ BUILD DENIED: Invalid N3XUS Handshake" && exit 1; \
    fi

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir fastapi uvicorn

# Copy application
COPY app.py .

# Non-root execution
RUN useradd -u 1001 -m nexus && chown -R nexus:nexus /app
USER nexus

EXPOSE 3000

# Runtime handshake validation happens in app.py
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3000"]
