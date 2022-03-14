import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/Top/Top';
import Search from './pages/Search/Search';
import RegisterBook from './pages/RegisterBook/RegisterBook';
import Detail from './pages/Detail/Detail';
import RegisterUser from './pages/RegisterUser/RegisterUser';
import Login from './pages/Login/Login';

export const context = React.createContext(localStorage.context)

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const value = {
    isLogin,
    setIsLogin,
    userName,
    setUserName
  }

  useEffect(() => {
    let strIsLogin = window.localStorage.getItem("isLogin");
    let strUserName = window.localStorage.getItem("userName");

    if (strIsLogin == "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    if (strUserName != null) {
      setUserName(strUserName);
    }
  }, [isLogin, userName]);

  return (
    <div className="App">
      <BrowserRouter>
        <context.Provider value={value}>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/search" element={<Search />} />
            <Route path='/register/book' element={<RegisterBook />} />
            <Route path='/register/user' element={<RegisterUser />} />
            <Route path='/detail/book/:id' element={<Detail />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
