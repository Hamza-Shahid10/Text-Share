import { useState, useEffect } from "react";
import ShareForm from "./components/ShareForm";
import RetrieveNote from "./components/RetrieveNote";
import "./index.css";

function App() {
  const [shareId, setShareId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) setShareId(id);
  }, []);

  const handleCopy = () => {
    const link = `${window.location.origin}/?id=${shareId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  const handleClear = () => {
    setShareId(null);
    window.history.pushState({}, "", window.location.origin); // reset URL
  };

  return (
    <div className="app-container">
      <h1>Text Share ✨</h1>
      <p className="subtitle">Instantly share text & notes between devices</p>

      <ShareForm setShareId={setShareId} />

      {shareId && (
        <div className="share-box">
          <p>
            🔗 Share this link:{" "}
            <a href={`/?id=${shareId}`}>
              {window.location.origin}/?id={shareId}
            </a>
          </p>

          <div className="btn-row">
            <button onClick={handleCopy}>
              {copied ? "✅ Copied!" : "📋 Copy Link"}
            </button>
            <button className="clear-btn" onClick={handleClear}>
              ❌ Clear
            </button>
          </div>

          <small className="expiry">
            ⏳ This note will auto-expire in 30 minutes
          </small>

          <RetrieveNote shareId={shareId} />
        </div>
      )}
    </div>
  );
}

export default App;
