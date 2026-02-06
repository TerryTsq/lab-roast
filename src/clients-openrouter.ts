import type { ChatMessage, ModelClient } from './types';
import { ROLES, SYSTEM_PROMPT } from './roles';

/**
 * OpenRouter 统一客户端
 */
export class OpenRouterClient implements ModelClient {
  private apiKey: string;
  private model: string;
  private roleId: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor(apiKey: string, model: string, roleId: string) {
    this.apiKey = apiKey;
    this.model = model;
    this.roleId = roleId;
  }

  async chat(messages: ChatMessage[], paper: string): Promise<string> {
    const role = ROLES[this.roleId];

    const chatHistory = messages
      .map((m) => `${m.role.emoji} ${m.role.name}：${m.content}`)
      .join('\n\n');

    const prompt = `${SYSTEM_PROMPT}

你的角色：${role.emoji} ${role.name}
${role.style}

论文内容摘要：
${paper.slice(0, 3000)}

之前的群聊记录：
${chatHistory || '（群聊刚开始，你先开个头吐槽一下这篇论文）'}

现在轮到你 ${role.name} 发言：`;

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://github.com/TerryTsq/lab-roast',
        'X-Title': 'Lab Roast',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      }),
    });

    const data = (await response.json()) as { choices: { message: { content: string } }[] };
    return data.choices[0]?.message?.content || '';
  }
}

// 保留原有客户端以备后用
export { GeminiClient } from './clients-original';
export { MiniMaxClient } from './clients-original';
export { KimiClient } from './clients-original';
