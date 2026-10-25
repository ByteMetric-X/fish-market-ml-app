"use client";

// Reusable form with the 5 fish measurements (used by both model cards)

const FIELDS = [
  { key: "Length1", label: "Vertical length", min: 7, max: 60 },
  { key: "Length2", label: "Diagonal length", min: 8, max: 64 },
  { key: "Length3", label: "Cross length", min: 8, max: 68 },
  { key: "Height", label: "Height", min: 1.5, max: 19 },
  { key: "Width", label: "Width", min: 1, max: 8.5 },
];

// Typical (median) measurements of real fish from the dataset
const SAMPLES = {
  Bream: { Length1: 30.4, Length2: 33.0, Length3: 38.5, Height: 15.0, Width: 5.3 },
  Pike: { Length1: 40.1, Length2: 43.0, Length3: 45.8, Height: 7.3, Width: 4.9 },
  Perch: { Length1: 23.2, Length2: 25.3, Length3: 26.8, Height: 6.9, Width: 4.2 },
  Roach: { Length1: 20.5, Length2: 22.5, Length3: 25.0, Height: 6.6, Width: 3.6 },
  Smelt: { Length1: 11.3, Length2: 11.8, Length3: 13.1, Height: 2.2, Width: 1.3 },
};

export default function FishForm({ fish, setFish }) {
  // Change one measurement and keep the rest the same
  function update(key, value) {
    setFish({ ...fish, [key]: value });
  }

  return (
    <div className="form">
      <div className="samples">
        <span className="muted small">Load a sample:</span>
        {Object.keys(SAMPLES).map((name) => (
          <button type="button" key={name} className="chip" onClick={() => setFish(SAMPLES[name])}>
            {name}
          </button>
        ))}
      </div>

      {FIELDS.map((f) => (
        <div className="field" key={f.key}>
          <div className="field-top">
            <label>{f.label}</label>
            <span className="value">{fish[f.key].toFixed(1)} cm</span>
          </div>
          <input
            type="range" min={f.min} max={f.max} step="0.1"
            value={fish[f.key]}
            onChange={(e) => update(f.key, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
