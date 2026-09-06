# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概况

offerAI 智能面试官 —— 面向求职人群的 AI 模拟面试系统。产品需求见 [PRD.md](PRD.md)，它是功能与产品决策的唯一事实来源，做功能前先读它。

**当前状态：greenfield（空仓库）。** 截至 2026-09-06，仓库内仅有 PRD.md，尚未创建任何前后端代码。以下架构与命令基于已确认的技术选型，待脚手架落地后以实际文件为准。

## 技术栈（已确认）

- **前端**：Vue 3 + TypeScript + Element Plus，构建工具 Vite
- **后端**：Python + FastAPI + MySQL
- 目标平台：Web / 移动端 H5

## 架构

前后端分离，仓库按 `frontend/` 与 `backend/` 两个顶层目录组织。

### 前端 `frontend/`

Vue 3 组合式 API（`<script setup>`），TypeScript 严格模式，Element Plus 作为 UI 组件库，Vite 作为开发与构建工具。路由用 Vue Router，状态管理用 Pinia。

页面路由与 PRD 六大模块一一对应：登录/首页、求职档案、AI 模拟面试、简历优化、就业指导、个人中心。

AI 面试交互是核心场景，涉及流式输出（SSE / WebSocket）与可能的语音输入，相关组件需独立封装复用。

### 后端 `backend/`

FastAPI 应用，MySQL 持久化。按领域划分模块，与 PRD 模块对应：`auth`（认证）、`profile`（求职档案）、`interview`（模拟面试）、`resume`（简历优化）、`guidance`（就业指导）。

关键约束：

- **AI 面试 / 简历优化 / 心理辅导均调用 LLM**。核心链路（AI 面试问答、报告生成、简历改写）必须流式返回，避免长等待。选型与定价是 PRD「待确认事项」，落地前需确认。
- **心理辅导有合规边界**：产品非医疗属性，涉及严重心理问题需转介专业机构，相关文案与逻辑必须体现此边界。
- 面试/简历数据为个人敏感数据，需鉴权、权限隔离（仅本人可见）、字段脱敏。

### 数据

MySQL 核心实体大致对应 PRD 字段：用户、求职档案（多份）、面试记录、面试报告、简历、简历诊断记录。

## 开发命令

以下为所选技术栈的标准命令，脚手架生成后即适用；若实际命令不同，以 `package.json` / `pyproject.toml` 为准。

前端（在 `frontend/` 下）：

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run lint         # 代码检查
```

后端（在 `backend/` 下，建议使用虚拟环境）：

```bash
pip install -r requirements.txt   # 安装依赖
uvicorn main:app --reload         # 启动开发服务器
```
