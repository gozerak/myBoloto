import { useState } from "react"
import "../css/DeleteCard.css"
import Modal from "./Modal";

export default function DeleteCard ({cardJob_id}) {
    const [isModalOpen, setModalOpen] = useState (false);
    
    const handleDeleteCard = async () => {
        try{ 
            const response = await fetch (`http://10.14.113.150:8010/jobs/remove_job?job_id=${cardJob_id}`, {method: "DELETE"});
            if (response.ok) {
                console.log("Запись успешно удалена");
                setModalOpen(false);
                //мб еще что то, например рефреш страницы
            } else {
                console.error("Ошибка удаления записи")
            }
        } catch (error) {
            console.error ("Error:", error)
        }
    };
    return (
        <>
        <button className="delete-card-btn" onClick={() => setModalOpen(true)}>Удалить</button>
        <Modal isOpen={isModalOpen} onClose={() =>setModalOpen(false)}>
            <p>Вы действительно хотите удалить запись?</p>
            <div className="delete-buttons">
            <button type='button' className='delete-btn-back' onClick={() => setModalOpen(false)}>Отмена</button>
            <button type='submit' className='delete-btn-submit' onClick={() => handleDeleteCard()}>Подтвердить</button>
            </div>
        </Modal>
        </>
    )
}