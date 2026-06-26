import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProviderRouter } from '../src/llm/ProviderRouter';
import { ConfigManager } from '../src/config/ConfigManager';

vi.mock('../src/config/ConfigManager', () => {
  return {
    ConfigManager: class {
      getConfig() {
        return {
          active_provider: 'anthropic',
          models: {
            major: 'claude-3-7-sonnet',
            minor: 'ollama/llama3'
          },
          api_keys: {}
        };
      }
    }
  };
});

describe('ProviderRouter', () => {
  let router: ProviderRouter;

  beforeEach(() => {
    router = new ProviderRouter();
  });

  it('should route minor requests to local Ollama endpoint', async () => {
    const response = await router.routeRequest({ tier: 'minor', prompt: 'test' });
    expect(response).toContain('Local Ollama at http://127.0.0.1:11434/v1');
    expect(response).toContain('ollama/llama3');
  });

  it('should route major requests to cloud Anthropic endpoint', async () => {
    const response = await router.routeRequest({ tier: 'major', prompt: 'test' });
    expect(response).toContain('Cloud Anthropic at https://api.anthropic.com/v1/messages');
    expect(response).toContain('claude-3-7-sonnet');
  });
});
