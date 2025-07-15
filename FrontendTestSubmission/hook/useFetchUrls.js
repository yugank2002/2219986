import { useEffect, useState } from "react";
import { fetchAllUrls } from "../utils/api";

export default function useFetchUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUrls()
      .then((data) => setUrls(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { urls, loading };
}
