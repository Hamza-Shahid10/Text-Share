import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RetrieveNote({ shareId }) {
  const [note, setNote] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (!shareId) return;
      const ref = doc(db, "notes", shareId);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setNote(snapshot.data().text);
      } else {
        setNote("⚠️ Note not found or expired.");
      }
    };
    fetchNote();
  }, [shareId]);

  const handleCopy = () => {
    if (!note) return;
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setNote(null);
    localStorage.removeItem(shareId);
  };

  if (!note) return null;


  return (
    <div className="note-box">
      <h3>📄 Retrieved Note</h3>
      <textarea readOnly value={note} className="retrieved-textarea" />
      <div className="btn-row">
        <button onClick={handleCopy}>
          {copied ? "✅ Copied!" : "📋 Copy Note"}
        </button>
        <button className="clear-btn" onClick={handleClear}>
          ❌ Clear Note
        </button>
      </div>
    </div>
  );
}
