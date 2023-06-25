import React, { useEffect, useState } from 'react'
import Container from '../layouts/Container'
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Button from "../components/Button"
import Input from '../components/Input';
import styles from "./styles/Dashboard.module.css";
import axios from 'axios';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BASE_API_URL, onLogout } from '../helpers';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [idProduct, setIdProduct] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Side Effect
    useEffect(() => {
        let config = {
            method: 'get',
            url: `${BASE_API_URL}/product`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };

        axios.request(config)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    onLogout();
                } else {
                    console.log("Error:", error);
                }
                setLoading(false);
            });
    }, []);


    // Function
    const handleDeleteProduct = (productId) => {
        let config = {
            method: 'delete',
            url: `${BASE_API_URL}/product/${productId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };

        axios.request(config)
            .then((response) => {
                setProducts(products.filter((product) => product.id !== productId));
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    onLogout();
                } else {
                    console.log("Error:", error);
                }
            });

        setProductToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const handleConfirmDelete = (productId) => {
        setProductToDelete(productId);
        setShowDeleteConfirmation(true);
    };

    const handleCancelDelete = () => {
        setProductToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const { nama, harga_jual, harga_beli, stok } = product;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            nama.toLowerCase().includes(lowerCaseSearchTerm) ||
            harga_jual.toString().includes(lowerCaseSearchTerm) ||
            harga_beli.toString().includes(lowerCaseSearchTerm) ||
            stok.toString().includes(lowerCaseSearchTerm)
        );
    });

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    const columns = ['Produk', 'Stok', 'Harga Beli', 'Harga Jual', 'Aksi'];
    const rows = filteredProducts.map((product) => ({
        "Produk": (
            <div className={styles.product}>
                <img src={`http://localhost:3010/uploads/${product.foto}`} alt="tes" className={styles.productImage} />
                <p className={styles.productName}>{product.nama}</p>
            </div>
        ),
        "Stok": <p className={styles.rowsText}>{product.stok}</p>,
        "Harga Beli": <p className={styles.rowsText}>{formatCurrency(product.harga_beli)}</p>,
        "Harga Jual": <p className={styles.rowsText}>{formatCurrency(product.harga_jual)}</p>,
        "Aksi": (
            <div className={styles.actionContainer}>
                <button className={styles.btnAction} onClick={() => handleConfirmDelete(product.id)}>
                    <AiFillDelete className={styles.iconDelete} />
                </button>
                <button
                    className={styles.btnAction}
                    onClick={() => {
                        setShowEdit(!showEdit);
                        setIdProduct(product.id);
                    }}
                >
                    <AiFillEdit className={styles.iconEdit} />
                </button>
            </div>
        )
    }));
    return (
        <Container>
            <div className={styles.content}>

                <h1 className={styles.pageTitle}>Dashboard</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className={styles.menu}>
                            <Input
                                type="text"
                                name="search"
                                placeholder="Cari berdasarkan nama produk, stok, harga jual, dan harga beli..."
                                value={searchTerm}
                                onChange={handleSearch}
                                width="450px"
                            />
                            <Button text="Buat Produk" onClick={() => setShowCreate(!showCreate)} color="#1890ff" />
                        </div>
                        {
                            showCreate && <CreateProduct onClose={() => setShowCreate(false)} />
                        }
                        {
                            showEdit && <UpdateProduct productId={idProduct} onClose={() => setShowEdit(false)} />
                        }
                        <div className={styles.tableContainer}>
                            {
                                products.length === 0 ? <h1 className={styles.emptyText}>Produk anda kosong, silahkan buat produk!</h1> : <Table columns={columns} rows={rows} itemsPerPage={5} />
                            }
                        </div>

                        {showDeleteConfirmation && (
                            <Modal>
                                <div className={styles.deleteConfirmation}>
                                    <h2 className={styles.deleteCOnfirmationTitle}>Konfirmasi!</h2>
                                    <p className={styles.deleteCOnfirmationText}>Anda yakin ingin menghapus produk?</p>
                                    <div className={styles.btnConfirmation}>
                                        <Button text="Hapus" onClick={() => handleDeleteProduct(productToDelete)} color="#1890ff" width="100px" />
                                        <Button text="Batal" onClick={handleCancelDelete} color="red" width="100px" />
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </Container>
    )
}

export default Dashboard