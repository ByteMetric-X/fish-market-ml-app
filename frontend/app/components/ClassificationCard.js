"use client";
import { useEffect, useState } from "react";
import FishForm from "./FishForm";
import { postPrediction } from "../api";

const START = { Length1: 40.1, Length2: 43.0, Length3: 45.8, Height: 7.3, Width: 4.9 };

export default function ClassificationCard({ onResult }) {
  const [fish, setFish] = useState(START);
  const [result, setResult] = useState(null);   // { predicted_species, confidence }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [live, setLive] = useState(false);

  async function predict() {
    setLoading(true);
    setError("");
    try {
      const data = await postPrediction("classification", fish);
      setResult(data);
      onResult({ type: "Classification", fish, output: data.predicted_species });
    } catch {
      setError("Backend not reachable. Is FastAPI running on port 8000?");
    }
    setLoading(false);
  }

  // Live mode: predict automatically after the user stops moving sliders
  useEffect(() => {
    if (!live) return;
    const timer = setTimeout(predict, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fish, live]);

  return (
    <section className="card">
      <header className="card-head">
        <div>
          <span className="eyebrow">Model 02 · Logistic Regression</span>
          <h2>Fish species</h2>
          <p className="muted">Identify which of 7 species the fish belongs to.</p>
        </div>
        <label className="switch">
          <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} />
          <span className="track"><span className="thumb" /></span>
          Live
        </label>
      </header>

      <FishForm fish={fish} setFish={setFish} />

      {!live && (
        <button className="primary" onClick={predict} disabled={loading}>
          {loading ? "Classifying…" : "Identify species"}
        </button>
      )}

      {error && <p className="error">{error}</p>}

      <div className={result ? "result show" : "result"}>
        {result && (
          <>
            <span className="result-label">Predicted species</span>
            <div className="big-number species" key={result.predicted_species}>
              {result.predicted_species}
            </div>
            <div className="scale">
              <div className="bar"><div style={{ width: `${result.confidence * 100}%` }} /></div>
              <div className="scale-labels muted small">
                <span>Model confidence</span>
                <span className="mono">{Math.round(result.confidence * 100)}%</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
