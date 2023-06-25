import React from "react";
import styles from "./styles/Navbar.module.css";
import { onLogout } from "../helpers"
import Button from "../components/Button";

const Navbar = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h5>
                        Selamat Datang
                    </h5>
                </div>
                <div className={styles.right}>
                    <Button text="Keluar" onClick={onLogout} color="red" width="100%" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
