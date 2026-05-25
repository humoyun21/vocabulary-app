import { useEffect, useState } from "react";

import vocabulary from "../data/vocabulary";

import FlipCard from "../components/FlipCard";

import "../styles/Home.css";
import "../styles/learn.css";
export default function Learn() {
  const [cardStatus, setCardStatus] = useState(""); 
  const [wordCount, setWordCount]  = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState(() => {
  const saved = localStorage.getItem( "knownWords");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [unknownWords, setUnknownWords] = useState(() => {
    const saved =
      localStorage.getItem(
        "unknownWords"
      );

    return saved
      ? JSON.parse(saved)
      : [];
  });
  useEffect(() => {

  localStorage.setItem(
    "knownWords",
    JSON.stringify(knownWords)
  );

}, [knownWords]);

useEffect(() => {

  localStorage.setItem(
    "unknownWords",
    JSON.stringify(unknownWords)
  );

}, [unknownWords]);

const [selectedLevel, setSelectedLevel]
  = useState("All");

  // RANDOM WORDS
 function startSession() {

  // LEVEL FILTER
  const filteredWords =

    selectedLevel === "All"

      ? vocabulary

      : vocabulary.filter(
          (word) =>
            word.level === selectedLevel
        );

  // RANDOM
  const shuffled = [...filteredWords]
    .sort(() => Math.random() - 0.5);

  // SELECTED COUNT
  const selected =
    shuffled.slice(0, Number(wordCount));

  // RESET
  setKnownWords([]);

  setUnknownWords([]);

  localStorage.removeItem(
    "knownWords"
  );

  localStorage.removeItem(
    "unknownWords"
  );

  setCurrentIndex(0);

  setWords(selected);

  setSessionStarted(true);
}

  const currentWord =
    words[currentIndex];

  // I KNOW
  function handleKnow() {

  setCardStatus("known");

  setKnownWords((prev) => {

    if (prev.includes(currentWord.id)) {
      return prev;
    }

    return [...prev, currentWord.id];
  });

  nextWord();
}

  // I DON'T KNOW
  function handleDontKnow() {
    setCardStatus("unknown");

  setUnknownWords((prev) => {

    if (prev.includes(currentWord.id)) {
      return prev;
    }

    return [...prev, currentWord.id];
  });

  // WORDNI OXIRIGA QAYTA JOYLASH
  setWords((prev) => {

    const updated = [...prev];

    updated.push(currentWord);

    return updated;
  });

  nextWord();
}

  // NEXT WORD
  function nextWord() {

    if (
      currentIndex <
      words.length - 1
    ) {

      setCurrentIndex(
        (prev) => prev + 1
      );
    }
  }

  // START SCREEN // Level selector
  if (!sessionStarted) {

    return (

      <section className="hero">

        <div className="hero-container">

          <h1 style={{ color: "white" }}>
            Start Learning
          </h1>
    
          <div className="level-selector">

  <select
    value={selectedLevel}
    onChange={(e) =>
      setSelectedLevel(
        e.target.value
      )
    }
  >

    <option value="All">
      All Levels
    </option>

    <option value="A1">
      A1
    </option>

    <option value="A2">
      A2
    </option>

    <option value="B1">
      B1
    </option>

    <option value="B2">
      B2
    </option>

    <option value="C1">
      C1
    </option>

  </select>

          </div>


          <div className="search-bar">

            <input
              type="number"
              placeholder="How many words?"
              value={wordCount}
              onChange={(e) =>
                setWordCount(e.target.value)
              }
            />

            <button onClick={startSession}>
              Start
            </button>

          </div>

        </div>

      </section>
    );
  }

  // SESSION FINISHED
  const finished =

  knownWords.length >=
  Number(wordCount);

  if (finished) {

  return (

    <section className="hero">

      <div className="hero-container">

        <div className="stats-card">

          <h1
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            🎉 Congratulations!
          </h1>

          <p
            style={{
              color: "white",
              fontSize: "22px",
            }}
          >

            You learned
            {" "}
            {wordCount}
            {" "}
            words successfully!

          </p>

        </div>

      </div>

    </section>
  );
}
  return (

    <section className="hero">

      <div className="hero-container">

        <FlipCard

  english={currentWord.english}

  uzbek={currentWord.uzbek}

  definition={currentWord.level}

  cardStatus={cardStatus}

/>

        {/* BUTTONS */}

        <div className="action-buttons">

          <button
            className="known-btn"
            onClick={handleKnow}
          >
            I Know
          </button>

          <button
            className="new-btn"
            onClick={handleDontKnow}
          >
            I Don't Know
          </button>

        </div>

        {/* STATS */}

        <div className="stats-card">

          <h2>Statistics</h2>

          <div className="stats-grid">

            <div className="stat-box green">

              <h3>
                {knownWords.length}
              </h3>

              <p>Learned</p>

            </div>

            <div className="stat-box red">

              <h3>
                {unknownWords.length}
              </h3>

              <p>Need Practice</p>

            </div>

            <div className="stat-box">

              <h3>
                {words.length - currentIndex}
              </h3>

              <p>Remaining</p>

            </div>

          </div>

        </div>

        <div className="progress-info">

  <p>

    Word {knownWords.length + 1}
    {" / "}
    {wordCount}

  </p>

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{
        width: `${
          (knownWords.length /
            wordCount) * 100
        }%`,
      }}
    />

  </div>

</div>

      </div>

    </section>
  );
}