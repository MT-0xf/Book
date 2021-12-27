import Header from "../../components/header/header";
import './RegisterBook.css';

function RegisterBook() {
  return(
    <div>
      <Header />
      <div className="form">
        <div className="head">オリジナル本登録フォーム</div>
        <ul className="ul-style">
          <li className="li-style">
            <div>タイトル</div>
            <div className="text-area">
              <input type="text"></input>
            </div>
          </li>
          <li className="li-style">
            <div>画像</div>
            <div className="text-area">
              <input type="text"></input>
            </div>
          </li>
          <li className="li-style">
            <div>著者</div>
            <div className="text-area">
              <input type="text"></input>
            </div>
          </li>
          <li className="li-style">
            <div>ページ数</div>
            <div className="text-area">
              <input type="text"></input>
            </div>
          </li>
          <li className="li-style">
            <div>ジャンル</div>
            <div className="text-area">
              <input type="text"></input>
            </div>
          </li>
          <li className="li-style">
            <div className="button-area">
              <input type="button" className='btn-green btn-radius' value="登録する"></input>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RegisterBook;