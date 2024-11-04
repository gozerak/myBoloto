import axios from "axios";
import Notifications from '../js/Notifications';

export const API_BASE_URL = "http://localhost:8000";

export interface JobDetails  {
    id:string;
    price: number;
    title:string;
    description?: string;
    created_at: string;
    started_at: string;
    finished_at: string;
    job_location: string;
    is_active: boolean;
    owner_id: string;
    type_value: string;
    status_value: string;
    action_type: ActionType;
    city: Place;
    organization: Organization;
    status?: string;
}

export interface Job {
    job: JobDetails;
    responded_user?: RespondedUser;
    status?: string;
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

export interface Place {
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

export interface Organization {
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


export const fetchUserBalance = async (): Promise<number> => {
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
    const data: number = await response.json();
    return data;
}

export interface RespondedUser {
    id: string | null;
    full_name: string;
}


export const fetchMyCreatedJobs = async (): Promise<Job[]> => {
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
    const data: Job[] = await response.json();
    return data;
}

export interface UserData {
    is_active: boolean;
    full_name: string | null;
    id: string;
    login: string;
    email: string;
    hashed_password: string;
    user_data?: WorkerData | null;
    manager_data?: ManagerData | null;
    user_rating?: number | null;
}

interface WorkerData {
    citizenship?: string;
    contraindications?: string | null;
    city?: string | null;
    about?: string | null;
    name: string;
    passport_data: string;
    education?: string | null;
    surname: string;
    snils: string;
    driver_license?: string | null;
    user_id: string;
    patronymic?: string | null;
    medical_book: boolean;
    languages?: string | null;
    date_of_birth: string | null;
    is_self_employed: boolean;
    id: string;
    phone_number?: string | null;
    work_experience?: string | null;
    activity_type?: string | null;
}

interface ManagerData {
    surname: string | null;
    id: string;
    patronymic?: string | null;
    work_phone?: string | null;
    name: string | null;
    job_title?: string | null;
    organization: string | null;
    user_id: string | null;
}

export const fetchUserData = async (userId: string): Promise<UserData> => {
        const response = await fetch(`${API_BASE_URL}/user_manager/get_user_by_id?user_id=${userId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed to user data");
        }
        const data: UserData = await response.json();
        return data;

}

interface Notification {
    notification_data: string;
    created_at: string;
    is_read: boolean;
    id: string;
    user_id: string
}

export type NotificationArray = Notification[];

export const fetchNotifications = async (): Promise<NotificationArray> => {
    let authToken: string | undefined;
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
                throw new Error('Authentication error: no access token found');
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
    const data: NotificationArray = await response.json();
    return data;
}
else {
    console.error('Пользователь не авторизован');
    throw new Error('User is not authenticated');
  }
}

export type UserDataArray = UserData[];

export const fetchAllWorkers = async (): Promise<UserDataArray> => {
    const response = await fetch(`${API_BASE_URL}/user_manager/get_all`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch all workers");
    }
    const data: UserDataArray = await response.json();
    return data;

}

export const fetchUserRespondedJobs = async (authToken: string):
Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/user_manager/get_user_assigned_jobs`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user responded jobs!");
    }
    const data: Job[] = await response.json();
    return data;
}

export const fetchRespondedUsers = async(id: string): Promise<UserData[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs/get_job_relationship?job_id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch responded users!");
    }
      const data: UserData[] = await response.json();
      return data;
}