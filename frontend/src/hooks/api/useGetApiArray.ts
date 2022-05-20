import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export const useGetApiArray = (config: AxiosRequestConfig) => {
  const [state, setState] = useState<{ error: any; loading: boolean; data: any[] }>({
    error: null,
    loading: true,
    data: [],
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const valid = true;

      if (valid) {
        setState(s => ({
          ...s,
          data: [],
          error: null,
          loading: true,
        }));
        try {
          const res = await axios({
            ...config,
            url: config.url,
            headers: {
              ...config.headers,
              // Add the Authorization header to the existing headers
              // Authorization: `Bearer ${accessToken}`,
            },
          });

          setState(s => ({
            ...s,
            data: Array.isArray(res.data) ? [...res.data] : [res.data],
            error: null,
            loading: false,
          }));
        } catch (error: any) {
          console.log(JSON.stringify(error));

          console.log(error);
          if (error.response)
            setState(s => ({
              ...s,
              data: [],
              error: error.response?.data,
              loading: false,
            }));
          else
            setState(s => ({
              ...s,
              error: {
                message: 'Network Error , Unable to get response',
              },
              loading: false,
            }));
        }
      }
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
