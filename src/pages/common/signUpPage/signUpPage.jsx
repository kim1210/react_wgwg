import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/inputWithLabel/inputWithLabel";
import Title from "../../../components/title/title";
import styles from "./signUpPage.module.css";

// https://velog.io/@leemember/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC

const SignUpPage = ({ onLogin }) => {
  //이메일, 비밀번호, 비밀번호 확인, 이름
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState();
  const [pwMessage, setPwMessage] = useState();
  const [pw2Message, setPw2Message] = useState();
  const [nameMessage, setNameMessage] = useState();

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isName, setIsName] = useState(false);

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
      setEmailMessage("올바른 이메일 형식입니다.");
      setIsEmail(true);
    }
  }, []);

  // 이름
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 6) {
      setNameMessage("2글자 이상 6글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름 형식입니다.");
      setIsName(true);
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
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const pw2Current = e.target.value;
      setPw2(pw2Current);

      if (pw === pw2Current) {
        setPw2Message("비밀번호를 똑같이 입력했어요.");
        setIsPasswordConfirm(true);
      } else {
        setPw2Message("비밀번호가 틀려요. 다시 확인해주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [pw]
  );

  // 회원가입 후 홈으로 이동
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  // onSubmit
  const onSubmit = (event) => {
    event.preventDefault();
    const userData = {
      id: Date.now(),
      email: email,
      password: pw,
      name: name,
    };
    console.log(userData);
    onLogin(userData.email);
    goToHome();
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Title title={"회원가입"} />
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

      <div className={styles.formbox}>
        <InputWithLabel
          labelName="비밀번호 확인"
          inputType="password"
          inputId="password2"
          placeholder="비밀번호 확인"
          onChange={onChangePasswordConfirm}
        />
        {pw2.length > 0 && (
          <span
            className={`${styles.message} ${
              isPasswordConfirm ? styles.success : styles.error
            }`}
          >
            {pw2Message}
          </span>
        )}
      </div>

      <div className={styles.formbox}>
        <InputWithLabel
          labelName="이름"
          inputType="name"
          inputId="name"
          placeholder="홍길동"
          onChange={onChangeName}
        />
        {name.length > 0 && (
          <span
            className={`${styles.message} ${
              isName ? styles.success : styles.error
            }`}
          >
            {nameMessage}
          </span>
        )}
      </div>

      <button
        className={styles.button}
        onClick={onSubmit}
        disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpPage;
