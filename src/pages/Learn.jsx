import { useEffect, useState } from "react";

import vocabulary from "../data/vocabulary";
import FlipCard from "../components/FlipCard";

import "../styles/learn.css";

export default function Learn() {

  const [cardStatus, setCardStatus]
    = useState("");

  const [wordCount, setWordCount]
    = useState("");

  const [sessionStarted,
    setSessionStarted]
    = useState(false);

  const [words, setWords]
    = useState([]);

  const [currentIndex,
    setCurrentIndex]
    = useState(0);

  const [errorMsg, setErrorMsg]
    = useState(false);

  const [selectedLevel,
    setSelectedLevel]
    = useState("All");

  // SESSION STATS
  const [sessionKnownWords,
    setSessionKnownWords]
    = useState([]);

  const [sessionUnknownWords,
    setSessionUnknownWords]
    = useState([]);

  // OVERALL STATS
  const [knownWords,
    setKnownWords]
    = useState(() => {

      const saved =
        localStorage.getItem(
          "knownWords"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const [unknownWords,
    setUnknownWords]
    = useState(() => {

      const saved =
        localStorage.getItem(
          "unknownWords"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  // SAVE TO LOCAL STORAGE
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

  // START SESSION
  function startSession() {

    const count =
      Number(wordCount);

    if (
      !count ||
      count < 1 ||
      count > 200
    ) {

      setErrorMsg(true);

      return;
    }

    setErrorMsg(false);

    const filteredWords =

      selectedLevel === "All"

        ? vocabulary

        : vocabulary.filter(
            (word) =>
              word.level ===
              selectedLevel
          );

    const shuffled =
      [...filteredWords]
        .sort(() =>
          Math.random() - 0.5
        );

    const selected =
      shuffled.slice(0, count);

    // RESET SESSION ONLY
    setSessionKnownWords([]);

    setSessionUnknownWords([]);

    setCurrentIndex(0);

    setWords(selected);

    setSessionStarted(true);
  }

  const currentWord =
    words[currentIndex];

  // I KNOW
  function handleKnow() {

    setCardStatus("known");

    // SESSION
    setSessionKnownWords((prev) => {

      if (
        prev.includes(currentWord.id)
      ) return prev;

      return [
        ...prev,
        currentWord.id
      ];
    });

    // OVERALL
    setKnownWords((prev) => {

      if (
        prev.includes(currentWord.id)
      ) return prev;

      return [
        ...prev,
        currentWord.id
      ];
    });

    nextWord();
  }

  // I DON'T KNOW
  function handleDontKnow() {

    setCardStatus("unknown");

    // SESSION
    setSessionUnknownWords((prev) => {

      if (
        prev.includes(currentWord.id)
      ) return prev;

      return [
        ...prev,
        currentWord.id
      ];
    });

    // OVERALL
    setUnknownWords((prev) => {

      if (
        prev.includes(currentWord.id)
      ) return prev;

      return [
        ...prev,
        currentWord.id
      ];
    });

    // REPEAT WORD
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

    setCardStatus("");
  }

  // RESET SESSION
  function resetSession() {

    setSessionStarted(false);

    setWords([]);

    setCurrentIndex(0);

    setWordCount("");

    setCardStatus("");

    setSessionKnownWords([]);

    setSessionUnknownWords([]);
  }

  // PROGRESS
  const progress = Number(wordCount)

    ? Math.round(
        (
          sessionKnownWords.length /
          Number(wordCount)
        ) * 100
      )

    : 0;

  // SESSION FINISHED
  const finished =

    sessionKnownWords.length >=
    Number(wordCount);

  // START SCREEN
  if (!sessionStarted) {

    return (

      <section className="hero">

        <div className="hero-container">

          <div className="glass-card">

            <h1 className="learn-title">
              Start Learning
            </h1>

            <p className="learn-subtitle">

              Choose your level and
              how many words to study

            </p>

            {/* LEVEL */}
            <label className="field-label">
              Vocabulary Level
            </label>

            <div className="level-selector liquid-select-wrap">

              <select
                className="liquid-select"
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
                  A1 — Beginner
                </option>

                <option value="A2">
                  A2 — Elementary
                </option>

                <option value="B1">
                  B1 — Intermediate
                </option>

                <option value="B2">
                  B2 — Upper Intermediate
                </option>

                <option value="C1">
                  C1 — Advanced
                </option>

              </select>

            </div>

            {/* WORD COUNT */}
            <label className="field-label">
              Number of Words
            </label>

            <div className="search-bar">

              <input
                className="liquid-input"
                type="number"
                placeholder="e.g. 10"
                min="1"
                max="200"
                value={wordCount}
                onChange={(e) => {

                  setWordCount(
                    e.target.value
                  );

                  setErrorMsg(false);
                }}
              />

              <button
                className="btn-primary"
                onClick={startSession}
              >

                Start →

              </button>

            </div>

            {errorMsg && (

              <p className="error-msg visible">

                Please enter a valid
                word count (1–200).

              </p>
            )}

          </div>

        </div>

      </section>
    );
  }

  // FINISHED SCREEN
  if (finished) {

    return (

      <section className="hero">

        <div className="hero-container">

          <div className="glass-card">

            <div className="congrats-icon">
              🎉
            </div>

            <h1 className="congrats-title">
              Session Complete!
            </h1>

            <p className="congrats-sub">

              You've successfully
              learned

              {" "}

              <strong>

                {wordCount} words

              </strong>

            </p>

            <div className="congrats-stats">

              <div className="congrats-stat green">

                <h3>
                  {sessionKnownWords.length}
                </h3>

                <p>
                  Words Learned
                </p>

              </div>

              <div className="congrats-stat red">

                <h3>
                  {sessionUnknownWords.length}
                </h3>

                <p>
                  Need Practice
                </p>

              </div>

            </div>

            <button
              className="btn-primary"
              onClick={resetSession}
            >

              ← Start New Session

            </button>

          </div>

        </div>

      </section>
    );
  }

  // ACTIVE SESSION
  return (

    <section className="hero">

      <div className="hero-container">

        <div className="glass-card">

          <FlipCard
            english={currentWord.english}
            uzbek={currentWord.uzbek}
            definition={currentWord.level}
            cardStatus={cardStatus}
          />

          {/* BUTTONS */}
          <div className="action-buttons">

            <button
              className="new-btn"
              onClick={handleDontKnow}
            >

              ✕ Don't Know

            </button>

            <button
              className="known-btn"
              onClick={handleKnow}
            >

              ✓ I Know

            </button>

          </div>

          {/* STATS */}
          <div className="stats-card">

            <h2>Statistics</h2>

            <div className="stats-grid">

              <div className="stat-box green">

                <h3>
                  {sessionKnownWords.length}
                </h3>

                <p>Learned</p>

              </div>

              <div className="stat-box red">

                <h3>
                  {sessionUnknownWords.length}
                </h3>

                <p>Practice</p>

              </div>

              <div className="stat-box">

                <h3>
                  {words.length - currentIndex}
                </h3>

                <p>Remaining</p>

              </div>

            </div>

          </div>

          {/* PROGRESS */}
          <div className="progress-info">

            <p>

              <span>

                Word
                {" "}
                {sessionKnownWords.length + 1}
                {" / "}
                {wordCount}

              </span>

              <span>
                {progress}%
              </span>

            </p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${progress}%`
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}