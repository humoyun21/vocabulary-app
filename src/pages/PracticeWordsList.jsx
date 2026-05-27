import { useNavigate } from "react-router-dom";
import vocabulary from "../data/vocabulary";
import "../styles/words-list.css";

export default function PracticeWordsList() {
  const navigate = useNavigate();
  const unknownIds   = JSON.parse(localStorage.getItem("unknownWords")) || [];
  const unknownWords = unknownIds
    .map((id) => vocabulary.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <div className="wl-page">
      <div className="wl-header">
        <div className="wl-header-left">
          <p className="wl-subtitle">Vocabulary Tracker</p>
          <h1 className="wl-title">Need Practice</h1>
        </div>
        <button className="wl-back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="wl-container">
        <div className="wl-badge wl-badge--red">{unknownWords.length} ta so'z</div>

        {unknownWords.length === 0 ? (
          <div className="wl-empty">Mashq kerak bo'lgan so'z yo'q.</div>
        ) : (
          <div className="wl-list">
            {unknownWords.map((word, index) => (
              <div className="wl-row" key={word.id}>
                <span className="wl-num">{index + 1}</span>
                <span className="wl-dot wl-dot--red" />
                <div className="wl-content">
                  <span className="wl-english">{word.english}</span>
                  <span className="wl-uzbek">{word.uzbek}</span>
                </div>
                <span className="wl-tag wl-tag--red">↺ Practice</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}