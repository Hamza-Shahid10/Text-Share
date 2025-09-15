import { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ShareForm({ setShareId }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        text,
        createdAt: serverTimestamp(),
      });
      setShareId(docRef.id);
      setText("");
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        rows="5"
        placeholder="✍️ Type your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleShare} disabled={loading}>
        {loading ? "⏳ Sharing..." : "🚀 Share Note"}
      </button>
    </div>
  );
}
