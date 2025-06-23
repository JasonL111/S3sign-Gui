import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

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
      await invoke("save_to_env_file", {
        keyId: keyId,
        applicationKey: appKey,
        endpoint: endpoint,
        region: region,
        bucketName: bucketName,
        durationTime: durationTime,
        prefix: prefix || null
      });
      
      
      alert('配置已保存到.env文件');
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败: ' + error);
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
          onChange={(e) => setKeyId(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="KEY_ID"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-app-key"
          onChange={(e) => setAppKey(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="APPLICATION_KEY"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-endpoint"
          onChange={(e) => setEndpoint(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="ENDPOINT"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-region"
          onChange={(e) => setRegion(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="REGION"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-bucket"
          onChange={(e) => setBucketName(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="BUCKET_NAME"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-time"
          onChange={(e) => setDurationTime(e.currentTarget.value)}
          autoComplete= "off"
          placeholder="DURATION_TIME"
          style={{ width: '80%', maxWidth: '300px' }}
        />
        <input
          id="input-prefix"
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
            className="submit-button"
            style={{ 
              marginTop: '10px', 
              padding: '8px 16px',
              width: '80%', 
              maxWidth: '300px' 
            }}
          >
            保存配置
          </button>
          {/* 功能开发中... */}

          {/* <button
            type="submit"
            className="submit-button"
            style={{ 
              marginTop: '10px', 
              padding: '8px 16px',
              width: '80%', 
              maxWidth: '300px' 
            }}
          >
            读取配置
          </button>
          <button
            type="submit"
            className="submit-button"
            style={{ 
              marginTop: '10px', 
              padding: '8px 16px',
              width: '80%', 
              maxWidth: '300px' 
            }}
          >
            生成预签名URL
          </button> */}
          </div>
        </form>
    </main>
  );
}

export default App;