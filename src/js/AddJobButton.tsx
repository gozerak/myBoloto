import '../css/AddJobButton.css'

import React, { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import "../css/AddJobButton.css";
import { useFetchOnFocus } from '../hooks/useFetchOnFocus';
import { API_BASE_URL, Place } from '../services/apiService';
import { fetchActionTypes, fetchPlaces, fetchOrganizations } from '../services/apiService';
import TemporaryNotifier from './TemporaryNotifier';

function AddJobInput({title, type, name, value, onChange}:{
    title: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return(
        <div className='modal-forms'>
            <p className='modal-headers'>
                {title}
            </p>
            <input
            className='modal-inputs'
            autoComplete='off'
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            />
        </div>
    )
}

function AddJobSelect({title, name, value, onChange, onFocus, items}: {
    title: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onFocus: () => void;
    items: Place[];
}) {
    return (
        <div className='modal-forms'>
            <p className='modal-headers'>
                {title}
            </p>
            <select
                className='dropdown-select'
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                required
            >
                <option value="" hidden></option>
                {items.map((item: Place) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                ))}
            </select>
        </div>
    )
}

export default function AddJobButton({ refreshOrder }: {
    refreshOrder: () => void;
}) {
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
        // owner_id: "",
        status_value: "Черновик",
        type_value: "Почасовая оплата",
    });
    const[isChecked,setIsChecked] = useState(false)
    const [actionTypes, handleActionTypeFocus] = useFetchOnFocus(fetchActionTypes);
    const [places, handlePlaceFocus] = useFetchOnFocus(fetchPlaces);
    const [organizations, handleOrganizationFocus] = useFetchOnFocus(fetchOrganizations);
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]:  value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!localStorage.getItem('userId')){
            alert("Необходимо залогиниться!")
        }
        else {
                const userID = localStorage.getItem('userId');
                const updatedFormData = {
                    ...formData,
                    owner_id: userID // добавляем поле owner_id
                };
        console.log(JSON.stringify(updatedFormData))
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(updatedFormData),
            });
            if (response.ok) {
                console.log("Job added successfully");
                setModalOpen(false);
                refreshOrder();
                setNotifierStatus('success')
                setNotifierText('Вы успешно создали работу!')
                setShowNotifier(true)
                setTimeout(() => {
                    setShowNotifier(false);
                }, 5000)
            } else {
                console.error("Failed to add job");
            }
        } catch (error) {
            console.error("Error:", error);
            setNotifierStatus('error')
            setNotifierText('При создании работы возникла ошибка')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
        }
    }};

    const handleIsChecked = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
        clearFinishedAtValue(e.target.checked)
    }

    function clearFinishedAtValue(isChecked: boolean) {
        if (isChecked) {
            setFormData({
                ...formData,
                finished_at: formData.started_at
            })
        }
    }

    return (
        <>
            {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
            <button className="add-job-btn" onClick={() => setModalOpen(true)}>
                Добавить заказ
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit} className="add-job-form">
                    <AddJobInput
                    title='Заголовок'
                    type= "text"
                    name= "title"
                    value={formData.title}
                    onChange={handleChange} />
                    
                    <AddJobInput
                    title="Описание"
                    type="text"
                    name= "description"
                    value={formData.description}
                    onChange={handleChange} />

                    <AddJobInput
                    title='Дата начала'
                    type= "date"
                    name= "started_at"
                    value={formData.started_at}
                    onChange={handleChange} />

                    {!isChecked && (
                    <AddJobInput
                    title='Дата окончания'
                    type='date'
                    name='finished_at'
                    value={formData.finished_at}
                    onChange={handleChange} />
                        )}
                        
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
                    <AddJobSelect
                    title='Вид деятельности'
                    name='action_type_id'
                    value={formData.action_type_id}
                    onChange={handleChange}
                    onFocus={handleActionTypeFocus}
                    items={actionTypes} />
                    
                    <div className='modal-forms'>
                        <p className='modal-headers'>
                            Стоимость заказа 
                        </p>
                        <div className='modal-cost'>
                        <input
                        className='modal-input-cost'
                            autoComplete="off"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            onWheel={(e) => (e.target as HTMLTextAreaElement).blur()}
                            required
                        />
                        <p className='modal-input-cost-title'>₽/час</p>
                        </div>
                    </div>

                    <AddJobSelect
                    title='Город'
                    name="city_id"
                    value={formData.city_id}
                    onChange={handleChange}
                    onFocus={handlePlaceFocus}
                    items={places} />

                    <AddJobInput
                    title='Адрес'
                    type='text'
                    name='job_location'
                    value={formData.job_location}
                    onChange={handleChange} />

                    <AddJobSelect
                    title='Организация'
                    name='organization_id'
                    value={formData.organization_id}
                    onChange={handleChange}
                    onFocus={handleOrganizationFocus}
                    items={organizations} />
  
                    <div className="modal-buttons">
                        <button type="button" className='modal-btn-back' onClick={() => setModalOpen(false)}>Назад</button>
                        <button type="submit" className='modal-btn-submit'>Добавить</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
