# S3sign-Gui

This project is a cross-platform desktop application built with the [Tauri](https://tauri.app/) framework, designed to easily generate pre-signed URLs for Backblaze (or S3-compatible) object storage.

The front end uses React + the Tauri API, with configuration stored in a `.env` file. It invokes Go backend logic to generate the signatures.

## 🧰 Features

- Generate S3 pre-signed URLs via a GUI interface  
- Save configuration to a `.env` file  
- Load configuration from `.env` and auto-populate the form  
- Simple encryption/decryption scheme for the `APPLICATION_KEY`  
- Use Rust to invoke a local Go program for signature generation  

## ⚙️ Installation & Running

### 1. Environment Setup & Dependency Installation

🔧 Before first run, ensure you have Rust, Go, and Node.js installed:  
- Node.js >= 18  
- Rust >= 1.70  
- Go >= 1.20  
```bash
    npm install       # Install front-end dependencies & Tauri CLI  
    cd src-go  
    go mod tidy       # Initialize Go dependencies  
```
### 2. Start in Development Mode
```bash
    npm run tauri dev  
```
## 🧪 How It Works

### Save Configuration

Click the **Save Configuration** button to write the current form values into the `.env` file in the project root. The `APPLICATION_KEY` will be stored with light encryption.

### Load Configuration

Click the **Load Configuration** button to read the `.env` file and auto-fill the form fields.

### Generate Pre-Signed URL

Click the **Generate Pre-Signed URL** button to send the current form values from the front end to the Rust layer, which then calls the Go program. The Go program reads the `.env` file and generates the signed URL.  
The generation process is controlled by `src-go/main.go`. The output is saved to `src-go/presigned_urls.txt`.

## 📦 Build & Release
```bash
    npm run tauri build  
```
The built artifacts will be located in `src-tauri/target/release/bundle/`.  
