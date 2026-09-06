# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概况

offerAI 智能面试官 —— 面向求职人群的 AI 模拟面试系统。产品需求见 [PRD.md](PRD.md)，它是功能与产品决策的唯一事实来源，做功能前先读它。

**当前状态**：前端 `frontend/` 已搭建（Vue 3 + TS + Element Plus，含原型级页面与可交互的脚本化面试流程）；后端 `backend/` 尚未创建。另有 `prototype.html` 为纯静态高保真原型，`PRD.md` 为产品需求。

## 技术栈（已确认）

- **前端**：Vue 3 + TypeScript + Element Plus，构建工具 Vite
- **后端**：Python + FastAPI + MySQL
- 目标平台：Web / 移动端 H5

## 架构

前后端分离，仓库按 `frontend/` 与 `backend/` 两个顶层目录组织。

### 前端 `frontend/`

Vue 3 组合式 API（`<script setup>`），TypeScript 严格模式，Element Plus 作为 UI 组件库，Vite 作为开发与构建工具。路由用 Vue Router（hash 模式），状态管理用 Pinia。

- 路由定义在 `src/router/index.ts`，页面在 `src/views/`，跨页复用组件在 `src/components/`，Pinia store 在 `src/stores/`，类型在 `src/types/`。
- 页面路由与 PRD 六大模块一一对应：登录（`/login`）、首页（`/home`）、求职档案（`/profile`）、AI 模拟面试（`/interview`）、面试报告（`/report`）、简历优化（`/resume`）、就业指导（`/guidance`）、求职社区（`/community`）、个人中心（`/me`）。
- 面试对话是脚本化演示（`src/stores/interview.ts` 里的 `SCRIPT` 数组），非真实 AI。接真实后端时需改为 SSE/流式调用。
- 共享 UI 组件：`StatCard`（数据卡）、`ScoreRing`（评分环）、`ScoreBar`（评分条）、`RadarChart`（SVG 雷达图，纯手绘无图表库依赖）。

### 后端 `backend/`

FastAPI 应用，MySQL 持久化。按领域划分模块，与 PRD 模块对应：`auth`（认证）、`profile`（求职档案）、`interview`（模拟面试）、`resume`（简历优化）、`guidance`（就业指导）。

关键约束：

- **AI 面试 / 简历优化 / 心理辅导均调用 LLM**。核心链路（AI 面试问答、报告生成、简历改写）必须流式返回，避免长等待。选型与定价是 PRD「待确认事项」，落地前需确认。
- **心理辅导有合规边界**：产品非医疗属性，涉及严重心理问题需转介专业机构，相关文案与逻辑必须体现此边界。
- 面试/简历数据为个人敏感数据，需鉴权、权限隔离（仅本人可见）、字段脱敏。

### 数据

MySQL 核心实体大致对应 PRD 字段：用户、求职档案（多份）、面试记录、面试报告、简历、简历诊断记录。

## 开发命令

前端（在 `frontend/` 下）：

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器（默认 http://localhost:5173）
npm run build        # 生产构建（vue-tsc 类型检查 + vite build）
npm run type-check   # 仅做 TypeScript 类型检查，不产出
```

后端（在 `backend/` 下，尚未创建，建议使用虚拟环境）：

```bash
pip install -r requirements.txt   # 安装依赖
uvicorn main:app --reload         # 启动开发服务器
```
