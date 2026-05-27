import { useNavigate } from "react-router-dom";
import vocabulary from "../data/vocabulary";
import "../styles/dashboard.css";

export default function LearnedWordsList() {
  const navigate = useNavigate();

  const knownIds = JSON.parse(localStorage.getItem("knownWords")) || [];

  const knownWords = knownIds
    .map((id) => vocabulary.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="page-header-left">
          <p>Vocabulary Tracker</p>
          <h1>Learned Words</h1>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="words-list-container">
        <div className="words-list-badge green">
          {knownWords.length} ta so'z
        </div>

        {knownWords.length === 0 ? (
          <div className="words-empty">
            Hali o'rganilgan so'z yo'q.
          </div>
        ) : (
          <div className="words-list">
            {knownWords.map((word, index) => (
              <div className="word-row" key={word.id}>
                <span className="word-num">{index + 1}</span>
                <span className="dot green" />
                <span className="word-text">{word.english}</span>
                <span className="word-uz">{word.uzbek}</span>
                <span className="word-tag green">✓ Learned</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}