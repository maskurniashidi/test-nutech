import React from "react";
import {
    DashboardColor,
    DashboardDark,
} from "../assets";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./styles/Sidebar.module.css";

function Sidebar() {
    const location = useLocation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {location.pathname.slice(0, 10) === "/dashboard" ? (
                    <NavLink to="/dashboard" end className={styles.linkSidebarActive}>
                        <img
                            src={DashboardColor}
                            alt="icon sidebar"
                            className={styles.iconSidebar}
                        />
                        <h5 className={styles.textColor}>Dashboard</h5>
                    </NavLink>
                ) : (
                    <NavLink to="/dashboard" end className={styles.linkSidebar}>
                        <img
                            src={DashboardDark}
                            alt="icon sidebar"
                            className={styles.iconSidebar}
                        />
                        <h5 className={styles.text}>Dashboard</h5>
                    </NavLink>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
