import { useState, useCallback } from "react";
import api from "../axiosInstance";

function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (payload = null, config = {}) => {
            setLoading(true);
            setError(null);

            try {
                const res = await api({
                    url,
                    method: options.method || "GET",
                    data: payload,
                    ...config,
                });

                setData(res.data);
                return res.data;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url, options.method]
    );

    return {
        data,
        loading,
        error,
        request,
    };
}

export default useApi;
