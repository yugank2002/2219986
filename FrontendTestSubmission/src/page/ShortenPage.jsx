import { useState } from "react";
import UrlInputForm from "../component/UrlInputForm";
import { log } from "../../../logging_middleware/index";

import { API_BASE, STACK } from "../config/constants";

export default function ShortenPage() {
  const [inputs, setInputs] = useState([
    { originalUrl: "", validity: "", shortCode: "" },
  ]);
  const [results, setResults] = useState([]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { originalUrl: "", validity: "", shortCode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const validPayload = inputs
      .filter((input) => isValidUrl(input.originalUrl))
      .map((input) => ({
        url: input.originalUrl,
        expiry: input.validity ? parseInt(input.validity) : undefined,
        customCode: input.shortCode || undefined,
      }));

    if (validPayload.length === 0) {
      alert("Please enter at least one valid URL.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: validPayload }),
      });

      const data = await res.json();
      setResults(data);
      await log(STACK, "info", "shortener", "Shortened URLs successfully");
    } catch {
      await log(STACK, "error", "shortener", "Failed to shorten URLs");
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>

      {inputs.map((_, index) => (
        <UrlInputForm
          key={index}
          index={index}
          data={inputs}
          setData={setInputs}
        />
      ))}

      {inputs.length < 5 && (
        <button onClick={handleAdd}>+ Add More</button>
      )}

      <br />
      <button onClick={handleSubmit}>Shorten URLs</button>

      <div className="results">
        <h2>Results</h2>
        {results.map((result, idx) => {
          const original = result.originalUrl || result.url;
          const short = result.shortUrl || result.shortened;
          const expiry = result.expiryAt || result.expiry;
          return (
            <div key={idx}>
              <p><b>Original:</b> {original}</p>
              <p><b>Shortened:</b> <a href={short}>{short}</a></p>
              <p><b>Expires At:</b> {expiry ? new Date(expiry).toLocaleString() : 'N/A'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
