import { Context } from 'cordis';
import { JevRuntime } from '@typesafe-ai/jev';

export class JEVEvaluationEngine {
  private runtime: JevRuntime;

  constructor() {
    this.runtime = new JevRuntime({
      sandboxMode: 'strict',
      timeoutMs: 3000,
    });
  }

  public async evaluateCode(code: string, schema?: any): Promise<{ success: boolean; result?: any; error?: string }> {
    try {
      const result = await this.runtime.executeTyped(code, schema);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  public async semanticSearch(query: string): Promise<any> {
    return await this.runtime.vectorRetrieve(query);
  }
}
