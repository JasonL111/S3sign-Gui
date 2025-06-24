import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { app } from "@tauri-apps/api";

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
      if(appKey.length!=31){
        throw new Error("Key格式错误");
      }

      await invoke("save_to_env_file", {
        keyId: keyId,
        applicationKey: secure(appKey),
        endpoint: endpoint,
        region: region,
        bucketName: bucketName,
        durationTime: durationTime,
        prefix: prefix || null
      });
      alert('配置已保存到.env文件');
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败: ' + (error.message || String(error)));
    }
  }

  function secure(appKey){
    let first=appKey.slice(0,9)
    let second=appKey.slice(9)
    return second+first
  }
  function decrypt(str) {
    let second = str.slice(0, 21); 
    let first = str.slice(21);
    return first + second;
  }
async function sign() {
  try {
    await invoke("sign");
    alert("已开始生成");
  } catch (err) {
    console.error("执行失败:", err);
    alert("生成失败: " + (err.message || String(err)));
  }
}
  async function handleLoad() {
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
            onClick={handleLoad}
          >
            读取配置
          </button>
          <button
            type="button"
            className="buttonBelow"
            onClick={sign}
          >
            生成预签名URL
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;