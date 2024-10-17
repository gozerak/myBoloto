import { useState, useCallback } from 'react';

export const useFetchOnFocus = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const handleFocus = useCallback(async () => {
        if (!isFetched) {
            try {
                const result = await fetchFunction();
                setData(result);
                setIsFetched(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }, [isFetched, fetchFunction]);

    return [data, handleFocus];
};
