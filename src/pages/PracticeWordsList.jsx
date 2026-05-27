import { useNavigate } from "react-router-dom";
import vocabulary from "../data/vocabulary";
import "../styles/dashboard.css";

export default function PracticeWordsList() {
  const navigate = useNavigate();

  const unknownIds = JSON.parse(localStorage.getItem("unknownWords")) || [];

  const unknownWords = unknownIds
    .map((id) => vocabulary.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="page-header-left">
          <p>Vocabulary Tracker</p>
          <h1>Need Practice</h1>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="words-list-container">
        <div className="words-list-badge red">
          {unknownWords.length} ta so'z
        </div>

        {unknownWords.length === 0 ? (
          <div className="words-empty">
            Mashq kerak bo'lgan so'z yo'q.
          </div>
        ) : (
          <div className="words-list">
            {unknownWords.map((word, index) => (
              <div className="word-row" key={word.id}>
                <span className="word-num">{index + 1}</span>
                <span className="dot red" />
                <span className="word-text">{word.english}</span>
                <span className="word-uz">{word.uzbek}</span>
                <span className="word-tag red">↺ Practice</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}