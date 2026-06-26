export interface ToolSchema {
  name: string;
  description: string;
  parameters: object;
}

export class ToolSearch {
  private toolRegistry: Map<string, ToolSchema> = new Map();

  constructor() {
    this.registerCoreTools();
  }

  private registerCoreTools() {
    this.toolRegistry.set('read_file', {
      name: 'read_file',
      description: 'Reads the contents of a file or database schema',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string' } },
        required: ['path']
      }
    });

    this.toolRegistry.set('write_file', {
      name: 'write_file',
      description: 'Writes code to a file',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string' }, content: { type: 'string' } },
        required: ['path', 'content']
      }
    });

    this.toolRegistry.set('draft_email', {
      name: 'draft_email',
      description: 'Drafts a business email',
      parameters: {
        type: 'object',
        properties: { recipient: { type: 'string' }, subject: { type: 'string' }, body: { type: 'string' } },
        required: ['recipient', 'subject', 'body']
      }
    });
  }

  public searchTools(intent: string): ToolSchema[] {
    // In production, this uses an embedding model (e.g. text-embedding-ada-002 or local equivalent)
    // For Phase 6, we use a basic semantic keyword heuristic to simulate vector search.
    const normalized = intent.toLowerCase();
    const results: ToolSchema[] = [];

    if (normalized.includes('read') || normalized.includes('schema') || normalized.includes('database')) {
      const tool = this.toolRegistry.get('read_file');
      if (tool) results.push(tool);
    }
    
    if (normalized.includes('write') || normalized.includes('code') || normalized.includes('create')) {
      const tool = this.toolRegistry.get('write_file');
      if (tool) results.push(tool);
    }

    if (normalized.includes('email') || normalized.includes('message') || normalized.includes('business')) {
      const tool = this.toolRegistry.get('draft_email');
      if (tool) results.push(tool);
    }

    return results;
  }
}
