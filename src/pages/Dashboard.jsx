import { useEffect, useRef } from "react";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

  const ringRef = useRef(null);
  const barFillRef = useRef(null);
  const segLearnedRef = useRef(null);
  const segPracticeRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {

    const circumference =
      2 * Math.PI * 85;

    const offset =
      circumference -
      (progress / 100) * circumference;

    setTimeout(() => {

      if (ringRef.current) {

        ringRef.current.style
          .strokeDashoffset = offset;
      }

      if (barFillRef.current) {

        barFillRef.current.style
          .width = `${progress}%`;
      }

      if (segLearnedRef.current) {

        segLearnedRef.current.style
          .width =
          total
            ? `${(totalLearned / total) * 100}%`
            : "0%";
      }

      if (segPracticeRef.current) {

        segPracticeRef.current.style
          .width =
          total
            ? `${(totalPractice / total) * 100}%`
            : "0%";
      }

    }, 100);

  }, []);

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

  const totalLearned =
    knownWords.length;

  const totalPractice =
    unknownWords.length;

  const total =
    totalLearned +
    totalPractice;

  const progress = total
    ? Math.round(
        (totalLearned / total) * 100
      )
    : 0;

  return (

    <div className="dashboard-page">

      <svg
        width="0"
        height="0"
        style={{
          position: "absolute"
        }}
      >

        <defs>

          <linearGradient
            id="ringGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >

            <stop
              offset="0%"
              stopColor="#6d5aef"
            />

            <stop
              offset="100%"
              stopColor="#34d399"
            />

          </linearGradient>

        </defs>

      </svg>

      <div className="page-header">

        <div className="page-header-left">

          <p>
            Vocabulary Tracker
          </p>

          <h1>
            Your Progress
          </h1>

        </div>

      </div>

      <div className="main-grid">

        {/* LEFT */}

        <div className="glass-panel ring-panel">

          <p className="ring-panel-label">
            Success Rate
          </p>

          <div className="ring-wrap">

            <svg
              className="ring"
              viewBox="0 0 200 200"
            >

              <circle
                className="ring-track"
                cx="100"
                cy="100"
                r="85"
              />

              <circle
                ref={ringRef}
                className="ring-fill"
                cx="100"
                cy="100"
                r="85"
              />

            </svg>

            <div className="ring-inner">

              <span className="ring-pct">

                {progress}%

              </span>

              <span className="ring-sub">
                Success
              </span>

            </div>

          </div>

          <div className="ring-legend">

            <div className="ring-legend-row">

              <span className="leg-left">

                <span className="leg-dot green" />

                Learned

              </span>

              <span className="leg-val">

                {totalLearned}

              </span>

            </div>

            <div className="ring-legend-row">

              <span className="leg-left">

                <span className="leg-dot red" />

                Practice

              </span>

              <span className="leg-val">

                {totalPractice}

              </span>

            </div>

            <div className="ring-legend-row">

              <span className="leg-left">

                <span className="leg-dot purple" />

                Total

              </span>

              <span className="leg-val">

                {total}

              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="stats-row">

          <div className="stat-card" onClick={() => navigate("/learned")} style={{ cursor: "pointer" }}>
  <div className="stat-icon green">✓</div>
  <h3>{totalLearned}</h3>
  <p>Learned words</p>
</div>

          <div className="stat-card" onClick={() => navigate("/practice")} style={{ cursor: "pointer" }}>
  <div className="stat-icon red">↺</div>
  <h3>{totalPractice}</h3>
  <p>Need practice</p>
</div>

          <div className="stat-card">

            <div className="stat-icon purple">
              ⊞
            </div>

            <h3>
              {total}
            </h3>

            <p>
              Total words
            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="glass-panel bottom-panel">

          <div className="progress-section">

            <div className="section-header">

              <span className="section-title">

                Overall progress

              </span>

              <span className="section-val">

                {progress}%

              </span>

            </div>

            <div className="progress-track">

              <div
                ref={barFillRef}
                className="progress-fill"
              />

            </div>

          </div>

          <div className="segment-section">

            <div className="section-header">

              <span className="section-title">

                Word distribution

              </span>

            </div>

            <div className="seg-track">

              <div
                ref={segLearnedRef}
                className="seg-learned"
              />

              <div
                ref={segPracticeRef}
                className="seg-practice"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}