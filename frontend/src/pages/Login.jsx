import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './styles/Login.module.css';
import Alert from '../components/Alert';
import axios from "axios";
import Message from '../components/Message';
import { BASE_API_URL } from "../helpers/index";

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    // Function
    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setShowMessage(false)
        if (showAlert) {
            setShowAlert(!showAlert)
        }

        const data = JSON.stringify({
            email: user.email,
            password: user.password
        });

        const options = {
            method: 'post',
            url: `${BASE_API_URL}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(options)
            .then((response) => {
                setShowMessage(true)
                localStorage.setItem('accessToken', response.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            })
            .catch((error) => {
                let errorMessage = "Error tidak diketahui";
                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                setMessage(errorMessage);
                setShowAlert(true);
                console.log(error);
            });
    };

    return (
        <div className={styles.loginContainer}>
            {showMessage && <Message text="Masuk berhasil" duration={3000} type="success" />}
            <div className={styles.card}>
                <h1 className={styles.cardTitle}>Masuk</h1>
                {showAlert && (
                    <Alert type="error" message={message} onClose={closeAlert} />
                )}
                <div className={styles.formField}>
                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleUserChange}
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="">Kata Sandi</label>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={user.password}
                        onChange={handleUserChange}
                    />
                    <label htmlFor="showPassword">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={handleTogglePassword}
                        />
                        Tampilkan Kata Sandi
                    </label>
                </div>
                <Button text="Masuk" onClick={handleSubmit} color="#1890ff" width="100%" />
                <div className={styles.signupLink}>
                    Belum punya akun? <Link to="/register">Daftar di sini</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
