import { useCallback, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export const useApiCallback = () => {
    const [state, setState] = useState<{ responseStatus: number; error: any; loading: boolean }>({
        responseStatus: 0,
        error: null,
        loading: false,
    });

    const makeRequest = useCallback(async (config: AxiosRequestConfig) => {
        setState({
            ...state,
            error: null,
            loading: true,
        });
        try {
            const response = await axios({
                ...config,
                url: config.url,
                headers: {
                    ...config.headers,
                    // Add the Authorization header to the existing headers
                    //   Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.status, typeof response.status);
            setState({
                ...state,
                error: null,
                loading: false,
                responseStatus: response.status,
            });
            return response.data;
        } catch (error) {
            setState({
                ...state,
                error,
                loading: false,
                responseStatus: error.response.status ?? 0,
            });
            return Promise.reject(error)
        }
    }, [])

    return {
        ...state,
        makeRequest,
    };
};
