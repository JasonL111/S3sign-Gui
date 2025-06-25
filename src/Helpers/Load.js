import { invoke } from "@tauri-apps/api/core";
import {decrypt} from "./Secure.js"
export async function Load({      
      setKeyId,
      setAppKey,
      setEndpoint,
      setRegion,
      setBucketName,
      setDurationTime,
      setPrefix}) {
    try {
      const content = await invoke("load_env_file");
      const lines = content.split("\n");
      const data = {};
      for (const line of lines) {
        if (line.includes("=")) {
          const [key, ...rest] = line.split("=");
          data[key.trim()] = rest.join("=").trim();
        }
      }
      setKeyId(data.KEY_ID || "");
      setAppKey(decrypt(data.APPLICATION_KEY || ""));
      setEndpoint(data.ENDPOINT || "");
      setRegion(data.REGION || "");
      setBucketName(data.BUCKET_NAME || "");
      setDurationTime(data.DURATION_TIME || "");
      setPrefix(data.PREFIX || "");

      alert("配置读取成功");
    } catch (err) {
      console.error(err);
      alert("读取失败: " + (err.message || String(err)));
    }
  }