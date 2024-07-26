import '../css/AddJobButton.css'

import React, { useState } from "react";
import Modal from "./Modal";
import "../css/AddJobButton.css";
import { useJobs } from "../hooks/useJobs";
import { API_BASE_URL } from '../services/apiService';

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
        owner_id: "7a88bbab-d86d-4ffa-912d-a07f2830bd0c",
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
        console.log(JSON.stringify(formData))
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
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
                    <div className='modal-forms'>
                        <p className='modal-headers'>
                            Заголовок 
                            </p>
                            <input
                            className='modal-inputs'
                                autoComplete="off"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div className='modal-forms'>
                        <p className='modal-headers'>
                            Описание
                            </p>
                            <input
                            className='modal-inputs'
                                autoComplete="off"  
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div>
                        <div className='modal-forms'>
                        <p className='modal-headers'>
                            Дата начала
                            </p>
                            <input
                            className='modal-data'
                                type="date"
                                name="started_at"
                                value={formData.started_at}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='modal-forms'>
                        {!isChecked && (
                            <>
                            <p className='modal-headers'>
                                Дата окончания
                                </p>
                                <input
                                className='modal-data'
                                    type="date"
                                    name="finished_at"
                                    value={formData.finished_at}
                                    onChange={handleChange}
                                    required
                                    />
                                    </>
                        )}
                        </div>
                        <div>
                        <p className='modal-headers'>
                            Один день
                                </p>
                            <input
                                type="checkbox"
                                name="isOneDay"
                                checked={isChecked}
                                onChange={handleIsChecked}
                                />
                        </div>
                    </div>
                                    <div className='modal-forms'>
                                        <p className='modal-headers'>
                                            Вид деятельности
                                            </p>
                                            <select
                                            className='dropdown-select'
                                                name="action_type"
                                                value={formData.action_type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" hidden></option>
                                                {Object.entries(actionTypes).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
                                    </div>
                                    <div className='modal-forms'>
                        <p className='modal-headers'>
                            Стоимость заказа 
                            </p>
                            <input
                            className='modal-inputs'
                                autoComplete="off"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div className='modal-forms'>
                                        <p className='modal-headers'>
                                            Город
                                            </p>
                                            <select
                                            className='dropdown-select'
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" hidden></option>
                                                {Object.entries(places).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
                                    </div>
                                    <div className='modal-forms'>
                        <p className='modal-headers'>
                            Адрес 
                            </p>
                            <input
                            className='modal-inputs'
                                autoComplete="off"
                                type="text"
                                name="job_address"
                                value={formData.job_address}
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div className='modal-forms'>
                                        <p className='modal-headers'>
                                            Организация
                                            </p>
                                            <select
                                            className='dropdown-select'
                                                name="organization_id"
                                                value={formData.organization_id}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" hidden></option>
                                                {Object.entries(organizations).map(([id, name]) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ))}
                                            </select>
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
