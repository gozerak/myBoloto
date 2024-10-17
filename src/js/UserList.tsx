import { useEffect, useState } from "react";
import { fetchAllWorkers } from "../services/apiService"
import UserListCard from "./UserListCard";
import "../css/UserList.css"

export default function UserList () {
    const [allWorkers, setAllWorkers] = useState ([])

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const workers = await fetchAllWorkers();
                setAllWorkers(workers);
            } catch (error) {
                console.error("Error fetching workers: ", error);
                setAllWorkers([]);
            }
        };
        fetchWorkers();
    }, []);
    
    return (
        <div className="user-list">
        {allWorkers.length > 0 ? (
            allWorkers.map(worker => <UserListCard key={worker.id} userData={worker} />)
        ) : (
            <p>No workers found</p>
        )}
        </div>
    )
}