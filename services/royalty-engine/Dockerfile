FROM python:3.11-slim
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then echo "❌ BUILD DENIED" && exit 1; fi
WORKDIR /app
RUN pip install --no-cache-dir fastapi uvicorn
COPY app.py .
RUN useradd -u 1001 -m nexus && chown -R nexus:nexus /app
USER nexus
EXPOSE 3061
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3061"]
