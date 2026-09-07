# CineTech Architecture — 影视技术原理互动实验室

一个互动的、可视化的影视技术原理教学平台。从光学成像到信号处理，拆解每一个技术细节。

## 模块概览

| 分类 | 模块 |
|------|------|
| 物理光学 | 几何光学基础 · 变焦系统结构 · 镜头工程与像差 · 前置物理滤镜 |
| 摄影机硬件 | 传感器与曝光 · 机身机械系统 · 电影摄影技术 |
| 信号与流程 | ISP 信号处理 · 视频编码工程 |
| 后期交付 | DI 数字中间片 · 音频响度标准 · 广播制式 |
| 工具 | 器材陈列室 · 索尼系统百科 · 实用工具箱 · 知识挑战 |

## 本地运行

**前置要求:** Node.js 18+

```bash
# 安装依赖
npm install

# 设置环境变量（可选，用于 AI 功能）
cp .env.local.example .env.local
# 编辑 .env.local 填入 GEMINI_API_KEY

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000`

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 6
- **图标**: Lucide React
- **搜索**: Fuse.js
- **音频可视化**: wavesurfer.js / peaks.js
- **拖拽**: @dnd-kit

## 项目结构

```
├── App.tsx                 # 主应用（路由、导航、主题）
├── components/             # 功能模块组件
│   ├── GeometricView.tsx   # 几何光学
│   ├── ZoomSystemView.tsx  # 变焦系统
│   ├── GearShowcaseView.tsx# 器材展示
│   └── ...
├── utils/                  # 工具函数
│   ├── optics.ts           # 光学计算
│   ├── quizData.ts         # 题库数据
│   └── searchIndex.ts      # 搜索索引
├── types.ts                # 类型定义
├── index.css               # 设计令牌 & 全局样式
└── index.html              # 入口 HTML
```

## 设计系统

项目使用 CSS 自定义属性管理设计令牌（见 `index.css`）：

- **字体**: Plus Jakarta Sans (正文) / JetBrains Mono (代码)
- **主色**: Cyan/Teal 系列
- **强调色**: Amber
- **中性色**: Zinc 系列
- **间距**: 4px 基准单位
- **动效**: cubic-bezier(0.16, 1, 0.3, 1) 缓出曲线

## 部署

```bash
npm run build
```

构建产物输出至 `dist/` 目录，可部署至任何静态托管服务。

注意：`package.json` 中 `homepage` 字段设置为 `/lensoptics-lab/`，如需更改部署路径请同步修改。
