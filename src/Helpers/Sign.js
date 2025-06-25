import { invoke } from "@tauri-apps/api/core";
import { saveConfig } from "./Save.js"
export  async function sign({ keyId, appKey, endpoint, region, bucketName, durationTime, prefix }) {
    try {
      saveConfig({ keyId, appKey, endpoint, region, bucketName, durationTime, prefix })
      await invoke("sign");
      alert("已开始生成");
    } catch (err) {
      console.error("执行失败:", err);
      alert("生成失败: " + (err.message || String(err)));
    }
  }