// use-api.js
import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export const usePostApi = <EntityType,>(config: AxiosRequestConfig) => {
    const [state, setState] = useState<{ responseStatus: number; error: any; loading: boolean }>({
        responseStatus: 0,
        error: null,
        loading: false,
    });

    const makeRequest = async (data: EntityType) => {
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
                method: "post",
                data: data
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
            console.log(JSON.stringify(error));

            setState({
                ...state,
                error,
                loading: false,
                responseStatus: 0,
            });
        }
    };

    return {
        ...state,
        makeRequest,
    };
};
