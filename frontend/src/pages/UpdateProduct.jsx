import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import styles from "./styles/UpdateProduct.module.css"
import Button from '../components/Button';
import Message from '../components/Message';
import Input from '../components/Input';
import axios from 'axios';
import { BASE_API_URL, onLogout } from '../helpers';

function UpdateProduct({ productId, onClose }) {
    const [product, setProduct] = useState({
        nama: '',
        harga_beli: 0,
        harga_jual: 0,
        stok: 0,
        foto: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

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

    const handleUpdate = () => {
        setShowMessage(false);

        const data = new FormData();
        data.append('nama', product.nama);
        data.append('harga_beli', product.harga_beli);
        data.append('harga_jual', product.harga_jual);
        data.append('stok', product.stok);
        data.append('foto', product.foto);

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${BASE_API_URL}/product/${productId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,

            },
            data: data
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

                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

                setMessage(errorMessage);
                setShowAlert(true);
                console.log(error);
            });
    };

    useEffect(() => {
        let config = {
            method: 'get',
            url: `${BASE_API_URL}/product/${productId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };

        axios.request(config)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    onLogout();
                }
                console.log(error)
            });
    }, []);



    return (
        <Modal>
            <div className={styles.formContainer}>
                <h1 className={styles.cardTitle}>Ubah Produk</h1>
                {showMessage && <Message text="Produk berhasil diubah" duration={3000} type="success" />}
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
                        onChange={handleFileChange}
                    />
                </div>

                <div className={styles.btnAction}>
                    <Button text="Ubah" onClick={handleUpdate} color="#1890ff" width="100%" />
                    <Button text="Batal" onClick={onClose} color="red" width="100%" />
                </div>

            </div>
        </Modal>
    );
}

export default UpdateProduct;
