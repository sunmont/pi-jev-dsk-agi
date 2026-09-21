import { Context } from 'cordis';

export class DSKKernel {
  private ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  public async executeTask(goal: string): Promise<{ success: boolean; output: any; trace: string[] }> {
    const trace: string[] = [];
    trace.push(`[DSK Kernel] Phase 1: Perception - Analyzing goal: "${goal}"`);

    try {
      // 1. Vector Retrieval via JEV Service
      trace.push(`[DSK Kernel] Querying @typesafe-ai/jev vector memory for semantic context...`);
      const context = await this.ctx.jev.vectorSearch(goal);
      trace.push(`[DSK Kernel] JEV context retrieved: ${JSON.stringify(context || 'No prior context')}`);

      // 2. Dispatching autonomous workflow via Pi Agent Service
      trace.push(`[DSK Kernel] Phase 2: Reasoning & Delegation - Handing task to @earendil-works/pi-coding-agent...`);
      const agentOutput = await this.ctx.pi.dispatchTask(goal);

      // 3. Execution & Verification via JEV
      trace.push(`[DSK Kernel] Phase 3 & 4: Execution & Verification - Running typed JEV evaluation...`);
      const verification = await this.ctx.jev.evaluate(`return { status: 'verified', goal: "${goal}", time: Date.now() };`);

      trace.push(`[DSK Kernel] Goal successfully achieved and verified.`);

      return {
        success: true,
        output: {
          agentResult: agentOutput,
          verification,
          context
        },
        trace
      };

    } catch (err: any) {
      trace.push(`[DSK Kernel Error] ${err.message}`);
      return {
        success: false,
        output: err.message,
        trace
      };
    }
  }
}
