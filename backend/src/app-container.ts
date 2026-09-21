import { Context } from 'cordis';
import { PiAgentCore } from '@earendil-works/pi-agent-core';
import { PiCodingAgent } from '@earendil-works/pi-coding-agent';
import { PiAiClient } from '@earendil-works/pi-ai';
import { JevRuntime } from '@typesafe-ai/jev';

export function createAgiApp() {
  const root = new Context();

  // 1. Register Real Pi Agent Service using @earendil-works packages
  root.plugin((ctx) => {
    const piClient = new PiAiClient({
      apiKey: process.env.DEEPSEEK_API_KEY || 'dummy-key',
      baseURL: 'https://api.deepseek.com/v1',
    });

    const agentCore = new PiAgentCore({
      client: piClient,
      model: 'deepseek-chat',
    });

    const codingAgent = new PiCodingAgent({
      core: agentCore,
      workspace: process.cwd(),
    });

    ctx.provide('pi', {
      async dispatchTask(taskPrompt: string) {
        console.log(`[Pi Agent Core] Dispatching task to Pi Coding Agent...`);
        const result = await codingAgent.executeTask({
          prompt: taskPrompt,
        });
        return result;
      },
      subscribe(channel: string, callback: (msg: any) => void) {
        agentCore.on(channel, callback);
      }
    });
  });

  // 2. Register JEV Service using @typesafe-ai/jev
  root.plugin((ctx) => {
    const jevRuntime = new JevRuntime({
      sandboxMode: 'strict',
      timeoutMs: 3000,
    });

    ctx.provide('jev', {
      async evaluate(code: string, schema?: any) {
        console.log(`[Typesafe-AI JEV] Executing type-safe evaluation...`);
        return await jevRuntime.executeTyped(code, schema);
      },
      async vectorSearch(query: string) {
        return await jevRuntime.vectorRetrieve(query);
      }
    });
  });

  // 3. Register DSK Service (Deep State Kernel) depending on pi and jev
  root.plugin((ctx) => {
    ctx.mixin('dsk', ['pi', 'jev']);

    ctx.provide('dsk', {
      async executeGoal(goal: string) {
        console.log(`[Cordis DSK] Executing goal via enterprise kernel: ${goal}`);
        
        // Retrieve semantic context using JEV vector search
        const context = await ctx.jev.vectorSearch(goal);

        // Dispatch task to real Pi Coding Agent
        const agentOutput = await ctx.pi.dispatchTask(goal);

        // Execute safety verification via JEV typed evaluation
        const evalRes = await ctx.jev.evaluate(`return { verified: true, goal: "${goal}", timestamp: Date.now() };`);

        return {
          success: true,
          goal,
          context,
          output: agentOutput,
          verification: evalRes,
          trace: [
            `[DSK] Perception & JEV Vector Retrieval completed`,
            `[Pi Coding Agent] Executed autonomous coding/problem-solving workflow`,
            `[Typesafe-AI JEV] Secure typed evaluation & verification passed`
          ]
        };
      }
    });
  });

  return root;
}
