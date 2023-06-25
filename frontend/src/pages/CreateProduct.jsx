import React, { useState } from 'react';
import Modal from '../components/Modal';
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Message from "../components/Message";
import styles from "./styles/CreateProduct.module.css";
import axios from 'axios';
import { onLogout, BASE_API_URL } from '../helpers';
function CreateProduct({ onClose }) {
    const [product, setProduct] = useState({
        nama: '',
        harga_beli: '',
        harga_jual: '',
        stok: '',
        foto: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    // Function
    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: files[0]
        }));
    };

    const handleSubmit = () => {
        setShowMessage(false);

        const formData = new FormData();
        formData.append('nama', product.nama);
        formData.append('harga_beli', product.harga_beli);
        formData.append('harga_jual', product.harga_jual);
        formData.append('stok', product.stok);
        formData.append('foto', product.foto);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_API_URL}/product`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,

            },
            data: formData
        };

        axios.request(config)
            .then((response) => {
                setShowMessage(true)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                let errorMessage = "Error tidak diketahui";

                if (error.response.status === 401 || error.response.status === 403) {
                    onLogout();
                }

                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                setMessage(errorMessage);
                setShowAlert(true);
                console.log(error);
            });
    };


    return (
        <Modal>
            <div className={styles.formContainer}>
                <h1 className={styles.cardTitle}>Buat Produk</h1>
                {showMessage && <Message text="Produk berhasil dibuat" duration={3000} type="success" />}
                {showAlert && (
                    <Alert type="error" message={message} onClose={closeAlert} />
                )}
                <div className={styles.formField}>
                    <label>Nama</label>
                    <Input
                        type="text"
                        name="nama"
                        value={product.nama}
                        onChange={handleInputChange}
                        width="400px"
                    />
                </div>
                <div className={styles.formField}>
                    <label>Harga Beli</label>
                    <Input
                        type="number"
                        name="harga_beli"
                        value={product.harga_beli}
                        onChange={handleInputChange}
                        width="400px"
                    />
                </div>
                <div className={styles.formField}>
                    <label>Harga Jual</label>
                    <Input
                        type="number"
                        name="harga_jual"
                        value={product.harga_jual}
                        onChange={handleInputChange}
                        width="400px"
                    />
                </div>
                <div className={styles.formField}>
                    <label>Stok</label>
                    <Input
                        type="number"
                        name="stok"
                        value={product.stok}
                        onChange={handleInputChange}
                        width="400px"
                    />
                </div>
                <div className={styles.formField}>
                    <label>Foto</label>
                    <input
                        type="file"
                        name="foto"
                        accept=".jpg, .png"
                        onChange={handleFileChange}
                    />
                    <span className={styles.note}>*Gambar harus kurang dari 100Kb</span>
                </div>
            </div>
            <div className={styles.btnAction}>
                <Button text="Buat" onClick={handleSubmit} color="#1890ff" width="100%" />
                <Button text="Batal" onClick={onClose} color="red" width="100%" />
            </div>
        </Modal>
    )
}

export default CreateProduct