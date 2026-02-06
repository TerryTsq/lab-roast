import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, ModelClient } from './types';
import { ROLES, SYSTEM_PROMPT } from './roles';

/**
 * Gemini 客户端
 */
export class GeminiClient implements ModelClient {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model = 'gemini-2.0-flash') {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  async chat(messages: ChatMessage[], paper: string): Promise<string> {
    const role = ROLES.gemini;
    const model = this.client.getGenerativeModel({ model: this.model });

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

    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}

/**
 * MiniMax 客户端
 */
export class MiniMaxClient implements ModelClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.minimax.chat/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async chat(messages: ChatMessage[], paper: string): Promise<string> {
    const role = ROLES.minimax;

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

    const response = await fetch(`${this.baseUrl}/text/chatcompletion_v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'MiniMax-Text-01',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      }),
    });

    const data = (await response.json()) as { choices: { message: { content: string } }[] };
    return data.choices[0]?.message?.content || '';
  }
}

/**
 * Kimi 客户端
 */
export class KimiClient implements ModelClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.moonshot.cn/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async chat(messages: ChatMessage[], paper: string): Promise<string> {
    const role = ROLES.kimi;

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
      },
      body: JSON.stringify({
        model: 'kimi-latest',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      }),
    });

    const data = (await response.json()) as { choices: { message: { content: string } }[] };
    return data.choices[0]?.message?.content || '';
  }
}
