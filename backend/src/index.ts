import express from 'express';
import cors from 'cors';
import { PiChannelRouter } from './pi-router';
import { JEVEvaluationEngine } from './jev-engine';
import { DSKKernel } from './dsk-kernel';

const app = express();
app.use(cors());
app.use(express.json());

const router = new PiChannelRouter();
const jev = new JEVEvaluationEngine();
const dsk = new DSKKernel(router, jev);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', system: 'Pi-JEV-DSK AGI Engine' });
});

app.post('/api/execute', async (req, res) => {
  const { goal } = req.body;
  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  const result = await dsk.executeTask(goal);
  res.json(result);
});

app.get('/api/mailbox', (req, res) => {
  res.json(router.getMailbox());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[AGI Backend] Server running on http://localhost:${PORT}`);
});
