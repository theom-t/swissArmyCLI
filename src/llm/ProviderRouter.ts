import { ConfigManager, SwissConfig } from '../config/ConfigManager';

export interface LLMRequest {
  tier: 'major' | 'minor';
  prompt: string;
}

export class ProviderRouter {
  private config: SwissConfig;

  constructor() {
    const manager = new ConfigManager();
    this.config = manager.getConfig();
  }

  public async routeRequest(request: LLMRequest): Promise<string> {
    const model = request.tier === 'major' ? this.config.models.major : this.config.models.minor;
    const provider = this.config.active_provider;

    // Live execution for Google Gemini
    if (provider === 'google' && this.config.api_keys?.google) {
      return await this.callGeminiAPI(model, request.prompt);
    }
    
    // Simulate endpoint resolution for mocked providers
    let endpoint = '';
    if (model.startsWith('ollama/')) {
      endpoint = 'http://127.0.0.1:11434/v1/chat/completions';
      return `[Mock response from Local Ollama at ${endpoint} using ${model}]`;
    } else if (provider === 'anthropic') {
      endpoint = 'https://api.anthropic.com/v1/messages';
      return `[Mock response from Cloud Anthropic at ${endpoint} using ${model}]`;
    } else if (provider === 'openai') {
      endpoint = 'https://api.openai.com/v1/chat/completions';
      return `[Mock response from Cloud OpenAI at ${endpoint} using ${model}]`;
    }
    
    return `[Mock response from Unknown Provider using ${model}]`;
  }

  private async callGeminiAPI(model: string, prompt: string): Promise<string> {
    const apiKey = this.config.api_keys?.google;
    const cleanModel = model.replace(/^google\//, '').replace(/^gemini\//, '');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      if (!response.ok) {
        const err = await response.text();
        return `[ERROR from Gemini API]: ${err}`;
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      }
      return '[Gemini API returned an empty response]';
    } catch (error: any) {
      return `[ERROR fetching Gemini API]: ${error.message}`;
    }
  }
}
