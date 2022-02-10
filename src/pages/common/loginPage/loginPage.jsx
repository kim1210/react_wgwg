import React, { useState, useCallback } from "react";
import styles from "./loginPage.module.css";
import Title from "../../../components/title/title";
import InputWithLabel from "../../../components/inputWithLabel/inputWithLabel";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  // 이메일, 비밀번호
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState();
  const [pwMessage, setPwMessage] = useState();

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요. 다시 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const pwCurrent = e.target.value;
    setPw(pwCurrent);

    if (!passwordRegex.test(pwCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPwMessage("");
      setIsPassword(true);
    }
  }, []);

  //   로그인 후 홈으로 이동
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  // onSubmit
  const onSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: pw,
    };
    console.log(userData);
    onLogin(userData.email);
    goToHome();
  };
  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Title title={"로그인"} />
      <div className={styles.formbox}>
        <InputWithLabel
          labelName="이메일"
          inputType="email"
          inputId="email"
          placeholder="abc1234@woogle.com"
          onChange={onChangeEmail}
        />
        {email.length > 0 && (
          <span
            className={`${styles.message} ${
              isEmail ? styles.success : styles.error
            }`}
          >
            {emailMessage}
          </span>
        )}
      </div>
      <div className={styles.formbox}>
        <InputWithLabel
          labelName="비밀번호"
          inputType="password"
          inputId="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
        />
        {pw.length > 0 && (
          <span
            className={`${styles.message} ${
              isPassword ? styles.success : styles.error
            }`}
          >
            {pwMessage}
          </span>
        )}
      </div>

      <button
        className={styles.button}
        onClick={onSubmit}
        disabled={!(isEmail && isPassword)}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginPage;
