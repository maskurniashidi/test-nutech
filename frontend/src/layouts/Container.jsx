import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./styles/Container.module.css";
const Container = (props) => {
    return (
        <>
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.main}>
                    <Sidebar />
                    <div className={styles.content}>{props.children}</div>
                </div>
            </div>
        </>
    );
}

export default Container;
