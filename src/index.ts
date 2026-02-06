import type { ChatMessage, RoastOptions, RoastResult, ModelClient } from './types';
import { ROLES, SUMMARY_PROMPT } from './roles';
import { GeminiClient, MiniMaxClient, KimiClient } from './clients';
import { extractPaper } from './paper';

/**
 * 主函数：发起群聊吐槽
 */
export async function labRoast(options: RoastOptions): Promise<RoastResult> {
  const { input, rounds = 6, language = 'zh', verbose = false } = options;

  // 1. 提取论文内容
  const paper = await extractPaper(input);

  // 2. 初始化三个模型客户端
  const clients: Record<string, ModelClient> = {
    gemini: new GeminiClient(process.env.GEMINI_API_KEY || ''),
    minimax: new MiniMaxClient(process.env.MINIMAX_API_KEY || ''),
    kimi: new KimiClient(process.env.KIMI_API_KEY || ''),
  };

  // 3. 开始群聊
  const chat: ChatMessage[] = [];
  const modelOrder = ['gemini', 'minimax', 'kimi'];

  for (let round = 0; round < rounds; round++) {
    for (const modelId of modelOrder) {
      const client = clients[modelId];
      const role = ROLES[modelId];

      if (verbose) {
        console.log(`\n${role.emoji} ${role.name} 正在思考...`);
      }

      try {
        const content = await client.chat(chat, paper.content);

        const message: ChatMessage = {
          role,
          content: content.trim(),
          timestamp: new Date(),
        };

        chat.push(message);

        if (verbose) {
          console.log(`${role.emoji} ${role.name}：${content.trim()}`);
        }
      } catch (error) {
        if (verbose) {
          console.error(`${role.emoji} ${role.name} 发言失败:`, error);
        }
      }
    }
  }

  // 4. 生成总结
  const summary = await generateSummary(clients.gemini, chat, paper.content);

  return {
    paper,
    chat,
    score: summary.score,
    advice: summary.advice,
    summary: summary.text,
  };
}

/**
 * 生成总结评分
 */
async function generateSummary(
  client: ModelClient,
  chat: ChatMessage[],
  paper: string
): Promise<{ score: number; advice: string[]; text: string }> {
  const chatHistory = chat
    .map((m) => `${m.role.emoji} ${m.role.name}：${m.content}`)
    .join('\n\n');

  const prompt = `论文内容：
${paper.slice(0, 2000)}

群聊讨论：
${chatHistory}

${SUMMARY_PROMPT}`;

  // 用 Gemini 生成总结
  const gemini = client as GeminiClient;
  const messages: ChatMessage[] = [];
  const response = await gemini.chat(messages, prompt);

  // 解析响应
  const scoreMatch = response.match(/评分[：:]\s*(\d+(?:\.\d+)?)/);
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : 5;

  const adviceMatch = response.match(/建议[：:]\s*([\s\S]*?)(?:总结|$)/);
  const adviceText = adviceMatch ? adviceMatch[1] : '';
  const advice = adviceText
    .split(/\d+\.\s*/)
    .filter((s) => s.trim())
    .map((s) => s.trim());

  const summaryMatch = response.match(/总结[：:]\s*(.+)/);
  const text = summaryMatch ? summaryMatch[1].trim() : '需要进一步完善';

  return { score, advice, text };
}

export * from './types';
export { ROLES } from './roles';
