import '../css/AddJobButton.css'

import React, { useState } from "react";
import Modal from "./Modal";
import "../css/AddJobButton.css";
import { useFetchOnFocus } from '../hooks/useFetchOnFocus';
import { API_BASE_URL } from '../services/apiService';
import { fetchActionTypes, fetchPlaces, fetchOrganizations } from '../services/apiService';

export default function AddJobButton() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        started_at: "",
        finished_at: "",
        action_type_id: "",
        city_id: "",
        is_active: true,
        job_location: "",
        organization_id: "",
        owner_id: "7a88bbab-d86d-4ffa-912d-a07f2830bd0c",
        status_value: "Черновик",
        type_value: "Почасовая оплата",
    });
    const[isChecked,setIsChecked] = useState(false)

    const [actionTypes, handleActionTypeFocus] = useFetchOnFocus(fetchActionTypes);
    const [places, handlePlaceFocus] = useFetchOnFocus(fetchPlaces);
    const [organizations, handleOrganizationFocus] = useFetchOnFocus(fetchOrganizations);

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
                                                name="action_type_id"
                                                value={formData.action_type_id}
                                                onChange={handleChange}
                                                onFocus={handleActionTypeFocus}
                                                required
                                            >
                                                <option value="" hidden></option>
                                                {actionTypes.map((actionType) => (
                                                    <option key={actionType.id} value={actionType.id}>{actionType.title}</option>
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
                                                name="city_id"
                                                value={formData.city_id}
                                                onChange={handleChange}
                                                onFocus={handlePlaceFocus}
                                                required
                                            >
                                                <option value="" hidden></option>
                                                {places.map((place) => (
                                                    <option key={place.id} value={place.id}>{place.title}</option>
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
                                name="job_location"
                                value={formData.job_location}
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
                                                onFocus={handleOrganizationFocus}
                                                required
                                            >
                                                <option value="" hidden></option>
                                                {organizations.map((organization) => (
                                                    <option key={organization.id} value={organization.id}>{organization.title}</option>
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
