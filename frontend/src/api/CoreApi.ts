import { Api, ApiConfig } from "api/Api";

export interface PaginatedResponse<T> {
  results: T[];
  next?: string | null;
  previous?: string | null;
  page?: number;
  page_count?: number;
  count?: number;
}

class CoreApi extends Api<unknown> {
  constructor(config: ApiConfig<unknown> = {}) {
    super(config);

    // Add timezone to all requests
    this.instance.interceptors.request.use((config) => {
      // Get the user's timezone from their browser
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone) {
        config.headers = config.headers || {};
        config.headers["TZ"] = timeZone;
      }
      return config;
    });
  }

  static async messageFromResponse(response: Response, defaultError: string) {
    try {
      const obj = await response.json();
      if (obj.error) {
        if (typeof obj.error === "string") {
          return obj.error;
        } else {
          if (obj.error.message) {
            if (typeof obj.error.message === "string") {
              return obj.error.message;
            } else {
              return JSON.stringify(obj.error.message);
            }
          } else {
            return JSON.stringify(obj.error);
          }
        }
      } else {
        return JSON.stringify(obj);
      }
    } catch {
      try {
        return await response.text();
      } catch {
        return defaultError;
      }
    }
  }
}
export default CoreApi;
