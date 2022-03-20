import Header from "../../components/header/header";
import './RegisterUser.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterBook() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const doChangeName = (e: any) => {
    setName(e.target.value);
  }

  const doChangePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const doChangeCofirmPasword = (e: any) => {
    setComfirmPassword(e.target.value);
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

    if (confirmPassword == "") {
      window.alert("パスワード(確認用)を入力してください");
      return;
    }

    if (confirmPassword.length > 32) {
      window.alert("パスワード(確認用)は32文字以内で入力してください");
      return;
    }

    if (password != confirmPassword) {
      window.alert("パスワードとパスワード(確認用)が異なります");
      return;
    }
    
    let req = {
      name: name,
      password: password,
      confirmPassword: confirmPassword
    }

    setDisable(true);
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.post('http://localhost:3000/users/regist', req).then(response => {
      if (response.data == "duplication-error") {
        window.alert("入力されたユーザ名はすでに登録されています");
      } else {
        window.alert('ユーザーを登録しました');

        window.localStorage.setItem("userName", name);
        window.localStorage.setItem("isLogin", "true");

        const path = axios.getUri({
          url: '/mypage'
        });
        navigate(path);

        setName("");
        setPassword("");
        setComfirmPassword("");   
        window.location.reload(); 
      }
      setDisable(false);
    });
  }

  return(
    <div>
      <Header />
      <div className="form">
        <div className="head">ユーザ登録</div>
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
            <div>パスワード(確認用)</div>
            <div className="text-area">
              <input type="password" maxLength={32} value={confirmPassword} onChange={doChangeCofirmPasword}></input>
            </div>
          </li>
          <li className="li-style">
            <div className="button-area">
              <input disabled={disable} type="button" className='btn-green btn-radius' value="登録する" onClick={submit}></input>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RegisterBook;