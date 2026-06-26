import { Command } from 'commander';
import chalk from 'chalk';
import { AgentRouter } from './router/AgentRouter';
import { ProviderRouter } from './llm/ProviderRouter';
import { ConfigManager } from './config/ConfigManager';

const program = new Command();
const agentRouter = new AgentRouter();
const providerRouter = new ProviderRouter();

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
    
    // Minor model routing for intent parsing
    console.log(chalk.gray(`[DEBUG] Sending intent parsing to Minor Model...`));
    const minorResponse = await providerRouter.routeRequest({ tier: 'minor', prompt });
    console.log(chalk.gray(`[MINOR] -> ${minorResponse}`));
    
    // Pass to our Agent Router
    const intent = agentRouter.route(prompt);
    console.log(chalk.magenta(`[ROUTER] -> ${intent}`));

    // Major model routing for actual execution
    console.log(chalk.gray(`[DEBUG] Executing heavy task on Major Model...`));
    const majorResponse = await providerRouter.routeRequest({ tier: 'major', prompt });
    console.log(chalk.green(`\nFinal output:\n${majorResponse}\n`));
  });

program.parse();
