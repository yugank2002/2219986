import { getAccessToken } from "./utils.js";

const API_BASE = "http://20.244.56.144/evaluation-service";

// Centralized error handling
function handleError(context, err) {
  console.error(`${context} failed:`, err.message);
  throw err;
}

// 1. REGISTER
export async function register() {
  const credentials = {
    name: "Yugank Prajapati",
    email: "yugank2005@gmail.com",
    rollNo: "2219986",
    clientID: "9651297221",
    clientSecret: "yugank2002",
    accessCode: "QAhDUr",
  };

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    console.log("Registration successful:", data);
    return data;
  } catch (err) {
    handleError("Registration", err);
  }
}

// 2. AUTHENTICATE
export async function auth() {
  const credentials = {
    name: "Yugank Prajapati",
    email: "yugank2005@gmail.com",
    rollNo: "2219986",
    clientID: "9651297221",
    clientSecret: "yugank2002",
    accessCode: "QAhDUr",
  };

  try {
    const token = await getAccessToken(credentials);
    console.log("Authentication successful:", token);
    return token;
  } catch (err) {
    handleError("Authentication", err);
  }
}

// 3. LOGGING
export async function log({ stack, level, pkg, message }) {
  const credentials = {
    name: "Yugank Prajapati",
    email: "yugank2005@gmail.com",
    rollNo: "2219986",
    clientID: "9651297221",
    clientSecret: "yugank2002",
    accessCode: "QAhDUr",
  };

  try {
    const token = await getAccessToken(credentials);

    const res = await fetch(`${API_BASE}/logs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await res.json();
    console.log("Logging successful:", data);
    return data;
  } catch (err) {
    handleError("Logging", err);
  }
}
