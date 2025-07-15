import useFetchUrls from "../hook/useFetchUrls";
import UrlCard from "../component/UrlCard";

export default function Home() {
  const { urls, loading } = useFetchUrls();

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Shortened URLs Statistics</h1>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        urls.map((url, i) => <UrlCard key={i} urlData={url} />)
      )}
    </div>
  );
}
