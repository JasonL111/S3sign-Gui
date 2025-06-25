import { invoke } from "@tauri-apps/api/core";
import {encrypt} from "./Secure.js"
export async function saveConfig({ keyId, appKey, endpoint, region, bucketName, durationTime, prefix }) {
    if (appKey.length !== 31) {
      throw new Error("Key格式错误");
    }

    await invoke("save_to_env_file", {
      keyId,
      applicationKey: encrypt(appKey),
      endpoint,
      region,
      bucketName,
      durationTime,
      prefix: prefix || null,
    });
}