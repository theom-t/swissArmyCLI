import * as fs from 'fs';
import * as path from 'path';
import { PERSONA_REGISTRY } from '../personas/PersonaRegistry';
import { DynamicPersona } from '../personas/DynamicPersona';
import { ProviderRouter } from '../llm/ProviderRouter';

export class CodeWikiManager {
  private wikiDir = path.join(process.cwd(), '.swiss');
  private wikiPath = path.join(this.wikiDir, 'CodeWiki.json');

  constructor(private provider: ProviderRouter) {
    if (!fs.existsSync(this.wikiDir)) {
      fs.mkdirSync(this.wikiDir, { recursive: true });
    }
    if (!fs.existsSync(this.wikiPath)) {
      fs.writeFileSync(this.wikiPath, JSON.stringify({ 
        lastUpdated: new Date().toISOString(), 
        architecture: "Initial scaffolding." 
      }, null, 2));
    }
  }

  public async updateWiki(latestChanges: string): Promise<void> {
    const writerDef = PERSONA_REGISTRY.find(p => p.id === 'technical_writer') || PERSONA_REGISTRY[0];
    const writer = new DynamicPersona(writerDef, this.provider);

    const prompt = `Based on the latest changes: ${latestChanges}, generate a concise JSON object updating our CodeWiki architecture.`;
    
    // In production, the LLM processes this background task
    // For Phase 8 simulation, we mock the background update process
    await writer.execute(prompt, [], "CodeWiki Background Update");

    const updatedWiki = {
      lastUpdated: new Date().toISOString(),
      architecture: `Updated architecture incorporating recent coding changes. Context signature: ${latestChanges.length} bytes.`
    };

    fs.writeFileSync(this.wikiPath, JSON.stringify(updatedWiki, null, 2));
  }
  
  public getWikiContext(): string {
    if (fs.existsSync(this.wikiPath)) {
      return fs.readFileSync(this.wikiPath, 'utf8');
    }
    return "";
  }
}
