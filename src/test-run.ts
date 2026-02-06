/**
 * 测试脚本 - 使用 OpenRouter 运行 Lab Roast
 */

import { ROLES, SYSTEM_PROMPT, SUMMARY_PROMPT } from './roles';
import type { ChatMessage, ModelRole } from './types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

// 模型映射
const MODEL_MAP = {
  gemini: 'google/gemini-2.0-flash-001',
  minimax: 'minimax/minimax-01',
  kimi: 'moonshotai/kimi-k2',
};

async function chatWithModel(
  roleId: string,
  messages: ChatMessage[],
  paper: string
): Promise<string> {
  const role = ROLES[roleId];
  const model = MODEL_MAP[roleId as keyof typeof MODEL_MAP];

  const chatHistory = messages
    .map((m) => `${m.role.emoji} ${m.role.name}：${m.content}`)
    .join('\n\n');

  const prompt = `${SYSTEM_PROMPT}

你的角色：${role.emoji} ${role.name}
${role.style}

论文内容摘要：
${paper}

之前的群聊记录：
${chatHistory || '（群聊刚开始，你先开个头吐槽一下这篇论文）'}

现在轮到你 ${role.name} 发言：`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://github.com/TerryTsq/lab-roast',
      'X-Title': 'Lab Roast',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    }),
  });

  const data = (await response.json()) as any;
  if (data.error) {
    console.error(`${role.name} 错误:`, data.error);
    return `（${role.name} 暂时无法发言）`;
  }
  return data.choices?.[0]?.message?.content || '';
}

async function main() {
  console.log('\n🔥 Lab Roast - AI 群聊吐槽大会\n');
  console.log('评委阵容：');
  console.log('  💎 Gemini  - Google 学院派');
  console.log('  🔮 MiniMax - 国产实用派');
  console.log('  🌙 Kimi    - 卷王挑刺派');
  console.log();

  // 测试论文：用一个简单的摘要
  const paper = `
标题：基于 Transformer 的多模态情感分析方法

摘要：本文提出了一种基于 Transformer 的多模态情感分析方法 MM-BERT。
该方法通过跨模态注意力机制融合文本、图像和音频特征，在 CMU-MOSI 数据集上
达到了 85.3% 的准确率，比 baseline 提升了 2.1%。实验使用 3 个随机种子，
在单卡 V100 上训练 24 小时。我们的方法简单有效，代码即将开源。

主要贡献：
1. 提出了跨模态注意力融合模块
2. 在 CMU-MOSI 上达到 SOTA
3. 消融实验验证了各模块有效性
`;

  console.log('📄 论文：基于 Transformer 的多模态情感分析方法\n');
  console.log('─'.repeat(50));
  console.log('\n🎭 群聊开始\n');

  const chat: ChatMessage[] = [];
  const modelOrder = ['gemini', 'minimax', 'kimi'];
  const rounds = 2; // 2 轮对话

  for (let round = 0; round < rounds; round++) {
    for (const roleId of modelOrder) {
      const role = ROLES[roleId];
      process.stdout.write(`${role.emoji} ${role.name} 正在思考...`);

      const content = await chatWithModel(roleId, chat, paper);

      // 清除 "正在思考"
      process.stdout.write('\r' + ' '.repeat(30) + '\r');

      const message: ChatMessage = {
        role,
        content: content.trim(),
        timestamp: new Date(),
      };
      chat.push(message);

      console.log(`${role.emoji} ${role.name}：`);
      console.log(`   ${content.trim()}\n`);
    }
  }

  console.log('─'.repeat(50));
  console.log('\n✅ 群聊结束\n');
}

main().catch(console.error);
