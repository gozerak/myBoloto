import { useEffect, useState } from "react";
import "../css/EditCard.css"
import { useJobs } from "../hooks/useJobs";
import Modal from "./Modal";

export default function EditCard({order}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cardData, setCardData] = useState ({
        id: "",
        title: "",
        price: "",
        description: "",
        started_at: "",
        finished_at: "",
        action_type: "",
        location: "",
        is_active: true,
        job_address: "",
        organization_id: "",
    });
    const[isChecked,setIsChecked] = useState(false);

    useEffect(() => {
        if (order) {
            const formatDate = (dateString) => {
                if (!dateString) return "";
                return new Date(dateString).toISOString().split('T')[0];
            };

            setCardData({
                id: order.id,
                title: order.title,
                price: order.price,
                description: order.description,
                started_at: formatDate(order.started_at),
                finished_at: formatDate(order.finished_at),
                action_type: order.action_type,
                location: order.location,
                is_active: order.is_active,
                job_address: order.job_address,
                organization_id: order.organization_id,
            });
            if (!order.finished_at) {
                setIsChecked(true);
            }
        }
    }, [order]);

    const { actionTypes, places, organizations } = useJobs();

    const handleChange = (e) => {
        const { name, value} = e.target;
        setCardData({
            ...cardData,
            [name]:  value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://10.14.113.150:8010/jobs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cardData),
            });
            if (response.ok) {
                console.log("Job edited successfully");
                setModalOpen(false);
            } else {
                console.error("Failed to edit job");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleIsChecked = async (e) => {
        setIsChecked(e.target.checked)
        clearFinishedAtValue(e.target.checked)
    }

    function clearFinishedAtValue(isChecked) {
        if (isChecked) {
            setCardData({
                ...cardData,
                finished_at: ''
            })
        }
    }
    return(
        <>
        <button className="edit-card-btn" onClick={() => setModalOpen(true)}>Редактировать</button>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit} className="add-job-form">
                    <div>
                        <label>
                            Заголовок: 
                            <input
                                autoComplete="off"
                                type="text"
                                name="title"
                                value={cardData.title}
                                onChange={handleChange}
                                required
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Описание: 
                            <textarea
                                autoComplete="off"  
                                type="text"
                                name="description"
                                value={cardData.description}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <div>
                        <label>
                            Дата начала:
                            <input
                                type="date"
                                name="started_at"
                                value={cardData.started_at}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        </div>
                        <div>
                        {!isChecked && (
                            <label>
                                Дата окончания:
                                <input
                                    type="date"
                                    name="finished_at"
                                    value={cardData.finished_at}
                                    onChange={handleChange}
                                    required
                                    />
                            </label>
                        )}
                        </div>
                        <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isOneDay"
                                checked={isChecked}
                                onChange={handleIsChecked}
                            />
                            Один день
                        </label>
                        </div>
                    </div>
                                    <div>
                                        <label>
                                            Вид деятельности:
                                            <select
                                                name="action_type"
                                                value={cardData.action_type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value={cardData.action_type} hidden>{order.actionTypeName}</option>
                                                {Object.entries(actionTypes).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                        <label>
                            Стоимость заказа: 
                            <input
                                autoComplete="off"
                                type="number"
                                name="price"
                                value={cardData.price}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                                        <label>
                                            Город:
                                            <select
                                                name="location"
                                                value={cardData.location}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value={cardData.location}>{order.place}</option>
                                                {Object.entries(places).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                        <label>
                            Адрес: 
                            <input
                                autoComplete="off"
                                type="text"
                                name="job_address"
                                value={cardData.job_address}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                                        <label>
                                            Организация:
                                            <select
                                                name="organization_id"
                                                value={cardData.organization_id}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value={cardData.organization_id}>{order.organization}</option>
                                                {Object.entries(organizations).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div></div>
                    <div className="edit-buttons">
                        <button type="button" className='edit-btn-back' onClick={() => setModalOpen(false)}>Отменить</button>
                        <button type="submit" className='edit-btn-submit'>Подтвердить</button>
                    </div>
                </form>
            </Modal>
        </>
   
    )
}