import { useState, useEffect } from "react";
import Endpoints from "../utils/Endpoints";
import { ProfileData } from "../types";

export function useProfileData() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Endpoints.profile, {
          credentials: "include",
        });

        // First check if response is OK
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }

        // Check content type before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Invalid content type: ${contentType}. Response: ${text}`,
          );
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Full fetch error:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
