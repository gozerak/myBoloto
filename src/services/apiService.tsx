import axios from "axios";

export const API_BASE_URL = "http://localhost:8000";

interface Job  {
    id:string;
    status_value: string;
    type_value: string;
    title:string;
    price: number;
    description: string;
    started_at: string;
    finished_at: string;
    action_type_id: string;
    city_id: string;
    job_location: string;
    is_active: boolean;
    owner_id: string;
    organization_id: string;
}

export const fetchJobs = async (isAuthorized: boolean): Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs/get_jobs?skip=0&limit=10`, {
        credentials: isAuthorized? 'include': 'omit'
    });
    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }
    const data: Job[] = await response.json();
    return data;
}

interface ActionType {
    title: string;
    id: string;
}

export const fetchActionTypes = async (): Promise<ActionType[]> => {
    try {
        const response = await axios.get<ActionType[]> (`${API_BASE_URL}/action_type/get_all`)
        return response.data;
    } catch (error) {
        console.error ('Error fetching action types:', error);
        throw error;
    }
}

interface Place {
    title: string;
    id: string;  
}

export const fetchPlaces = async (): Promise<Place[]> => {
    try {
        const response = await axios.get<Place[]> (`${API_BASE_URL}/place/get_all`)
        return response.data;
    } catch (error) {
        console.error ('Error fetching places:', error);
        throw error;
    }
}

interface Organization {
    id: string;
    title: string;
}

export const fetchOrganizations = async (): Promise<Organization[]> => {
    try {
        const response = await axios.get<Organization[]> (`${API_BASE_URL}/organization/get_all`)
        return response.data;
    } catch (error) {
        console.error ('Error fetching organizations: ', error);
        throw error;
    }
}

interface UserBalance {
    balance: number;
}

export const fetchUserBalance = async (): Promise<UserBalance> => {
    let authToken: string | undefined;
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
            }
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
    const data: UserBalance = await response.json();
    return data;
}

interface RespondedUser {
    id: string | null;
    full_name: string;
}

interface DetailedJob extends Job {
    organization:Organization;
    action_type: ActionType;
    city: Place;
}

interface MyCreatedJobs {
    job: DetailedJob;
    responded_user: RespondedUser;
}

type MyCreatedJobsArray = MyCreatedJobs[];

export const fetchMyCreatedJobs = async (): Promise<MyCreatedJobsArray> => {
    let authToken: string | undefined;
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
            }
        }
    const response = await fetch(`${API_BASE_URL}/user_manager/get_created_jobs`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch my created jobs");
    }
    const data: MyCreatedJobsArray = await response.json();
    return data;
}

interface UserData {
    
}

export const fetchUserData = async (userId: string) => {
        const response = await fetch(`${API_BASE_URL}/user_manager/get_user_by_id?user_id=${userId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed to user data");
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

export const fetchAllWorkers = async () => {
    const response = await fetch(`${API_BASE_URL}/user_manager/get_all`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch all workers");
    }
    const data = await response.json();
    return data;

}