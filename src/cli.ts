#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { config } from 'dotenv';
import { labRoast } from './index';
import { ROLES } from './roles';

// 加载环境变量
config();

const program = new Command();

program
  .name('lab-roast')
  .description('🔥 AI 群聊吐槽你的论文 - Gemini, MiniMax, Kimi 三模型围攻')
  .version('0.1.0');

program
  .argument('<input>', '论文 PDF 路径或 arXiv URL')
  .option('-r, --rounds <number>', '对话轮数', '6')
  .option('-l, --language <lang>', '输出语言 (zh/en)', 'zh')
  .option('-v, --verbose', '显示详细过程')
  .action(async (input: string, options: { rounds: string; language: string; verbose: boolean }) => {
    console.log(chalk.bold('\n🔥 Lab Roast - AI 群聊吐槽大会\n'));
    console.log(chalk.gray('评委阵容：'));
    console.log(chalk.gray(`  💎 Gemini  - Google 学院派`));
    console.log(chalk.gray(`  🔮 MiniMax - 国产实用派`));
    console.log(chalk.gray(`  🌙 Kimi    - 卷王挑刺派`));
    console.log();

    // 检查 API Keys
    const missingKeys: string[] = [];
    if (!process.env.GEMINI_API_KEY) missingKeys.push('GEMINI_API_KEY');
    if (!process.env.MINIMAX_API_KEY) missingKeys.push('MINIMAX_API_KEY');
    if (!process.env.KIMI_API_KEY) missingKeys.push('KIMI_API_KEY');

    if (missingKeys.length > 0) {
      console.log(chalk.yellow('⚠️  缺少 API Keys:'));
      missingKeys.forEach((key) => console.log(chalk.yellow(`   - ${key}`)));
      console.log(chalk.gray('\n请在 .env 文件中配置，或设置环境变量\n'));
      process.exit(1);
    }

    const spinner = ora('正在解析论文...').start();

    try {
      const result = await labRoast({
        input,
        rounds: parseInt(options.rounds, 10),
        language: options.language as 'zh' | 'en',
        verbose: options.verbose,
      });

      spinner.stop();

      // 输出论文信息
      console.log(chalk.bold(`\n📄 论文：${result.paper.title}\n`));
      console.log(chalk.gray('─'.repeat(50)));

      // 输出群聊记录
      console.log(chalk.bold('\n🎭 群聊记录\n'));

      for (const msg of result.chat) {
        const role = msg.role;
        const prefix = `${role.emoji} ${chalk.bold(role.name)}`;
        console.log(`${prefix}：`);
        console.log(chalk.white(`   ${msg.content}\n`));
      }

      console.log(chalk.gray('─'.repeat(50)));

      // 输出评分和建议
      console.log(chalk.bold(`\n📊 综合评分：${result.score}/10\n`));

      console.log(chalk.bold('💡 认真建议：'));
      result.advice.forEach((advice, i) => {
        console.log(chalk.white(`   ${i + 1}. ${advice}`));
      });

      console.log(chalk.bold(`\n📝 总结：${result.summary}\n`));

    } catch (error) {
      spinner.fail('吐槽失败');
      console.error(chalk.red(`\n错误: ${error}`));
      process.exit(1);
    }
  });

program.parse();
