import React from "react";
import styles from "./header.module.css";

const Header = ({ user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src="images/logo.png" alt="logo" />
        <span>WooGeul</span>
      </div>
      {user ? (
        <div>
          <button className={styles.button} onClick={console.log(user)}>
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <button className={styles.button}>로그인</button>
          <button className={styles.button}>회원가입</button>
        </div>
      )}
    </header>
  );
};

export default Header;
