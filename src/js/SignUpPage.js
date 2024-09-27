import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { API_BASE_URL } from "../services/apiService";
import "../css/SignUpPage.css"
import InputMask from 'react-input-mask';
import TemporaryNotifier from "./TemporaryNotifier";

function LabeledInput({title, required = false, type = 'text', name, value, onChange, onBlur }) {
    return(
       <div className="registration-elem">
        <label className="registration-label">{title}
            {required && <span className="required">*</span>}
        </label>
        <input
        className={type!=="checkbox"?"registration-input": "registration-checkbox"}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required} />
       </div> 
    )
}

export default function SignUpPage() {
    const [isUserSignUpPage, setIsUserSignUpPage] = useState(true)

    const handleClick = (bool) => {
        if (isUserSignUpPage === bool) return
        setIsUserSignUpPage(bool)
    }

    return (
        <div className="sign-up-page">
            <Header />
            <div className="user-or-manager-sign-up">
                <div className="user-sign-up" onClick={() => handleClick(true)}>Регистрация пользователя</div>
                <div className="manager-sign-up" onClick={() => handleClick(false)}>Регистрация менеджера</div>
            </div>
        {isUserSignUpPage? <SignUpUser />: <SignUpManager />}
        </div>
    )
}

function SignUpManager () {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState(false);
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')
    const [formData, setFormData] = useState ({
        login: "",
        email: "",
        hashed_password: "",
        full_name: "",
        manager_data: {
            name: "",
            surname: "",
            patronymic: "",
            job_title: "",
            work_phone: "",
            organization: ""
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(false);
        setFormError(false);

        console.log(formData)
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

        const updatedFormData = {
            ...formData,
            full_name: `${formData.manager_data.surname.trim()} ${formData.manager_data.name.trim()} ${formData.manager_data.patronymic.trim()}`
        };

        const response = await fetch(`${API_BASE_URL}/user_manager/register_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFormData)
        });
        console.log(JSON.stringify(updatedFormData))
        if (response.ok) {
            console.log("Успешная регистрация", response.status)
            setNotifierStatus('success')
            setNotifierText('Вы успешно зарегистрировались!')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
            navigate("/");
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleChangeManagerData = (e) => {
        setFormData({
            ...formData,
            manager_data: {
                ...formData.manager_data,
                 [e.target.name]: e.target.value}})
    }

    const handleChangeManagerSpecialData = (e) => {
        setFormData({
            ...formData,
            manager_data: {
                ...formData.manager_data,
                 [e.target.name]: e.target.value.replace(/\D/g, ''),}})
    }

    const validateForm = () => {
        const { surname, name, job_title, work_phone, organization} = formData.manager_data;
        const { login, email, hashed_password } = formData;

        // Проверка обязательных полей
        if (
            !surname || !name || !job_title || !work_phone || !organization ||
            !login || !email || !hashed_password
        ) {
            return false; // Если что-то из обязательных полей пустое, возвращаем false
        }
        return true;
    };
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return(
                    <>
                    <p className="registration-headers">Основная информация</p>
                 <div className="registration-forms">
                    <LabeledInput
                    title="Фамилия"
                    name="surname"
                    type="text"
                    value={formData.manager_data.surname}
                    onChange={handleChangeManagerData}
                    required />

                    <LabeledInput
                    title="Имя"
                    name="name"
                    type="text"
                    value={formData.manager_data.name}
                    onChange={handleChangeManagerData}
                    required />
                    
                    <LabeledInput
                    title="Отчество"
                    name="patronymic"
                    type="text"
                    value={formData.manager_data.patronymic}
                    onChange={handleChangeManagerData}
                    required />
                    
                    <LabeledInput
                    title="Должность"
                    name="job_title"
                    type="text"
                    value={formData.manager_data.job_title}
                    onChange={handleChangeManagerData}
                    required />

                    <div className="registration-elem">
                    <label className="registration-label">
                        Номер телефона
                        <span className="required">*</span>
                        </label>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            maskChar="_"
                            className="registration-input"
                            type="text"
                            name="work_phone"
                            value={formData.manager_data.work_phone}
                            onChange={(e) => {
                                // Удаляем пробелы для корректной проверки длины
                                const valueWithoutSpaces = e.target.value.replace(/\D/g, '');
                                if (valueWithoutSpaces.length <= 11) {
                                    handleChangeManagerSpecialData(e);
                                }
                            }}
                            onBlur={(e) => {
                                const valueWithoutSpaces = formData.manager_data.work_phone.replace(/\D/g, '');
                                if (valueWithoutSpaces.length !== 11) {
                                    
                                    console.log(valueWithoutSpaces.length)
                                setFormData({
                                    ...formData,
                                    manager_data: { ...formData.manager_data, work_phone: '' },
                                });
                                }
                            }}
                            required
                            />
                    </div>
                    <button className="registration-cont-back-btn" onClick={() => setStep(2)}>Далее</button>
                    </div> 
                    </>
                )
            case 2: 
            return(
                <div className="registration-forms">
                    <LabeledInput
                    title="Имя пользователя"
                    name="login"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}
                    required
                    />
                    
                    <LabeledInput
                    title="e-mail"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={(e) => {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // простая регулярка для email
                        if (!emailPattern.test(e.target.value)) {
                            setFormData({
                                ...formData, email: "" }) // сбрасываем, если формат неверный
                          alert("Введите корректный email");
                        }
                      }}
                    required
                    />

                    <LabeledInput
                    title="Пароль"
                    name="hashed_password"
                    type="password"
                    value={formData.hashed_password}
                    onChange={handleChange}
                    required
                    />
                    
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
                    <button className="registration-cont-back-btn" onClick={() => setStep(1)}>Назад</button>
                    <button className="registration-register-btn" onClick={handleSubmit}>Зарегистрироваться</button>
                </div>
                </div>
            )
            default:
                return ""; 
        }
    }

    return (
        <div>
            {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
            <form>{renderStep()}</form>
            </div>
    )
}

function SignUpUser () {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState(false);
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')
    const [formData, setFormData] = useState ({
        login: "",
        email: "",
        hashed_password: "",
        full_name: "",
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
            user_data: {
                ...formData.user_data,
                 [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}})
    }

    const handleChangeUserSpecialData = (e) => {
        setFormData({
            ...formData,
            user_data: {
                ...formData.user_data,
                 [e.target.name]: e.target.value.replace(/\D/g, ''),}})
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

        const updatedFormData = {
            ...formData,
            full_name: `${formData.user_data.surname.trim()} ${formData.user_data.name.trim()} ${formData.user_data.patronymic.trim()}`
        };

        const response = await fetch(`${API_BASE_URL}/user_manager/register_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFormData)
        });
        console.log(JSON.stringify(updatedFormData))
        if (response.ok) {
            console.log("Успешная регистрация", response.status)
            setNotifierStatus('success')
            setNotifierText('Вы успешно зарегистрировались!')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
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
                    <LabeledInput
                    title="Фамилия"
                    name="surname"
                    type="text"
                    value={formData.user_data.surname}
                    onChange={handleChangeUserData}
                    required />

                    <LabeledInput
                    title="Имя"
                    name="name"
                    type="text"
                    value={formData.user_data.name}
                    onChange={handleChangeUserData}
                    required />
                    
                    <LabeledInput
                    title="Отчество"
                    name="patronymic"
                    type="text"
                    value={formData.user_data.patronymic}
                    onChange={handleChangeUserData}
                    required />
                    
                    <LabeledInput
                    title="Дата рождения"
                    name="date_of_birth"
                    type="date"
                    value={formData.user_data.date_of_birth}
                    onChange={handleChangeUserData}
                    required />

                    <div className="registration-elem">
                    <label className="registration-label">
                        Номер телефона
                        <span className="required">*</span>
                        </label>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            maskChar="_"
                            className="registration-input"
                            type="text"
                            name="phone_number"
                            value={formData.user_data.phone_number}
                            onChange={(e) => {
                                // Удаляем пробелы для корректной проверки длины
                                const valueWithoutSpaces = e.target.value.replace(/\D/g, '');
                                if (valueWithoutSpaces.length <= 11) {
                                    handleChangeUserSpecialData(e);
                                }
                            }}
                            onBlur={(e) => {
                                const valueWithoutSpaces = formData.user_data.phone_number.replace(/\D/g, '');
                                if (valueWithoutSpaces.length !== 11) {
                                    
                                    console.log(valueWithoutSpaces.length)
                                setFormData({
                                    ...formData,
                                    user_data: { ...formData.user_data, phone_number: '' },
                                });
                                }
                            }}
                            required
                            />
                    </div>

                    <LabeledInput
                    title="Гражданство"
                    name="citizenship"
                    type="text"
                    value={formData.user_data.citizenship}
                    onChange={handleChangeUserData}
                    required />
                    
                    <LabeledInput
                    title="Город"
                    name="city"
                    type="text"
                    value={formData.user_data.city}
                    onChange={handleChangeUserData}
                    required />
                    
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
                        <InputMask
                            mask="9999 999999"
                            maskChar="_"
                            className="registration-input"
                            type="text"
                            name="passport_data"
                            value={formData.user_data.passport_data}
                            onChange={(e) => {
                                // Удаляем пробелы для корректной проверки длины
                                const valueWithoutSpaces = e.target.value.replace(/\s/g, '');
                                if (valueWithoutSpaces.length <= 10) {
                                    handleChangeUserSpecialData(e);
                                }
                            }}
                            onBlur={(e) => {
                                const valueWithoutSpaces = formData.user_data.passport_data.replace(/\s/g, '');
                                if (valueWithoutSpaces.length !== 10) {
                                setFormData({
                                    ...formData,
                                    user_data: { ...formData.user_data, passport_data: '' },
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
                        <InputMask
                            mask="999-999-999 99"
                            maskChar="_"
                            className="registration-input"
                            type="text"
                            name="snils"
                            value={formData.user_data.snils}
                            onChange={(e) => {
                                // Удаляем пробелы для корректной проверки длины
                                const valueWithoutSpaces = e.target.value.replace(/\D/g, '');
                                if (valueWithoutSpaces.length <= 11) {
                                    handleChangeUserSpecialData(e);
                                }
                            }}
                            onBlur={(e) => {
                                const valueWithoutSpaces = formData.user_data.snils.replace(/\D/g, '');
                                if (valueWithoutSpaces.length !== 11) {
                                setFormData({
                                    ...formData,
                                    user_data: { ...formData.user_data, snils: '' },
                                });
                                }
                            }}
                            required
                            />
                    </div>

                    <LabeledInput
                    title="Медицинская книжка"
                    name="medical_book"
                    type="checkbox"
                    value={formData.user_data.medical_book}
                    onChange={handleChangeUserData}
                    />

                    <LabeledInput
                    title="Самозанятый"
                    name="is_self_employed"
                    type="checkbox"
                    value={formData.user_data.is_self_employed}
                    onChange={handleChangeUserData}
                    />

                    <LabeledInput
                    title="Опыт работы"
                    name="work_experience"
                    type="text"
                    value={formData.user_data.work_experience}
                    onChange={handleChangeUserData}
                    />
                    
                    <LabeledInput
                    title="Навыки"
                    name="activity_type"
                    type="text"
                    value={formData.user_data.activity_type}
                    onChange={handleChangeUserData}
                    />
                    
                    <LabeledInput
                    title="Противопоказания"
                    name="contraindications"
                    type="text"
                    value={formData.user_data.contraindications}
                    onChange={handleChangeUserData}
                    />

                    <LabeledInput
                    title="Обо мне"
                    name="about"
                    type="text"
                    value={formData.user_data.about}
                    onChange={handleChangeUserData}
                    />

                    <LabeledInput
                    title="Образование"
                    name="education"
                    type="text"
                    value={formData.user_data.education}
                    onChange={handleChangeUserData}
                    />

                    <LabeledInput
                    title="Водительское удостоверение"
                    name="driver_license"
                    type="number"
                    value={formData.user_data.driver_license}
                    onChange={handleChangeUserData}
                    onWheel={(e) => e.target.blur()}
                    />

                    <LabeledInput
                    title="Знание языков"
                    name="languages"
                    type="text"
                    value={formData.user_data.languages}
                    onChange={handleChangeUserData}
                    />

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
                    <LabeledInput
                    title="Имя пользователя"
                    name="login"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}
                    required
                    />
                    
                    <LabeledInput
                    title="e-mail"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={(e) => {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // простая регулярка для email
                        if (!emailPattern.test(e.target.value)) {
                            setFormData({
                                ...formData, email: "" }) // сбрасываем, если формат неверный
                          alert("Введите корректный email");
                        }
                      }}
                    required
                    />

                    <LabeledInput
                    title="Пароль"
                    name="hashed_password"
                    type="password"
                    value={formData.hashed_password}
                    onChange={handleChange}
                    required
                    />
                    
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
                return "";    
        }
    };

    return (
        <div>
            {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
            <form>{renderStep()}</form>
        </div>
    )
}