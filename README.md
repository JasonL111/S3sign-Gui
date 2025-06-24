# s3sign-ui
本项目是一个基于 [Tauri](https://tauri.app/) 框架构建的跨平台桌面应用，用于方便地生成 Backblaze（或兼容 S3）对象存储的预签名 URL。

前端使用 React + Tauri API，配置通过 `.env` 文件存储，调用 Go 后端逻辑生成签名。

---

## 🧰 功能特性

- 基于 GUI 图形界面生成 S3 预签名 URL
- 支持配置保存至 `.env` 文件
- 支持从 `.env` 读取配置并自动填入表单
- 提供简单的 `application key` 加密/解密方案
- 使用 Tauri 调用本地 Go 程序执行签名操作

## ⚙️ 安装与运行
### 1. 安装依赖
```bash
npm install
```
### 2. 开发模式启动（自动构建前端 & Tauri）
```bash
npm run tauri dev
```
🔧 首次运行前请确保系统已安装 Rust 和 Go。


## 🧪 功能说明
### 保存配置

点击「保存配置」按钮，当前表单内容将写入项目根目录的 .env 文件中。APPLICATION_KEY 会经过轻度加密存储。

### 读取配置

点击「读取配置」将自动读取 .env 并回填到表单中。
### 生成预签名 URL
该按钮将触发 Rust 后端调用 Go 程序，读取 .env 配置并生成签名链接

生成过程由 src-go/main.go 控制。

## 📦 构建发布
```bash
npm run tauri build
```
构建后的文件将在 /src-tauri/target/release/bundle/ 