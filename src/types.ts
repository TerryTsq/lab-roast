/**
 * 模型角色定义
 */
export interface ModelRole {
  id: 'gemini' | 'minimax' | 'kimi';
  name: string;
  emoji: string;
  persona: string;
  style: string;
}

/**
 * 群聊消息
 */
export interface ChatMessage {
  role: ModelRole;
  content: string;
  replyTo?: string;  // @某个模型
  timestamp: Date;
}

/**
 * 吐槽结果
 */
export interface RoastResult {
  paper: {
    title: string;
    abstract?: string;
    content: string;
  };
  chat: ChatMessage[];
  score: number;
  advice: string[];
  summary: string;
}

/**
 * 配置选项
 */
export interface RoastOptions {
  input: string;           // PDF 路径或 arXiv URL
  rounds?: number;         // 对话轮数，默认 6
  language?: 'zh' | 'en';  // 输出语言，默认 zh
  verbose?: boolean;       // 详细输出
}

/**
 * 模型客户端接口
 */
export interface ModelClient {
  chat(messages: ChatMessage[], paper: string): Promise<string>;
}
