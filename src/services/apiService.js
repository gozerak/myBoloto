import axios from "axios";

export const API_BASE_URL = "http://localhost:8000";

export const fetchJobs = async (isAuthorized) => {
    const response = await fetch(`${API_BASE_URL}/jobs/get_jobs?skip=0&limit=10`, {
        credentials: isAuthorized? 'include': 'omit'
    });
    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }
    const data = await response.json();
    return data;
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

export const fetchUserBalance = async () => {
    let authToken
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
            }
    const response = await fetch(`${API_BASE_URL}/user_manager/get_balance`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user balance");
    }
    const data = await response.json();
    return data;
}}

export const fetchMyCreatedJobs = async () => {
    let authToken
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
            }
    const response = await fetch(`${API_BASE_URL}/user_manager/get_created_jobs`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }
    const data = await response.json();
    return data;
}
}

export const fetchUserData = async (userId) => {
        const response = await fetch(`${API_BASE_URL}/user_manager/get_user_by_id?user_id=${userId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        return data;

}

export const fetchNotifications = async () => {
    let authToken
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
            }
    const response = await fetch(`${API_BASE_URL}/notif/user_unread_notif`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }
    const data = await response.json();
    return data;
}
}