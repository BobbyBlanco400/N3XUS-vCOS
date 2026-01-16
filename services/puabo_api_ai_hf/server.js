const express = require('express');

// Layer 2: Runtime validation
if (process.env.N3XUS_HANDSHAKE !== '55-45-17') {
  console.error('❌ BOOT DENIED: Invalid N3XUS Handshake');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Layer 3: Request middleware
app.use((req, res, next) => {
  // Health check exempt from handshake
  if (req.path === '/health' || req.path === '/metrics') {
    return next();
  }
  
  // All other endpoints require handshake
  const handshake = req.headers['x-n3xus-handshake'];
  if (handshake !== '55-45-17') {
    return res.status(451).json({
      error: 'N3XUS LAW VIOLATION',
      message: 'Missing or invalid handshake'
    });
  }
  
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'puabo-api-ai-hf' });
});

app.get('/', (req, res) => {
  res.json({
    service: 'PUABO API AI HF',
    phase: '3-4',
    role: 'AI Gateway',
    status: 'operational',
    hf_ready: true
  });
});

app.get('/ai/status', (req, res) => {
  res.json({
    ai_services: 'ready',
    huggingface_integration: 'available',
    models: 'configurable'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ puabo-api-ai-hf running on port ${PORT}`);
  console.log(`✅ N3XUS Handshake 55-45-17 enforced`);
});
