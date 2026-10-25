"use client";
import { useEffect, useState } from "react";
import FishForm from "./FishForm";
import AnimatedNumber from "./AnimatedNumber";
import { postPrediction } from "../api";

const START = { Length1: 30.4, Length2: 33.0, Length3: 38.5, Height: 15.0, Width: 5.3 };

export default function RegressionCard({ onResult }) {
  const [fish, setFish] = useState(START);
  const [weight, setWeight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [live, setLive] = useState(false);

  async function predict() {
    setLoading(true);
    setError("");
    try {
      const data = await postPrediction("regression", fish);
      setWeight(data.predicted_weight);
      onResult({ type: "Regression", fish, output: `${data.predicted_weight} g` });
    } catch {
      setError("Backend not reachable. Is FastAPI running on port 8000?");
    }
    setLoading(false);
  }

  // Live mode: predict automatically 400ms after the user stops moving sliders
  useEffect(() => {
    if (!live) return;
    const timer = setTimeout(predict, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fish, live]);

  // Heaviest fish in the dataset is 1650 g - used for the scale bar
  const percent = weight !== null ? Math.min((weight / 1650) * 100, 100) : 0;

  return (
    <section className="card">
      <header className="card-head">
        <div>
          <span className="eyebrow">Model 01 · Linear Regression</span>
          <h2>Fish weight</h2>
          <p className="muted">Estimate the weight from body measurements.</p>
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
          {loading ? "Predicting…" : "Predict weight"}
        </button>
      )}

      {error && <p className="error">{error}</p>}

      <div className={weight !== null ? "result show" : "result"}>
        {weight !== null && (
          <>
            <span className="result-label">Predicted weight</span>
            <div className="big-number">
              <AnimatedNumber value={weight} decimals={0} /> <span className="unit">g</span>
            </div>
            <div className="scale">
              <div className="bar"><div style={{ width: `${percent}%` }} /></div>
              <div className="scale-labels muted small">
                <span>0 g</span>
                <span>{(weight / 1000).toFixed(2)} kg</span>
                <span>1,650 g</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
