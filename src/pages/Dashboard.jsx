import "../styles/dashboard.css";

export default function Dashboard() {

  const knownWords =
    JSON.parse(
      localStorage.getItem(
        "knownWords"
      )
    ) || [];

  const unknownWords =
    JSON.parse(
      localStorage.getItem(
        "unknownWords"
      )
    ) || [];

  const total =
    knownWords.length +
    unknownWords.length;

  const accuracy =
    total > 0
      ? Math.round(
          (knownWords.length / total)
          * 100
        )
      : 0;

  return (

    <section className="dashboard">

      <div className="dashboard-container">

        <h1>
          Your Progress
        </h1>

        <div className="dashboard-grid">

          {/* LEARNED */}

          <div className="dashboard-card">

            <h2>
              {knownWords.length}
            </h2>

            <p>
              Learned Words
            </p>

          </div>

          {/* NEED PRACTICE */}

          <div className="dashboard-card red">

            <h2>
              {unknownWords.length}
            </h2>

            <p>
              Need Practice
            </p>

          </div>

          {/* ACCURACY */}

          <div className="dashboard-card purple">

            <h2>
              {accuracy}%
            </h2>

            <p>
              Accuracy
            </p>

          </div>

        </div>

        {/* RECENT WORDS */}

        <div className="recent-section">

          <h2>
            Recently Learned
          </h2>

          <div className="recent-words">

            {knownWords.map((word, index) => (

              <span key={index}>
                {word}
              </span>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}