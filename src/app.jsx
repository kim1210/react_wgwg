import styles from "./app.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import MainPage from "./pages/common/mainPage/mainPage";
import SignUpPage from "./pages/common/signUpPage/signUpPage";
import LoginPage from "./pages/common/loginPage/loginPage";
import { useState } from "react";

function App() {
  // 로그인 여부 💡 안전한 방법으로 수정 필요
  const [user, setUser] = useState();
  const logout = () => {
    setUser();
  };
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header user={user} onLogout={logout} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage onLogin={setUser} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
