import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { CodeWikiManager } from '../src/wiki/CodeWikiManager';
import { ProviderRouter } from '../src/llm/ProviderRouter';

describe('CodeWikiManager', () => {
  const wikiDir = path.join(process.cwd(), '.swiss');
  const wikiPath = path.join(wikiDir, 'CodeWiki.json');

  beforeEach(() => {
    if (fs.existsSync(wikiPath)) fs.unlinkSync(wikiPath);
  });

  afterEach(() => {
    if (fs.existsSync(wikiPath)) fs.unlinkSync(wikiPath);
  });

  it('should initialize a default wiki if none exists', () => {
    const manager = new CodeWikiManager(new ProviderRouter());
    expect(fs.existsSync(wikiPath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(wikiPath, 'utf8'));
    expect(content.architecture).toBe("Initial scaffolding.");
  });

  it('should update the wiki in the background', async () => {
    const manager = new CodeWikiManager(new ProviderRouter());
    await manager.updateWiki("Added a new authentication route");
    
    const content = JSON.parse(fs.readFileSync(wikiPath, 'utf8'));
    expect(content.architecture).toContain("recent coding changes");
  });
});
