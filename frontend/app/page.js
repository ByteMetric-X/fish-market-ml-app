"use client";
import { useEffect, useState } from "react";
import RegressionCard from "./components/RegressionCard";
import ClassificationCard from "./components/ClassificationCard";
import { getScores } from "./api";

export default function Home() {
  const [scores, setScores] = useState(null);
  const [history, setHistory] = useState([]);

  // On page load: get the model scores from the backend
  useEffect(() => {
    getScores()
      .then((data) => setScores(data))
      .catch(() => setScores(null));
  }, []);

  // Keep the last 6 predictions (newest first)
  function addToHistory(item) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setHistory((old) => [{ ...item, time }, ...old].slice(0, 6));
  }

  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">
          <span className="logo">◆</span> FishScale
        </div>
      </nav>

      <header className="hero">
        <h1>
          Measure the fish. <em>Know the catch.</em>
        </h1>
        <p className="muted">
          A fish market wants to price and sort fish without weighing every one.
          Two machine-learning models trained on 158 real fish predict the weight
          and the species from simple tape measurements.
        </p>
        <div className="metrics">
          <div className="metric">
            <span className="mono">{scores ? scores.r2 : "—"}</span>
            <span>R² · regression</span>
          </div>
          <div className="metric">
            <span className="mono">{scores ? `${(scores.accuracy * 100).toFixed(1)}%` : "—"}</span>
            <span>Accuracy · classification</span>
          </div>
          <div className="metric">
            <span className="mono">158</span>
            <span>Fish in dataset</span>
          </div>
        </div>
      </header>

      <div className="grid">
        <RegressionCard onResult={addToHistory} />
        <ClassificationCard onResult={addToHistory} />
      </div>

      <section className="history">
        <h3>Recent predictions</h3>
        {history.length === 0 ? (
          <p className="muted small">Your predictions will appear here.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Time</th><th>Model</th><th>Length</th><th>Height</th><th>Width</th><th>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="fade-in">
                  <td className="mono">{h.time}</td>
                  <td>{h.type}</td>
                  <td>{h.fish.Length1} cm</td>
                  <td>{h.fish.Height} cm</td>
                  <td>{h.fish.Width} cm</td>
                  <td className="mono strong">{h.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

    </main>
  );
}
