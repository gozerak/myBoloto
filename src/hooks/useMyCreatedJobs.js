import { useState, useEffect } from "react";
import {fetchMyCreatedJobs} from "../services/apiService";

export const useMyCreatedJobs = () => {
    const [jobs, setJobs] = useState ([]);
    // const [jobsLength, setJobsLength] = useState(0);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const jobsData = await fetchMyCreatedJobs();
            setJobs(jobsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Хук useEffect вызывается при монтировании компонента для начальной загрузки данных
    useEffect(() => {
        getData();
    }, []);

    // Функция для обновления данных (перезагрузки списка)
    const refreshOrder = () => {
        setLoading(true); // Чтобы отобразить индикатор загрузки при обновлении
        getData(); // Повторный вызов функции для получения данных
    };

    return {jobs, loading, refreshOrder};
}