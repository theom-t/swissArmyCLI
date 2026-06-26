import { Command } from 'commander';
import chalk from 'chalk';
import { AgentRouter } from './router/AgentRouter';
import { ProviderRouter } from './llm/ProviderRouter';
import { ConfigManager } from './config/ConfigManager';
import { AdaptiveMemory } from './memory/AdaptiveMemory';
import { ContextFilter } from './filter/ContextFilter';
import { ToolSearch } from './mcp/ToolSearch';
import { PERSONA_REGISTRY } from './personas/PersonaRegistry';
import { DynamicPersona } from './personas/DynamicPersona';

const program = new Command();
const agentRouter = new AgentRouter();
const providerRouter = new ProviderRouter();
const memory = new AdaptiveMemory();
const filter = new ContextFilter();
const toolSearch = new ToolSearch();

program
  .name('swiss')
  .description('The Swiss Army Knife CLI - Built on Pi Framework')
  .version('1.0.0');

program
  .command('config')
  .description('Show current LLM configuration')
  .action(() => {
    const config = new ConfigManager().getConfig();
    console.log(chalk.cyan('Current ~/.swissrc Configuration:'));
    console.log(JSON.stringify(config, null, 2));
  });

// Catch-all for generic string commands like: swiss "hello"
program
  .argument('[prompt...]', 'The prompt or command to execute')
  .action(async (promptArray: string[]) => {
    if (!promptArray || promptArray.length === 0) return;
    const prompt = promptArray.join(' ');
    console.log(chalk.blue('Pi CLI Framework Initiated...'));
    
    // --- Phase 4: Session Resume ---
    const lastSession = memory.injectSessionSummary();
    if (lastSession) {
      console.log(chalk.yellow(`[MEMORY] Resuming session: ${lastSession}`));
    }
    
    // --- Phase 6: Deferred Tool Search ---
    console.log(chalk.gray(`[DEBUG] Performing embedding search for relevant MCP Tools...`));
    const tools = toolSearch.searchTools(prompt);
    console.log(chalk.cyan(`[TOOL SEARCH] Found ${tools.length} relevant schemas to load into context.`));
    tools.forEach(t => console.log(chalk.cyan(`  - ${t.name}`)));
    
    // Minor model routing for intent parsing
    console.log(chalk.gray(`[DEBUG] Sending intent parsing to Minor Model...`));
    const minorResponse = await providerRouter.routeRequest({ tier: 'minor', prompt });
    console.log(chalk.gray(`[MINOR] -> ${minorResponse}`));
    
    // Pass to our Agent Router
    const personaId = agentRouter.route(prompt);
    const personaDef = PERSONA_REGISTRY.find(p => p.id === personaId) || PERSONA_REGISTRY[0];
    console.log(chalk.magenta(`[ROUTER] -> Instantiating Sub-Agent: ${personaDef.name} (${personaDef.role})`));

    // Execute heavy task via Dynamic Persona
    console.log(chalk.gray(`[DEBUG] Handing task to ${personaDef.name} on Major Model...`));
    const persona = new DynamicPersona(personaDef, providerRouter);
    const majorResponse = await persona.execute(prompt, tools, lastSession);
    
    console.log(chalk.green(`\nFinal output:\n${majorResponse}\n`));
    
    // --- Phase 5: Noise Cancellation ---
    console.log(chalk.gray(`[DEBUG] Simulating 10,000 lines of terminal output...`));
    const mockNoisyLog = `[INFO] Building project...\nDownloading massive dependency... [100%]\nnpm ERR! EACCES permission denied\nExtracting... OK\n`;
    const cleanLog = filter.stripNoise(mockNoisyLog);
    console.log(chalk.red(`[FILTER] Terminal output reduced to:\n${cleanLog}`));

    // --- Phase 4: Session Auto-Save ---
    console.log(chalk.gray(`[DEBUG] Compressing session and Auto-Saving to SQLite...`));
    const rawLogs = `Prompt: ${prompt} | Output: ${majorResponse} | Filtered Logs: ${cleanLog}`;
    const compressed = await memory.compressSession(providerRouter, rawLogs);
    memory.autoSave(compressed);
    console.log(chalk.yellow(`[MEMORY] Auto-Save Complete.`));
  });

program.parse();
