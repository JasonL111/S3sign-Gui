# S3sign-Gui
本项目是一个基于 [Tauri](https://tauri.app/) 框架构建的跨平台桌面应用，用于方便地生成 Backblaze（或兼容 S3）对象存储的预签名 URL。

前端使用 React + Tauri API，配置通过 `.env` 文件存储，调用 Go 后端逻辑生成签名。

## 语言 Language
[English](https://github.com/JasonL111/S3sign-Gui)

## 🧰 功能特性

- 基于 GUI 图形界面生成 S3 预签名 URL
- 支持配置保存至 `.env` 文件
- 支持从 `.env` 读取配置并自动填入表单
- 提供简单的 `application key` 加密/解密方案
- 使用 Rust 调用本地 Go 程序执行签名操作

## ⚙️ 安装与运行
### 1. 配置环境和安装依赖
🔧 首次运行前请确保系统已安装 Rust，Go，Node.js。
- Node.js >= 18
- Rust >= 1.70
- Go >= 1.20
```bash
npm install # 安装前端依赖 & tauri CLI
cd src-go
go mod tidy # 初始化 Go 依赖
```
### 2. 开发模式启动
```bash
npm run tauri dev
```
## 🧪 功能说明
### 保存配置

点击「保存配置」按钮，当前表单内容将写入项目根目录的 .env 文件中。APPLICATION_KEY 会经过轻度加密存储。

### 读取配置

点击「读取配置」将自动读取 .env 并回填到表单中。
### 生成预签名 URL
该按钮将把目前表单中的配置传输给Rust，然后触发 Rust 后端调用 Go 程序，读取 .env 配置并生成签名链接

生成过程由 src-go/main.go 控制。生成结果位于/src-go/presigned_urls.txt

## 📦 构建发布
```bash
npm run tauri build
```
构建后的文件将在 /src-tauri/target/release/bundle/ 