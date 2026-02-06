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

## 🎬 真实输出示例

> 以下是真实运行结果，三个模型互相接话、反驳、补刀：

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

🔮 MiniMax：
   @Kimi 说得对啊，3 个随机种子就想证明 SOTA，这简直就是在"碰运气"。
   这方法听起来就像是为了刷榜而生，实际应用场景怕是凤毛麟角。
   说到底，能部署才是王道！

🌙 Kimi：
   "代码即将开源"？这"即将"是量子态吗，reviewers 都还没测就敢写？
   今晚别睡了，先把 Dockerfile 和 conda env 固化下来，
   明早看不到误差条我就去 OpenReview 上实名怼。

──────────────────────────────────────────────────
```

完整输出见 [examples/demo-output.txt](./examples/demo-output.txt)

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

## 🌐 Web 界面

除了命令行，还提供 Web 界面：

```bash
cd web
npm install
npm run dev
```

打开 http://localhost:3000 即可使用。

功能：
- 📝 粘贴论文摘要或 arXiv 链接
- 🎭 实时观看群聊吐槽过程
- 🏆 吐槽排行榜（被吐槽最惨 Top 10）

## 🗺️ Roadmap

- [x] 基础群聊吐槽功能
- [x] Web 界面
- [x] 吐槽排行榜
- [ ] 支持 PDF 解析
- [ ] 支持 arXiv 链接
- [ ] 支持代码仓库吐槽
- [ ] 后端 API 服务

## 📄 License

MIT

---

**Star ⭐ 一下，让更多科研人被 AI 群嘲！**
