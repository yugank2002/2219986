import styles from "../style/urlCard.module.css";

export default function UrlCard({ urlData }) {
  return (
    <div className={styles.card}>
      <h3>{urlData.shortUrl}</h3>
      <p><strong>Original:</strong> {urlData.originalUrl}</p>
      <p><strong>Created:</strong> {new Date(urlData.createdAt).toLocaleString()}</p>
      <p><strong>Expires:</strong> {new Date(urlData.expiryAt).toLocaleString()}</p>
      <p><strong>Clicks:</strong> {urlData.clickCount}</p>

      <h4>Click Logs:</h4>
      <ul>
        {urlData.clicks.map((click, index) => (
          <li key={index}>
            {new Date(click.timestamp).toLocaleString()} | Source: {click.source} | Location: {click.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
