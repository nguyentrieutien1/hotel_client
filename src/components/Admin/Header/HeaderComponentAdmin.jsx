import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../../helpers/logout";
import styles from "./header.module.css";
export default function HeaderComponentAdmin() {
  const handleLogout = () => {
    logOut();
  };
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo1.png" alt="Logo" />
        </Link>
      </div>
      <div className={styles.option}>
        <i className="fa-regular fa-bell"></i>
        <i className={`fa-regular fa-user ${styles.account}`}></i>
        <div className={styles.setting}>
          <div className="item_container">
            <div onClick={handleLogout} className={styles.item}>
              <h5>Logout</h5>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
