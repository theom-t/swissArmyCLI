import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AdaptiveMemory } from '../src/memory/AdaptiveMemory';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('AdaptiveMemory', () => {
  let memory: AdaptiveMemory;
  const testDbName = '.swiss_memory_test.db';
  const testDbPath = path.join(os.homedir(), testDbName);

  beforeEach(() => {
    // Ensure clean state
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    memory = new AdaptiveMemory(testDbName);
  });

  afterEach(() => {
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should return null when no previous session exists', () => {
    const summary = memory.injectSessionSummary();
    expect(summary).toBeNull();
  });

  it('should save and inject session summaries correctly', () => {
    memory.autoSave('User was migrating to Next.js');
    
    const summary = memory.injectSessionSummary();
    expect(summary).toBe('User was migrating to Next.js');
  });

  it('should inject the most recent session summary', () => {
    memory.autoSave('Session 1');
    memory.autoSave('Session 2');
    
    const summary = memory.injectSessionSummary();
    expect(summary).toBe('Session 2');
  });
});
