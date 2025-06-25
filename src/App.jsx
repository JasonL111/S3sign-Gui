import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { app } from "@tauri-apps/api";
import {Load} from "./Helpers/Load.js"
import {sign} from "./Helpers/Sign.js"
import {saveConfig} from "./Helpers/Save.js"


function App() {
  const [keyId, setKeyId] = useState("");
  const [appKey, setAppKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [region, setRegion] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [durationTime, setDurationTime] = useState("");
  const [prefix, setPrefix] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await saveConfig({ keyId, appKey, endpoint, region, bucketName, durationTime, prefix });
      alert("配置已保存到.env文件");
    } catch (error) {
      console.error("保存失败:", error);
      alert("保存失败: " + (error.message || String(error)));
    }
  }

  return (
    <main className="container">
      <h1>S3预签名URL生成工具</h1>
      <p>请填写配置信息.</p>
      <form
        className="col"
        autoComplete= "off"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '100%'
        }}
        onSubmit={handleSubmit}
      >
        <input
          id="input"
          value={keyId}
          onChange={(e) => setKeyId(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="KEY_ID"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-app-key"
          value={appKey}
          onChange={(e) => setAppKey(e.currentTarget.value)}
          type="password"
          autoComplete= "off"
          placeholder="APPLICATION_KEY"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="ENDPOINT"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-region"
          value={region}
          onChange={(e) => setRegion(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="REGION"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-bucket"
          value={bucketName}
          onChange={(e) => setBucketName(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="BUCKET_NAME"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-time"
          value={durationTime}
          onChange={(e) => setDurationTime(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="DURATION_TIME"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-prefix"
          value={prefix}
          onChange={(e) => setPrefix(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="PREFIX(可选）"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          width: '80%',
          maxWidth: '500px',
          marginTop: '10px'
          }}>
          <button
            type="submit"
            className="buttonBelow"
          >
            保存配置
          </button>
          <button
            type="button"
            className="buttonBelow"
            onClick={()=>Load({      
              setKeyId,
              setAppKey,
              setEndpoint,
              setRegion,
              setBucketName,
              setDurationTime,
              setPrefix
            })}
          >
            读取配置
          </button>
          <button
            type="button"
            className="buttonBelow"
            onClick={()=>sign({ keyId, appKey, endpoint, region, bucketName, durationTime, prefix })}
          >
            生成预签名URL
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;