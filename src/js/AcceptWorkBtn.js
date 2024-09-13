import { API_BASE_URL } from "../services/apiService"

export default function AcceptWorkBtn(userId, jobId) {
    const handleClick = async () => {
        await (`${API_BASE_URL}/jobs/accept_and_close_job?user_id=${userId}&job_id=${jobId}`)
        .then(response => console.log(response))
        .catch("Ошибка подтверждения выполнения работы!")
    }

}