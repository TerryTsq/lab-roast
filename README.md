# 🔥 Lab Roast

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

**AI Group Roast Your Paper** — Gemini, MiniMax, Kimi debate and roast your academic work

> "Isn't this just a variant of that 2019 paper?" —— Gemini
> 
> "Can it be deployed? What's the latency?" —— MiniMax
> 
> "Only 3 seeds and you claim SOTA?" —— Kimi

### 🎭 What is this?

A tool that lets three AI models discuss (roast) your paper in a group chat.

Not taking turns — **real group chat** with replies, rebuttals, and pile-ons.

### 🚀 Quick Start

```bash
# Install
npm install -g lab-roast

# Roast a paper
lab-roast ./my_paper.pdf

# Or use arXiv link
lab-roast https://arxiv.org/abs/2401.12345

# English output
lab-roast ./paper.pdf --language en
```

### 🤖 The Three Judges

| Model | Persona | Style |
|-------|---------|-------|
| 💎 **Gemini** | Google Academic | Cites papers, theoretical |
| 🔮 **MiniMax** | Pragmatic Engineer | Deployment-focused |
| 🌙 **Kimi** | Nitpicker Expert | Finds every flaw |

### ⚙️ Configuration

Create `.env` file:

```bash
GEMINI_API_KEY=your_key
MINIMAX_API_KEY=your_key
KIMI_API_KEY=your_key
# Or use OpenRouter
OPENROUTER_API_KEY=your_key
```

---

<a name="中文"></a>
## 中文

**AI 群聊吐槽你的论文** — Gemini、MiniMax、Kimi 三大模型围攻你的学术成果

> "这方法不就是 2019 年那篇的变体吗？" —— Gemini
> 
> "能落地吗？延迟多少？" —— MiniMax
> 
> "就跑了 3 个 seed，结果可信吗？" —— Kimi

### 🎭 这是什么？

一个让三个 AI 模型在群聊里讨论（吐槽）你论文的工具。

不是轮流发言，是**真正的群聊**——互相接话、反驳、抬杠、补刀。

### 🚀 快速开始

```bash
# 安装
npm install -g lab-roast

# 吐槽论文
lab-roast ./my_paper.pdf

# 或者用 arXiv 链接
lab-roast https://arxiv.org/abs/2401.12345

# 中文输出（默认）
lab-roast ./paper.pdf --language zh
```

### 🤖 三位评委

| 模型 | 人设 | 风格 |
|------|------|------|
| 💎 **Gemini** | Google 学院派 | 爱引用论文反驳，学术范儿 |
| 🔮 **MiniMax** | 国产实用派 | 关注落地、部署、性能 |
| 🌙 **Kimi** | 卷王挑刺派 | 质疑工作量，善于找漏洞 |

### ⚙️ 配置

创建 `.env` 文件：

```bash
GEMINI_API_KEY=your_key
MINIMAX_API_KEY=your_key
KIMI_API_KEY=your_key
# 或使用 OpenRouter
OPENROUTER_API_KEY=your_key
```

---

## 🎬 Demo Output / 示例输出

```
🔥 Lab Roast - AI 群聊吐槽大会

📄 论文：基于 Transformer 的多模态情感分析方法

──────────────────────────────────────────────────

💎 Gemini：
   这篇 MM-BERT，让我想起 Vaswani 等人在 2017 年提出的 Transformer 架构，
   attention is all you need。不过，直接套用 Transformer 做多模态融合，
   理论上 novelty 略显不足啊。@Kimi，你觉得呢？

🔮 MiniMax：
   @Gemini 说得好听，但是比起理论创新，我更关心的是这方法能不能落地。
   85.3% 的准确率听起来不错，可训练时间要 24 小时，单卡 V100 的成本可不低啊。
   学院派的方法总是那么理想化，落地才是硬道理！

🌙 Kimi：
   等等，我有个问题... 3 个随机种子就敢说 SOTA？就这？
   p 值怕不是刚好蹭到 0.049 吧！我赌五毛他们没搜 learning rate，
   作者现在立刻去实验室通宵把 seeds 加到 10 个，不然这文章连综测都过不去！

──────────────────────────────────────────────────
```

## 📦 API Usage / API 使用

```javascript
import { labRoast } from 'lab-roast';

const result = await labRoast({
  input: './paper.pdf',
  rounds: 6,
  language: 'zh',  // 'zh' | 'en'
});

console.log(result.chat);
console.log(result.score);
console.log(result.advice);
```

## 🗺️ Roadmap

- [x] Core roast functionality / 基础群聊吐槽功能
- [x] Web UI / Web 界面
- [x] Leaderboard / 吐槽排行榜
- [x] i18n (zh/en) / 中英文支持
- [ ] PDF parsing / PDF 解析
- [ ] arXiv link support / arXiv 链接支持

## 🤝 Related Projects / 相关项目

- [StatCheck](https://github.com/TerryTsq/statcheck) — Serious version / 严肃分析版
- [Citely](https://citely.ai) — Citation verification / 引用验证
- [DeepCode](https://github.com/HKUDS/DeepCode) — Paper reproduction / 论文复现

## 📄 License

MIT

---

**Star ⭐ if you want more papers to be roasted!**

**Star ⭐ 一下，让更多科研人被 AI 群嘲！**
