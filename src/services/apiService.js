import axios from "axios";

export const API_BASE_URL = "http://10.14.113.150:8010";

export const fetchJobs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/get_jobs?skip=0&limit=10`)
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}

export const fetchActionTypes = async () => {
    try {
        const response = await axios.get (`${API_BASE_URL}/action_type/get_all`)
        return response.data;
    } catch (error) {
        console.error ('Error fetching action types:', error);
        throw error;
    }
}

export const fetchPlaces = async () => {
    try {
        const response = await axios.get (`${API_BASE_URL}/place/get_all`)
        return response.data;
    } catch (error) {
        console.error ('Error fetching places:', error);
        throw error;
    }
}

export const fetchOrganizations = async () => {
    try {
        const response = await axios.get (`${API_BASE_URL}/organization/get_all`)
        return response.data;
    } catch (error) {
        console.error ('Error fetching organizations: ', error);
        throw error;
    }
}