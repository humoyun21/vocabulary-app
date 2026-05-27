import { useNavigate } from "react-router-dom";
import vocabulary from "../data/vocabulary";
import "../styles/words-list.css";

export default function LearnedWordsList() {
  const navigate   = useNavigate();
  const knownIds   = JSON.parse(localStorage.getItem("knownWords")) || [];
  const knownWords = knownIds
    .map((id) => vocabulary.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <div className="wl-page">
      <div className="wl-header">
        <div className="wl-header-left">
          <p className="wl-subtitle">Vocabulary Tracker</p>
          <h1 className="wl-title">Learned Words</h1>
        </div>
        <button className="wl-back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="wl-container">
        <div className="wl-badge wl-badge--green">{knownWords.length} ta so'z</div>

        {knownWords.length === 0 ? (
          <div className="wl-empty">Hali o'rganilgan so'z yo'q.</div>
        ) : (
          <div className="wl-list">
            {knownWords.map((word, index) => (
              <div className="wl-row" key={word.id}>
                <span className="wl-num">{index + 1}</span>
                <span className="wl-dot wl-dot--green" />
                <div className="wl-content">
                  <span className="wl-english">{word.english}</span>
                  <span className="wl-uzbek">{word.uzbek}</span>
                </div>
                <span className="wl-tag wl-tag--green">✓ Learned</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}