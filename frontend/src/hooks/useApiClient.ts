import CoreApi from "api/CoreApi";
import { useRef } from "react";

const useApiClient = () => {
  const apiClient = useRef(
    new CoreApi({
      baseURL: "http://localhost:9000/api",
    })
  );
  return apiClient.current;
};

export default useApiClient;
