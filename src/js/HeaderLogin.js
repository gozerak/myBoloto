import { useState } from 'react';
import '../css/HeaderLogin.css'
import Modal from './Modal'

export default function HeaderLogin () {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loginData, setLoginData] = useState ( {
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setLoginData ({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://10.14.113.150:8010/login/getaccess", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok) {
                console.log("Доступ получен");
                setModalOpen(false);
                //Логика получения кукиса
            } else {
                console.error ('Доступ не получен')
            }
        } catch (error) {
            console.error ("Error:", error);
        }
    };

    return (
        <>
        <button className="login" onClick={() => setModalOpen(true)}>Войти</button>
        <Modal isOpen={isModalOpen} onClose={()=> setModalOpen(false)} >
            <form onSubmit={handleSubmit} className='add-login-form'>
                <div>
                    <label>
                        Логин
                        <div>
                            <input
                                type="text"
                                name="login"
                                value={loginData.login}
                                onChange={handleChange}
                                required
                                />
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        Пароль
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                                />
                        </div>
                    </label>
                </div>
                <div className='login-buttons'>
                    <button type='button' className='login-btn-back' onClick={() => setModalOpen(false)}>Back</button>
                    <button type='submit' className='login-btn-submit'>Login</button>
                </div>
            </form>
            </Modal>
        </>
    );
}