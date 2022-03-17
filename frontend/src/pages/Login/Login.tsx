import Header from "../../components/header/header";
import './Login.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { context } from '../../App'
import { useNavigate } from "react-router-dom";

function RegisterBook() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { userName, setUserName, isLogin, setIsLogin } = useContext(context);

  const doChangeName = (e: any) => {
    setName(e.target.value);
  }

  const doChangePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const submit = () => {
    if (name == "") {
      window.alert("ユーザ名を入力してください");
      return;
    }

    if (name.length > 32) {
      window.alert("ユーザ名は32文字以内で入力してください");
      return;
    }

    if (password == "") {
      window.alert("パスワードを入力してください");
      return;
    }

    if (password.length > 32) {
      window.alert("パスワードは32文字以内で入力してください");
      return;
    }

    let req = {
      name: name,
      password: password,
    }

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.post('http://192.168.1.179:3000/users/login', req).then(response => {
      if (response.data == "login-error") {
        window.alert("ユーザ名またはパスワードが間違っています");
      } else {
        window.confirm('ログインしました');
        setUserName(name);
        setIsLogin(true);
        window.localStorage.setItem("userName", name);
        window.localStorage.setItem("isLogin", "true");

        const path = axios.getUri({
          url: '/mypage'
        });
        navigate(path);
    
        setName("");
        setPassword("");
        window.location.reload();
      }
    });
  }

  return(
    <div>
      <Header />
      <div className="form">
        <div className="head">ログイン</div>
        <ul className="ul-style">
          <li className="li-style">
            <div>ユーザ名</div>
            <div className="text-area">
              <input type="text" maxLength={32} value={name} onChange={doChangeName}></input>
            </div>
          </li>
          <li className="li-style">
            <div>パスワード</div>
            <div className="text-area">
              <input type="password" maxLength={32} value={password} onChange={doChangePassword}></input>
            </div>
          </li>
          <li className="li-style">
            <div className="button-area">
              <input type="button" className='btn-green btn-radius' value="ログイン" onClick={submit}></input>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RegisterBook;