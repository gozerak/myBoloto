import { useState } from 'react';
import { useContext } from 'react';
import '../css/HeaderLogin.css';
import Modal from './Modal';
import { UserContext } from './UserContext';

export default function HeaderLogin () {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loginData, setLoginData] = useState ( {
        username: '',
        password: '',
    });
    const { setUserData } = useContext(UserContext);

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
            const response = await fetch("http://10.14.113.150:8010/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok) {
                const authData = await response.json()
                const accessToken = authData.access_token;
                const userId = authData.user
                //запись userId в storage
                localStorage.setItem('userId', userId);
                //запись токена в куки
                document.cookie = `accessToken=${accessToken}`;
                console.log("Доступ получен");

                try{
                    const response = await fetch(`http://10.14.113.150:8010/user_manager/get_user_by_id?user_id=${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json()
                        setUserData(userData);
                        console.log('Данные пользователя успешно загружены')
                    }
                } catch (error) {
                    console.log ("Error:", error)
                }


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
                                name="username"
                                autoComplete='off'
                                value={loginData.username}
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
                                autoComplete='off'
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