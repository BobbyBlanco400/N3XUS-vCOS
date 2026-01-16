type CommandHandler = (payload: any) => void;

class CommandBus {
  private static instance: CommandBus;
  private listeners: { [key: string]: CommandHandler[] } = {};

  private constructor() {}

  public static getInstance(): CommandBus {
    if (!CommandBus.instance) {
      CommandBus.instance = new CommandBus();
    }
    return CommandBus.instance;
  }

  public on(command: string, handler: CommandHandler): void {
    if (!this.listeners[command]) {
      this.listeners[command] = [];
    }
    this.listeners[command].push(handler);
  }

  public off(command: string, handler: CommandHandler): void {
    if (!this.listeners[command]) return;
    this.listeners[command] = this.listeners[command].filter(h => h !== handler);
  }

  public emit(command: string, payload?: any): void {
    if (!this.listeners[command]) return;
    this.listeners[command].forEach(handler => handler(payload));
  }
}

export const commandBus = CommandBus.getInstance();
