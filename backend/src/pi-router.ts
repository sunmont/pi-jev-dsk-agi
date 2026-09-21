import { EventEmitter } from 'events';
import { PiAgentCore } from '@earendil-works/pi-agent-core';
import { PiCodingAgent } from '@earendil-works/pi-coding-agent';
import { PiAiClient } from '@earendil-works/pi-ai';

export class PiChannelRouter extends EventEmitter {
  private agentCore: PiAgentCore;
  private codingAgent: PiCodingAgent;
  private mailbox: any[] = [];

  constructor() {
    super();
    const piClient = new PiAiClient({
      apiKey: process.env.DEEPSEEK_API_KEY || 'dummy-key',
      baseURL: 'https://api.deepseek.com/v1',
    });

    this.agentCore = new PiAgentCore({
      client: piClient,
      model: 'deepseek-chat',
    });

    this.codingAgent = new PiCodingAgent({
      core: this.agentCore,
      workspace: process.cwd(),
    });
  }

  public async dispatch(taskPrompt: string): Promise<any> {
    const message = {
      id: 'msg-' + Date.now(),
      sender: 'pi-router',
      receiver: 'coding-agent',
      channel: 'execution-channel',
      payload: taskPrompt,
      timestamp: Date.now()
    };
    this.mailbox.push(message);
    this.emit('message', message);

    return await this.codingAgent.executeTask({ prompt: taskPrompt });
  }

  public getMailbox(): any[] {
    return this.mailbox;
  }
}
