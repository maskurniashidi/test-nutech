import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './styles/Register.module.css';
import axios from "axios";
import Message from '../components/Message';
import Alert from '../components/Alert';
import { BASE_API_URL } from '../helpers';

const Register = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        role: 'admin'
    });
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    // Function
    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setShowMessage(false);

        const data = JSON.stringify({
            email: user.email,
            password: user.password,
            role: user.role
        });

        const options = {
            method: 'post',
            url: `${BASE_API_URL}/auth/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(options)
            .then((response) => {
                setShowAlert(false);
                setShowMessage(true);
            })
            .catch((error) => {
                if (error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('Error tidak diketahui');
                }
                setShowAlert(true)
                console.log(error);
            });
    };



    return (
        <div className={styles.registerContainer}>
            {showMessage && <Message text="Pendaftaran berhasil" duration={3000} type="success" />}
            <div className={styles.card}>
                <h1 className={styles.cardTitle}>Daftar</h1>
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
                    <label htmlFor="password">Kata Sandi</label>
                    <Input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleUserChange}
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="role">Role</label>
                    <div className={styles.selectContainer}>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleUserChange}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                </div>
                <Button text="Daftar" onClick={handleSubmit} color="#1890ff" width="100%" />
                <div className={styles.loginLink}>
                    Sudah punya akun? <Link to="/">Masuk di sini</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
