import { EventEmitter } from 'events';
import { PiMessage, AgentRole } from '../shared/types';

export class PiChannelRouter extends EventEmitter {
  private channels: Map<string, Set<string>> = new Map(); // channel -> set of agentIds
  private mailbox: PiMessage[] = [];

  public subscribe(channel: string, agentId: string) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Set());
    }
    this.channels.get(channel)!.add(agentId);
    console.log(`[Pi Router] Agent ${agentId} subscribed to channel: ${channel}`);
  }

  public publish(message: PiMessage) {
    this.mailbox.push(message);
    console.log(`[Pi Router] Msg on [${message.channel}] from ${message.sender} to ${message.receiver}`);
    this.emit(`channel:${message.channel}`, message);
    this.emit(`agent:${message.receiver}`, message);
  }

  public getMailbox(): PiMessage[] {
    return this.mailbox;
  }
}
