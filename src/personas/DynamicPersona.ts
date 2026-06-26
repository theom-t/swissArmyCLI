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

[EFFICIENCY LADDER (PONYTAIL RULE)]:
Before writing any code, you MUST stop at the first rung that holds true:
1. Does this need to exist?   -> no: skip it (YAGNI)
2. Already in this codebase?  -> reuse it, don't rewrite
3. Stdlib does it?            -> use it
4. Native platform feature?   -> use it
5. Installed dependency?      -> use it
6. One line?                  -> one line
7. Only then: write the absolute minimum that works securely.

[CONTEXT]: ${context || 'None'}
[TOOLS AVAILABLE]: ${tools.length > 0 ? tools.map(t => t.name).join(', ') : 'None'}
[USER PROMPT]: ${prompt}
    `;

    return await this.provider.routeRequest({ tier: 'major', prompt: fullPrompt });
  }
}
