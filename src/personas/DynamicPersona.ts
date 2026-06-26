import { PersonaDefinition } from './PersonaRegistry';
import { ProviderRouter } from '../llm/ProviderRouter';
import { ToolSchema } from '../mcp/ToolSearch';

export class DynamicPersona {
  constructor(
    private definition: PersonaDefinition,
    private provider: ProviderRouter
  ) {}

  public async execute(prompt: string, tools: ToolSchema[], context: string | null): Promise<string> {
    // Inject the Persona's system prompt, the available tools, and the memory context
    const fullPrompt = `
[SYSTEM]: ${this.definition.systemPrompt}
[CONTEXT]: ${context || 'None'}
[TOOLS AVAILABLE]: ${tools.length > 0 ? tools.map(t => t.name).join(', ') : 'None'}
[USER PROMPT]: ${prompt}
    `;

    return await this.provider.routeRequest({ tier: 'major', prompt: fullPrompt });
  }
}
