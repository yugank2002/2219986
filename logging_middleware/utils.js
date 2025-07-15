// LoggingMiddleware/utils.js

let cachedToken = null;
let tokenExpiry = null;

const API_BASE = "http://20.244.56.144/evaluation-service";

export async function getAccessToken({ name, email, rollNo, clientID, clientSecret, accessCode }) {
  const now = new Date();

  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, rollNo, clientID, clientSecret, accessCode }),
  });

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = new Date(now.getTime() + 5 * 60 * 1000); // valid for 5 mins

  return cachedToken;
}
