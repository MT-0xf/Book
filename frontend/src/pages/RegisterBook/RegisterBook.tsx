import Header from "../../components/header/header";
import './RegisterBook.css';
import { useState } from 'react';
import axios from 'axios';

function RegisterBook() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  const doChangeTitle = (e: any) => {
    setTitle(e.target.value);
  }

  const doChangeFile = (e: any) => {
    var image = e.target.files[0];
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

  const submit = () => {
    let req = {
      title: 'test002',
      file: '/test',
      author_name: 'auth002',
      page_number: 120
    }

    axios.post('http://localhost:3000/books/regist', req);

    // setTitle("");
    // setFile("");
    // setAuthorName("");
    // setPageNumber(0);
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
              <input type="text" value={title} onChange={doChangeTitle}></input>
            </div>
          </li>
          <li className="li-style">
            <div>画像</div>
            <div className="text-area">
              <input type="file" accept="image" onChange={doChangeFile}></input>
            </div>
          </li>
          <li className="li-style">
            <div>著者名</div>
            <div className="text-area">
              <input type="text" value={authorName} onChange={doChangeAuthorName}></input>
            </div>
          </li>
          <li className="li-style">
            <div>ページ数</div>
            <div className="text-area">
              <input type="number" value={pageNumber} min={0} onChange={doChangePageNumber}></input>
            </div>
          </li>
          {/* <li className="li-style">
            <div>ジャンル</div>
            <div className="text-area">
              <input type="text"></input>
            </div>
          </li> */}
          <li className="li-style">
            <div className="button-area">
              <input type="button" className='btn-green btn-radius' value="登録する" onClick={submit}></input>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RegisterBook;