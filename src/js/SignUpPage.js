import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { API_BASE_URL } from "../services/apiService";
import "../css/SignUpPage.css"

export default function SignUpPage () {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState(false);
    const [formData, setFormData] = useState ({
        login: "",
        email: "",
        hashed_password: "",
        user_data: {
            surname: "",
            name: "",
            patronymic: "",
            date_of_birth: "",
            phone_number: "",
            citizenship: "",
            city: "",
            passport_data: "",
            snils: "",
            medical_book: false,
            is_self_employed: false,
            work_experience: "",
            activity_type: "",
            contraindications: "",
            about: "",
            education: "",
            driver_license: "",
            languages: ""
        }
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleChangeUserData = (e) => {
        setFormData({
            ...formData,
            user_data: {...formData.user_data, [e.target.name]: e.target.value}})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(false);
        setFormError(false);

        // Проверка паролей
        if (formData.hashed_password !== confirmPassword) {
            setPasswordError(true);
            return;
        }

        // Проверка заполненности всех обязательных полей
        if (!validateForm()) {
            setFormError(true);
            return;
        }
        const response = await fetch(`${API_BASE_URL}/user_manager/register_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        console.log(JSON.stringify(formData))
        if (response.ok) {
            console.log("Успешная регистрация", response.status)
            alert("Вы успешно зарегистрировались!")
            navigate("/");
        }
    }

    const validateForm = () => {
        const { surname, name, date_of_birth, phone_number, citizenship, city, snils } = formData.user_data;
        const { login, email, hashed_password } = formData;

        // Проверка обязательных полей
        if (
            !surname || !name || !date_of_birth || !phone_number || !citizenship || !city || 
            !login || !email || !hashed_password || !snils
        ) {
            return false; // Если что-то из обязательных полей пустое, возвращаем false
        }
        return true;
    };



    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                    <p className="registration-headers">Основная информация</p>
                 <div className="registration-forms">
                    <div className="registration-elem">
                    <label className="registration-label">
                        Фамилия
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="surname"
                        value={formData.user_data.surname}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Имя
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="name"
                        value={formData.user_data.name}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Отчество
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="patronymic"
                        value={formData.user_data.patronymic}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Дата рождения
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="date"
                        name="date_of_birth"
                        value={formData.user_data.date_of_birth}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Номер телефона
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="number"
                        name="phone_number"
                        value={formData.user_data.phone_number}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Гражданство
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="citizenship"
                        value={formData.user_data.citizenship}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Город
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="city"
                        value={formData.user_data.city}
                        onChange={handleChangeUserData}
                        required />
                    </div>
                    <button className="registration-cont-back-btn" onClick={() => setStep(2)}>Далее</button>
                    </div> 
                    </>
                )
            case 2:
                return (
                    <>
                    <p className="registration-headers">Дополнительная информация</p>
                    <div className="registration-forms">
                        <div className="registration-elem">
                    <label className="registration-label">
                        Серия и номер паспорта
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="passport_data"
                        value={formData.user_data.passport_data}
                        onChange={(e) => {
                            if (e.target.value.length <= 10) {
                              handleChangeUserData(e); // разрешаем ввод до 10 символов
                            }
                          }}
                          onBlur={(e) => {
                            if (formData.user_data.passport_data.length !== 10) {
                              setFormData({
                                ...formData,
                                user_data: { ...formData.user_data, passport_data: "" } // сбрасываем, если длина не 10
                              });
                            }
                          }}
                          required
                        />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        СНИЛС
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="snils"
                        value={formData.user_data.snils}
                        onChange={(e) => {
                            if (e.target.value.length <= 11) {
                              handleChangeUserData(e); // разрешаем ввод до 10 символов
                            }
                          }}
                          onBlur={(e) => {
                            if (formData.user_data.snils.length !== 11) {
                              setFormData({
                                ...formData,
                                user_data: { ...formData.user_data, snils: "" } // сбрасываем, если длина не 10
                              });
                            }
                          }}
                          required
                        />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Медицинская книжка
                        </label>
                        <input
                        className="registration-checkbox"
                        type="checkbox"
                        name="medical_book"
                        value={formData.user_data.medical_book}
                        onChange={handleChangeUserData} />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Самозанятый
                        </label>
                        <input
                        className="registration-checkbox"
                        type="checkbox"
                        name="is_self_employed"
                        value={formData.user_data.is_self_employed}
                        onChange={handleChangeUserData}/>
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Опыт работы
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="work_experience"
                        value={formData.user_data.work_experience}
                        onChange={handleChangeUserData} />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Навыки
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="activity_type"
                        value={formData.user_data.activity_type}
                        onChange={handleChangeUserData} />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Противопоказания
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="contraindications"
                        value={formData.user_data.contraindications}
                        onChange={handleChangeUserData}/>
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Обо мне
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="about"
                        value={formData.user_data.about}
                        onChange={handleChangeUserData}/>
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Образование
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="education"
                        value={formData.user_data.education}
                        onChange={handleChangeUserData}/>
                    </div>   
                    <div className="registration-elem">
                    <label className="registration-label">
                        Водительское удостоверение
                        </label>
                        <input
                        className="registration-input"
                        type="number"
                        name="driver_license"
                        value={formData.user_data.driver_license}
                        onChange={handleChangeUserData}/>
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Знание языков
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="languages"
                        value={formData.user_data.languages}
                        onChange={handleChangeUserData}/>
                    </div>
                    <div className="registration-buttons">
                    <button className="registration-cont-back-btn" onClick={() => setStep(1)}>Назад</button>
                    <button className="registration-cont-back-btn" onClick={() => setStep(3)}>Далее</button>
                    </div>
                    </div>
                    </>
                )
            case 3: 
            return(
                <div className="registration-forms">
                    <div className="registration-elem">
                   <label className="registration-label">
                        Имя пользователя
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="login"
                        value={formData.user_data.login}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        e-mail
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="text"
                        name="email"
                        value={formData.user_data.email}
                        onChange={handleChange}
                        onBlur={(e) => {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // простая регулярка для email
                            if (!emailPattern.test(e.target.value)) {
                                setFormData({
                                    ...formData,
                                    user_data: { ...formData.user_data, email: "" }
                                }); // сбрасываем, если формат неверный
                              alert("Введите корректный email");
                            }
                          }}
                          required
                        />
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Пароль
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="password"
                        name="hashed_password"
                        value={formData.user_data.hashed_password}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="registration-elem">
                    <label className="registration-label">
                        Повторите пароль
                        <span className="required">*</span>
                        </label>
                        <input
                        className="registration-input"
                        type="password"
                        name="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                    </div> 
                    {passwordError && (
                        <p style={{ color: "red" }}>Пароли не совпадают!</p>
                    )}
                    {formError && (
                            <p style={{ color: "red" }}>Необходимо заполнить все обязательные поля!</p>
                        )}
                    <div className="registration-buttons">
                    <button className="registration-cont-back-btn" onClick={() => setStep(2)}>Назад</button>
                    <button className="registration-register-btn" onClick={handleSubmit}>Зарегистрироваться</button>
                </div>
                </div>
            )
            default:
                return null;    
        }
    };

    return (
        <div className="sign-up-page">
            <Header />
            <form>{renderStep()}</form>
        </div>
    )
}