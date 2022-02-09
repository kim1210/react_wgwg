import React from "react";
import styles from "./footer.module.css";

const Footer = (props) => (
  <footer className={styles.container}>
    <h2 className={styles.title}>Contact us</h2>
    <p className={styles.rights}>Woogeuls - All rights reserved</p>
  </footer>
);

export default Footer;
