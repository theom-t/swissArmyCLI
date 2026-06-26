import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface SwissConfig {
  active_provider: string;
  models: {
    major: string;
    minor: string;
  };
  api_keys: {
    anthropic?: string;
    openai?: string;
    google?: string;
  };
}

const DEFAULT_CONFIG: SwissConfig = {
  active_provider: 'anthropic',
  models: {
    major: 'claude-3-7-sonnet',
    minor: 'ollama/llama3'
  },
  api_keys: {}
};

export class ConfigManager {
  private configPath: string;

  constructor() {
    this.configPath = path.join(os.homedir(), '.swissrc');
  }

  public getConfig(): SwissConfig {
    if (!fs.existsSync(this.configPath)) {
      this.saveConfig(DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
    const raw = fs.readFileSync(this.configPath, 'utf8');
    try {
      return JSON.parse(raw) as SwissConfig;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  public saveConfig(config: SwissConfig) {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf8');
  }
}
