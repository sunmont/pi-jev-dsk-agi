import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAgiApp } from './app-container.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Cordis AGI Container
const agiApp = createAgiApp();
agiApp.start();

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    architecture: {
      serviceContainer: '@deepseek-ai/cordis',
      agentRuntime: '@earendil-works/pi-coding-agent',
      evaluationEngine: '@typesafe-ai/jev',
      kernel: 'DSK'
    }
  });
});

app.post('/api/execute', async (req, res) => {
  const { goal } = req.body;
  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  try {
    const dsk = agiApp.dsk;
    const result = await dsk.executeGoal(goal);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[Enterprise AGI Backend] Running on http://localhost:${PORT}`);
});
