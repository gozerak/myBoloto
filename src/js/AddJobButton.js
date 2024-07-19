import '../css/AddJobButton.css'

import React, { useState } from "react";
import Modal from "./Modal";
import "../css/AddJobButton.css";
import { useJobs } from "../hooks/useJobs";

export default function AddJobButton() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
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
    const[isChecked,setIsChecked] = useState(false)

    const { actionTypes } = useJobs();
    const { places } = useJobs();
    const { organizations } = useJobs();

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
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
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Job added successfully");
                setModalOpen(false);
            } else {
                console.error("Failed to add job");
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
            setFormData({
                ...formData,
                finished_at: ''
            })
        }
    }

    return (
        <>
            <button className="add-job-btn" onClick={() => setModalOpen(true)}>
                Добавить заказ
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit} className="add-job-form">
                    <div>
                        <label>
                            Заголовок: 
                            <input
                                autoComplete="off"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Описание: 
                            <input
                                autoComplete="off"  
                                type="text"
                                name="description"
                                value={formData.description}
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
                                value={formData.started_at}
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
                                    value={formData.finished_at}
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
                                                value={formData.action_type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" hidden>Select Action Type</option>
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
                                value={formData.price}
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
                                                value={formData.location}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" hidden>Select Action Type</option>
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
                                value={formData.job_address}
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
                                                value={formData.organization_id}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" hidden>Select Action Type</option>
                                                {Object.entries(organizations).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div></div>
                    <div className="modal-buttons">
                        <button type="button" className='modal-btn-back' onClick={() => setModalOpen(false)}>Back</button>
                        <button type="submit" className='modal-btn-submit'>Submit</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
