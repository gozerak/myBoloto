import { useState, useCallback } from 'react';


//получение данных для выпадающих списков, в Filters и AddJobButton для Organization, activityType, city
export const useFetchOnFocus = <T,>(fetchFunction: () => Promise<T[]>): [T[], () => Promise<void>] => {
    const [data, setData] = useState<T[]>([]);
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
