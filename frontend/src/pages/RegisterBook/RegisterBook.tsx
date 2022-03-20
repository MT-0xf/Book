import Header from "../../components/header/header";
import './RegisterBook.css';
import { useState } from 'react';
import axios from 'axios';

function RegisterBook() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [scenario, setScenario] = useState("");
  const [disable, setDisable] = useState(false);

  const doChangeTitle = (e: any) => {
    setTitle(e.target.value);
  }

  const doChangeFile = (e: any) => {
    var image = e.target.files[0];
    setFileName(image.fileName);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    
    fileReader.onload = function () {
      if (fileReader.result != null) {
        setFile(fileReader.result.toString());
      }
    }
  }

  const doChangeAuthorName = (e: any) => {
    setAuthorName(e.target.value);
  }

  const doChangePageNumber = (e: any) => {
    setPageNumber(e.target.value);
  }

  const doChangeScenario = (e: any) => {
    setScenario(e.target.value);
  }

  const submit = () => {
    if (title == "") {
      window.alert("タイトルを入力してください");
      return;
    }

    if (title.length > 32) {
      window.alert("タイトルは32文字以内で入力してください");
      return;
    }

    if (file == "") {
      window.alert("画像を追加してください");
      return;
    }

    if (authorName == "") {
      window.alert("著者名を入力してください");
      return;
    }

    if (authorName.length > 32) {
      window.alert("著者名は32文字以内で入力してください");
      return;
    }

    if (pageNumber > 100000) {
      window.alert("ページ数は100000ページ以内で入力してください");
      return;
    }

    if (scenario == "") {
      window.alert("あらすじを入力してください");
      return;
    }

    if (scenario.length > 200) {
      window.alert("あらすじは200文字以内で入力してください");
      return;
    }

    var Base64 = {
      encode: function(str: string) {
          return btoa(unescape(encodeURIComponent(str)));
      },
      decode: function(str: string) {
          return decodeURIComponent(escape(atob(str)));
      }
    };

    let req = {
      title: title,
      file: Base64.encode(file),
      author_name: authorName,
      page_number: pageNumber,
      scenario: scenario
    }

    setDisable(true);
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.post('http://localhost:3000/books/regist', req).then(response => {
      if (response.data == "success") {
        setTitle("");
        setFile("");
        setFileName("");
        setAuthorName("");
        setPageNumber(0);
        setScenario("");
        window.alert('本を登録しました');
      } else {
        window.alert('本の登録に失敗しました');
      }
      setDisable(false);
    });

  }

  return(
    <div>
      <Header />
      <div className="form">
        <div className="head">オリジナル本登録フォーム</div>
        <ul className="ul-style">
          <li className="li-style">
            <div>タイトル</div>
            <div className="text-area">
              <input type="text" maxLength={32} value={title} onChange={doChangeTitle}></input>
            </div>
          </li>
          <li className="li-style">
            <div>画像</div>
            <div className="text-area">
              <input type="file" accept="image" value={fileName} onChange={doChangeFile}></input>
            </div>
          </li>
          <li className="li-style">
            <div>著者名</div>
            <div className="text-area">
              <input type="text" maxLength={32} value={authorName} onChange={doChangeAuthorName}></input>
            </div>
          </li>
          <li className="li-style">
            <div>ページ数</div>
            <div className="text-area">
              <input type="number" value={pageNumber} min={0} max={100000} onChange={doChangePageNumber}></input>
            </div>
          </li>
          <li className="li-style">
            <div>あらすじ</div>
            <div className="text-area">
              <textarea className="scenario" maxLength={200} rows={4} value={scenario} onChange={doChangeScenario}></textarea>
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