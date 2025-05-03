import { RFP } from "api/Api";
import useApiClient from "hooks/useApiClient";
import React, { useEffect, useState } from "react";

function App() {
  const apiClient = useApiClient();

  const [rfps, setRfps] = useState<RFP[]>([]);

  useEffect(() => {
    apiClient.rfpsList().then((response) => {
      setRfps(response.data.results);
    });
  }, [apiClient]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">RFP Management a</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <p className="text-center text-gray-500">
                RFP List will go here a
              </p>
              {rfps.map((rfp) => (
                <div key={rfp.id}>{rfp.title}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
