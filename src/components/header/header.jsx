import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = ({ user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img className={styles.logoImg} src="images/logo.png" alt="logo" />
          <span className={styles.logoText}>WooGeul</span>
        </Link>
        {user ? (
          <div>
            <button className={styles.button} onClick={onLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className={styles.button}>로그인</button>
            </Link>
            <Link to="/signup">
              <button className={styles.button}>회원가입</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
