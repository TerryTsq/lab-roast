import React, { useState } from 'react';

interface ChatMessage {
  role: 'gemini' | 'minimax' | 'kimi';
  emoji: string;
  name: string;
  content: string;
}

interface LeaderboardItem {
  rank: number;
  title: string;
  quote: string;
  score: number;
}

const JUDGES = [
  { emoji: '💎', name: 'Gemini', desc: 'Google 学院派' },
  { emoji: '🔮', name: 'MiniMax', desc: '国产实用派' },
  { emoji: '🌙', name: 'Kimi', desc: '卷王挑刺派' },
];

// 模拟排行榜数据
const MOCK_LEADERBOARD: LeaderboardItem[] = [
  {
    rank: 1,
    title: '基于 Transformer 的多模态情感分析',
    quote: '"代码即将开源"？这"即将"是量子态吗',
    score: 3.2,
  },
  {
    rank: 2,
    title: '深度强化学习在推荐系统中的应用',
    quote: '3 个 seed 就敢说 SOTA？就这？',
    score: 4.1,
  },
  {
    rank: 3,
    title: '基于图神经网络的知识推理',
    quote: '这延迟，线上根本没法用',
    score: 4.5,
  },
];

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState('');
  const [activeTab, setActiveTab] = useState<'roast' | 'leaderboard'>('roast');

  const handleRoast = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages([]);

    // 模拟群聊过程
    const mockMessages: ChatMessage[] = [
      {
        role: 'gemini',
        emoji: '💎',
        name: 'Gemini',
        content:
          '这篇论文让我想起 Vaswani 等人在 2017 年提出的 Transformer 架构。不过，直接套用这个框架做研究，理论上 novelty 略显不足啊。@Kimi，你觉得呢？',
      },
      {
        role: 'minimax',
        emoji: '🔮',
        name: 'MiniMax',
        content:
          '@Gemini 说得好听，但是比起理论创新，我更关心的是这方法能不能落地。训练成本多少？推理延迟能接受吗？学院派的方法总是那么理想化！',
      },
      {
        role: 'kimi',
        emoji: '🌙',
        name: 'Kimi',
        content:
          '等等，我有个问题... 就这点实验就敢发论文？统计显著性检验呢？我赌五毛作者没做 ablation study，建议今晚通宵把实验补了！',
      },
      {
        role: 'gemini',
        emoji: '💎',
        name: 'Gemini',
        content:
          '@Kimi 你的质疑很有道理。但仅仅增加实验就能解决本质问题吗？这让我想起 Goodfellow 的 GAN 论文，即使结果好看，也无法保证泛化性。',
      },
      {
        role: 'minimax',
        emoji: '🔮',
        name: 'MiniMax',
        content:
          '你们俩别光顾着学术讨论了！我就问一句：这方法能部署到生产环境吗？不能的话，发再多论文有什么用？能落地才是王道！',
      },
      {
        role: 'kimi',
        emoji: '🌙',
        name: 'Kimi',
        content:
          '@MiniMax 说得对，而且我刚发现——"代码即将开源"？这"即将"是量子态吗？reviewers 都还没测就敢写？明早看不到代码我就去 OpenReview 实名怼！',
      },
    ];

    // 逐条显示消息，模拟实时聊天
    for (let i = 0; i < mockMessages.length; i++) {
      const msg = mockMessages[i];
      setCurrentSpeaker(`${msg.emoji} ${msg.name} 正在思考...`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessages((prev) => [...prev, msg]);
      setCurrentSpeaker('');
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🔥 Lab Roast</h1>
        <p>AI 群聊吐槽你的论文 — 三大模型围攻你的学术成果</p>
      </header>

      <div className="judges">
        {JUDGES.map((judge) => (
          <div key={judge.name} className="judge">
            <div className="emoji">{judge.emoji}</div>
            <div className="name">{judge.name}</div>
            <div className="desc">{judge.desc}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'roast' ? 'active' : ''}`}
          onClick={() => setActiveTab('roast')}
        >
          🔥 开始吐槽
        </button>
        <button
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          🏆 吐槽排行榜
        </button>
      </div>

      {activeTab === 'roast' ? (
        <>
          <section className="input-section">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="粘贴你的论文摘要、arXiv 链接，或者直接输入论文内容..."
              disabled={loading}
            />
            <button className="btn" onClick={handleRoast} disabled={loading || !input.trim()}>
              {loading ? '吐槽中...' : '🔥 开始群嘲'}
            </button>
          </section>

          {(messages.length > 0 || loading) && (
            <section className="chat-section">
              <h2>🎭 群聊记录</h2>
              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-message ${msg.role}`}>
                    <div className="header">
                      <span className="emoji">{msg.emoji}</span>
                      <span className="name">{msg.name}</span>
                    </div>
                    <div className="content">{msg.content}</div>
                  </div>
                ))}
                {loading && currentSpeaker && (
                  <div className="loading">
                    <div className="spinner"></div>
                    <span>{currentSpeaker}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="leaderboard">
          <h2>🏆 被吐槽最惨排行榜</h2>
          <div className="leaderboard-list">
            {MOCK_LEADERBOARD.map((item) => (
              <div key={item.rank} className="leaderboard-item">
                <div
                  className={`rank ${
                    item.rank === 1 ? 'gold' : item.rank === 2 ? 'silver' : 'bronze'
                  }`}
                >
                  #{item.rank}
                </div>
                <div className="info">
                  <div className="title">{item.title}</div>
                  <div className="quote">"{item.quote}"</div>
                </div>
                <div className="score">{item.score}/10</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
