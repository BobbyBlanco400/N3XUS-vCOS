const express = require('express');
if (process.env.N3XUS_HANDSHAKE !== '55-45-17') { console.error('❌ BOOT DENIED'); process.exit(1); }
const app = express();
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
  if (req.path === '/health' || req.path === '/metrics') return next();
  if (req.headers['x-n3xus-handshake'] !== '55-45-17') return res.status(451).json({error: 'N3XUS LAW VIOLATION'});
  next();
});
app.get('/health', (req, res) => res.json({status: 'healthy', service: 'payment-partner'}));
app.get('/', (req, res) => res.json({service: 'payment-partner', phase: 'Compliance', role: 'Payment Verification'}));
app.listen(PORT, '0.0.0.0', () => console.log(`✅ payment-partner running on port ${PORT}`));
