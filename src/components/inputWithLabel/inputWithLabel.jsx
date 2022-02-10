import React from "react";
import styles from "./inputWithLabel.module.css";

const InputWithLabel = ({
  labelName,
  inputType,
  inputId,
  placeholder,
  onChange,
}) => (
  <>
    <label className={styles.labelName} htmlFor={inputId}>
      {labelName}
    </label>
    <input
      className={styles.input}
      type={inputType}
      placeholder={placeholder}
      id={inputId}
      onChange={onChange}
    />
  </>
);

export default InputWithLabel;
