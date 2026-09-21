import vm from 'vm';

export class JEVEvaluationEngine {
  private memoryVectorStore: Map<string, number[]> = new Map();

  public async evaluateCode(code: string, context: Record<string, any> = {}): Promise<{ success: boolean; result?: any; error?: string }> {
    try {
      const sandbox = { ...context, console, result: null };
      vm.createContext(sandbox);
      
      // Wrap code to capture result if last expression
      const wrappedCode = `try { result = (async () => { ${code} })(); } catch(e) { error = e.message; }`;
      vm.runInContext(wrappedCode, sandbox, { timeout: 3000 });
      
      const res = await sandbox.result;
      return { success: true, result: res !== undefined ? res : 'Code executed successfully with no return value.' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  public indexVector(key: string, vector: number[]) {
    this.memoryVectorStore.set(key, vector);
  }

  public semanticSearch(queryVector: number[], topK: number = 3): string[] {
    // Simple cosine similarity stub for JEV vector recall
    const results = Array.from(this.memoryVectorStore.entries()).map(([key, vec]) => {
      let dot = 0, normA = 0, normB = 0;
      for (let i = 0; i < vec.length; i++) {
        dot += vec[i] * (queryVector[i] || 0);
        normA += vec[i] ** 2;
        normB += (queryVector[i] || 0) ** 2;
      }
      const score = dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-6);
      return { key, score };
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK).map(r => r.key);
  }
}
