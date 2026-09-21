export interface PiService {
  dispatchTask(taskPrompt: string): Promise<any>;
  subscribe(channel: string, callback: (msg: any) => void): void;
}

export interface JevService {
  evaluate(code: string, schema?: any): Promise<any>;
  vectorSearch(query: string): Promise<any>;
}

export interface DskService {
  executeGoal(goal: string): Promise<any>;
}

declare module 'cordis' {
  interface Context {
    pi: PiService;
    jev: JevService;
    dsk: DskService;
  }
}
