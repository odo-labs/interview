import { RFP } from "api/Api";
import useApiClient from "hooks/useApiClient";
import { useEffect, useState } from "react";
import RFPCard from "./RFPCard";

const RFPsRoute = () => {
  const apiClient = useApiClient();
  const [rfps, setRfps] = useState<RFP[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRfps = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.rfpsList();
        setRfps(response.data.results);
      } catch (err) {
        setError("Failed to load RFPs. Please try again later.");
        console.error("Error fetching RFPs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRfps();
  }, [apiClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading RFPs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (rfps.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">No RFPs found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-lg p-lg bg-gray-50 min-h-screen">
      {rfps.map((rfp) => (
        <RFPCard key={rfp.id} rfp={rfp} />
      ))}
    </div>
  );
};

export default RFPsRoute;
