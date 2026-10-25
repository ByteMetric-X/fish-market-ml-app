// All calls to the FastAPI backend live here
export const API_URL = "http://localhost:8000";

export async function postPrediction(type, fish) {
  // type is "regression" or "classification"
  const res = await fetch(`${API_URL}/predict/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fish),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function getScores() {
  const res = await fetch(`${API_URL}/scores`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}
