# 🔥 Lab Roast

**AI 群聊吐槽你的论文** — Gemini、MiniMax、Kimi 三大模型围攻你的学术成果

> "这方法不就是 2019 年那篇的变体吗？" —— Gemini
> 
> "能落地吗？延迟多少？" —— MiniMax
> 
> "就跑了 3 个 seed，结果可信吗？" —— Kimi

## 🎭 这是什么？

一个让三个 AI 模型在群聊里讨论（吐槽）你论文的工具。

不是轮流发言，是**真正的群聊**——互相接话、反驳、抬杠、补刀。

## 🚀 快速开始

```bash
# 安装
npm install -g lab-roast

# 吐槽论文
lab-roast ./my_paper.pdf

# 或者用 arXiv 链接
lab-roast https://arxiv.org/abs/2401.12345
```

## 🎬 输出示例

```
🎭 Lab Roast 群聊

📄 论文：《基于深度学习的 XX 方法研究》

---

💎 Gemini：
这方法不就是 2019 年 Google 那篇的变体吗？我记得当时已经被证明在大规模数据上不 work...

🔮 MiniMax：
@Gemini 你说的那篇我看过，但人家这个至少能跑起来。问题是——这能部署到生产环境吗？延迟多少？

🌙 Kimi：
@MiniMax 你还关心部署？我先问一句，这实验就跑了 3 个 seed，你们觉得这结果可信吗？

💎 Gemini：
@Kimi 同意，而且 Table 2 的 baseline 选得也很迷，为什么不比 SOTA？

🔮 MiniMax：
笑了，可能比了就没法发了吧 😏

🌙 Kimi：
建议作者通宵把实验补了，不然审稿人第一轮就毙

---

📊 群聊结论：5.8/10

💡 认真建议：
1. 补充更多 random seed 实验
2. 添加与 SOTA 方法的对比
3. 讨论方法的局限性
```

## 🤖 三位评委

| 模型 | 人设 | 风格 |
|------|------|------|
| 💎 **Gemini** | Google 学院派 | 爱引用论文反驳，学术范儿 |
| 🔮 **MiniMax** | 国产实用派 | 关注落地、部署、性能 |
| 🌙 **Kimi** | 卷王挑刺派 | 质疑工作量，善于找漏洞 |

## ⚙️ 配置

创建 `.env` 文件：

```bash
GEMINI_API_KEY=your_gemini_key
MINIMAX_API_KEY=your_minimax_key
KIMI_API_KEY=your_kimi_key
```

或者使用环境变量。

## 📦 API 使用

```javascript
import { labRoast } from 'lab-roast';

const result = await labRoast({
  input: './paper.pdf',  // 或 arXiv URL
  rounds: 6,             // 对话轮数 (默认 6)
  language: 'zh',        // 输出语言 (zh/en)
});

console.log(result.chat);      // 群聊记录
console.log(result.score);     // 综合评分
console.log(result.advice);    // 认真建议
```

## 🛠️ 本地开发

```bash
git clone https://github.com/TerryTsq/lab-roast.git
cd lab-roast
npm install
npm run dev
```

## 🗺️ Roadmap

- [x] 基础群聊吐槽功能
- [ ] 支持 PDF 解析
- [ ] 支持 arXiv 链接
- [ ] 支持代码仓库吐槽
- [ ] Web 界面
- [ ] 吐槽排行榜

## 📄 License

MIT

---

**Star ⭐ 一下，让更多科研人被 AI 群嘲！**
