import { Command } from 'commander';
import chalk from 'chalk';
import { AgentRouter } from './router/AgentRouter';

const program = new Command();
const router = new AgentRouter();

program
  .name('swiss')
  .description('The Swiss Army Knife CLI - Built on Pi Framework')
  .version('1.0.0');

// Catch-all for generic string commands like: swiss "hello"
program
  .argument('<prompt...>', 'The prompt or command to execute')
  .action((promptArray: string[]) => {
    const prompt = promptArray.join(' ');
    console.log(chalk.blue('Pi CLI Framework Initiated...'));
    console.log(chalk.gray(`[DEBUG] Analyzing intent for: "${prompt}"`));
    
    // Pass to our Router
    const response = router.route(prompt);
    
    console.log(chalk.green(`\n${response}\n`));
  });

program.parse();
