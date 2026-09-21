import { Context } from 'cordis';
import { PiAgentCore } from '@earendil-works/pi-agent-core';
import { PiCodingAgent } from '@earendil-works/pi-coding-agent';
import { PiAiClient } from '@earendil-works/pi-ai';
import { JevRuntime } from '@typesafe-ai/jev';
import { DSKKernel } from './dsk-kernel.js';
import { PiChannelRouter } from './pi-router.js';
import { JEVEvaluationEngine } from './jev-engine.js';

export function createAgiApp() {
  const root = new Context();

  // 1. Register Pi Service using @earendil-works & PiChannelRouter
  root.plugin((ctx) => {
    const router = new PiChannelRouter();
    ctx.provide('pi', {
      async dispatchTask(taskPrompt: string) {
        return await router.dispatch(taskPrompt);
      },
      subscribe(channel: string, callback: (msg: any) => void) {
        router.on(channel, callback);
      }
    });
  });

  // 2. Register JEV Service using @typesafe-ai/jev & JEVEvaluationEngine
  root.plugin((ctx) => {
    const jevEngine = new JEVEvaluationEngine();
    ctx.provide('jev', {
      async evaluate(code: string, schema?: any) {
        return await jevEngine.evaluateCode(code, schema);
      },
      async vectorSearch(query: string) {
        return await jevEngine.semanticSearch(query);
      }
    });
  });

  // 3. Register DSK Kernel Service
  root.plugin((ctx) => {
    ctx.mixin('dsk', ['pi', 'jev']);
    const dskKernel = new DSKKernel(ctx);

    ctx.provide('dsk', {
      async executeGoal(goal: string) {
        return await dskKernel.executeTask(goal);
      }
    });
  });

  return root;
}
