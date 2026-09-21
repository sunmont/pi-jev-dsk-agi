export type AgentRole = 'researcher' | 'coder' | 'verifier' | 'coordinator';

export interface PiMessage {
  id: string;
  sender: string;
  receiver: string;
  channel: string;
  payload: any;
  timestamp: number;
}

export interface AgentTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  assignedAgent?: string;
  result?: any;
  error?: string;
}

export interface DSKStatePhase {
  phase: 'perception' | 'reasoning' | 'execution' | 'verification';
  status: 'idle' | 'active' | 'success' | 'error';
  details: string;
}
