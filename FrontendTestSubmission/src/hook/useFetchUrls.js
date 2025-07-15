import { useState, useEffect } from "react";
import { fetchAllUrls } from "../utils/api";

export default function useFetchUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const data = await fetchAllUrls();
        setUrls(data);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUrls();
  }, []);

  return { urls, loading };
}
