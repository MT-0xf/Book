import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBox from "../../components/comment-box/CommentBox";
import Header from "../../components/header/header";
import './Detail.css';
import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';
import { context } from "../../App";

function Detail(props: any) {
  let init = {
    "id": 0,
    "title": "",
    "author_name": "",
    "page_number": "",
    "file": "",
    "scenario": ""
  }
  const [comments, setComments] = useState([]);
  const [data, setData] = useState(init);
  const [update, setUpdata] = useState(true);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [bookStatus, setBookStatus] = useState(-1);
  const [popupMessage, setPopupMessage] = useState("");
  const { userName, setUserName, isLogin, setIsLogin } = useContext(context);

  const urlParams = useParams<{ id: string }>();
  let windowSize: number = window.innerWidth;
  let isPc: boolean = true;
  let allList;
  let list;
  let max: number = 5;
  const [page, setPage] = useState(1);
  const Pagination = withStyles({
    root: {
      display: 'inline-block',  //中央寄せのためインラインブロックに変更
    },
  })(MuiPagination);

  if (windowSize < 800) {
    isPc = false;
  } else {
    isPc = true;
  }

  window.addEventListener('resize', function () {
    windowSize = window.innerWidth;

    if (windowSize < 800) {
      isPc = false;
    } else {
      isPc = true;
    }

    setUpdata(isPc);
  }, true);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://192.168.1.179:3000/books/detail/' + urlParams.id).then(
      (response: any) => {
        setData(response.data[0]);
      }
    );

    axios.get('http://192.168.1.179:3000/comments/' + urlParams.id).then(
      (response: any) => {
        setComments(response.data);
      }
    );

    let req = {
      name: window.localStorage.getItem("userName"),
      bookId: urlParams.id
    }

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.post('http://192.168.1.179:3000/bookstatus', req).then(response => {
      setBookStatus(response.data.status);
    });
  }, []);

  const doChangeComment = (e: any) => {
    setComment(e.target.value);
  }

  const doChangeName = (e: any) => {
    setName(e.target.value);
  }

  function getStringFromDate(date: Date) {
    let year_str = date.getFullYear();
    let month_str = 1 + date.getMonth();
    let day_str = date.getDate();
    let hour_str = ('00' + date.getHours()).slice(-2);
    let minute_str = ('00' + date.getMinutes()).slice(-2);
    let second_str = ('00' + date.getSeconds()).slice(-2);

    let format_str = 'YYYY-MM-DD hh:mm:ss';
    format_str = format_str.replace(/YYYY/g, year_str.toString());
    format_str = format_str.replace(/MM/g, month_str.toString());
    format_str = format_str.replace(/DD/g, day_str.toString());
    format_str = format_str.replace(/hh/g, hour_str.toString());
    format_str = format_str.replace(/mm/g, minute_str.toString());
    format_str = format_str.replace(/ss/g, second_str.toString());

    return format_str;
  }

  const submit = () => {
    if (name == "") {
      window.alert("名前を入力してください");
      return;
    }

    if (name.length > 32) {
      window.alert("名前は32文字以内で入力してください");
      return;
    }

    if (comment == "") {
      window.alert("コメント内容を入力してください");
      return;
    }

    if (comment.length > 200) {
      window.alert("コメント内容は32文字以内で入力してください");
      return;
    }

    let req = {
      bookId: urlParams.id,
      name: name,
      date: getStringFromDate(new Date()),
      content: comment
    }

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.post('http://192.168.1.179:3000/comments/regist', req);
    window.location.reload();

    setName("");
    setComment("");
  }

  allList = comments.map((value: { name: string; date: string; content: string; }, key) => {
    return <CommentBox key={key}
      name={value.name}
      date={value.date}
      comment={value.content} />
  });

  let totalPage: number = Math.ceil(allList.length / max);
  list = allList.slice((page - 1) * max, page * max);


  function addBook(i: number) {
    if (bookStatus == 0) {
      let req = {
        name: userName,
        bookId: urlParams.id,
        status: i
      }

      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.post('http://192.168.1.179:3000/bookstatus/addBook', req).then(response => {
        setBookStatus(response.data.status);
        if (i == 1) {
          setPopupMessage("読んだ本に追加しました");
        }
        if (i == 2) {
          setPopupMessage("読んでる本に追加しました");
        }
        if (i == 3) {
          setPopupMessage("読みたい本に追加しました");
        }

        let popup = document.querySelector('.popup');
        popup?.classList.add('js_active');
        setTimeout(function () {
          popup?.classList.remove('js_active');
        }, 3000);
      });

    } else {
      let req = {
        name: userName,
        bookId: urlParams.id,
        status: i
      }

      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.put('http://192.168.1.179:3000/bookstatus/addBook', req).then(response => {
        setBookStatus(response.data.status);
        if (i == 1) {
          setPopupMessage("読んだ本に追加しました");
        }
        if (i == 2) {
          setPopupMessage("読んでる本に追加しました");
        }
        if (i == 3) {
          setPopupMessage("読みたい本に追加しました");
        }

        let popup = document.querySelector('.popup');
        popup?.classList.add('js_active');
        setTimeout(function () {
          popup?.classList.remove('js_active');
        }, 3000);
      });
    }
  }


  function liftBook(i: number) {
    let req = {
      name: userName,
      bookId: urlParams.id
    }

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.post('http://192.168.1.179:3000/bookstatus/liftBook', req).then(response => {
      setBookStatus(response.data.status);
      if (i == 1) {
        setPopupMessage("読んだ本から解除しました");
      }
      if (i == 2) {
        setPopupMessage("読んでる本から解除しました");
      }
      if (i == 3) {
        setPopupMessage("読みたい本から解除しました");
      }

      let popup = document.querySelector('.popup');
      popup?.classList.add('js_active');
      setTimeout(function () {
        popup?.classList.remove('js_active');
      }, 3000);
    });
  }

  return (
    <div>
      <Header />
      {isPc ?
        <div>
          <div className="form">
            <div className="book-detail">
              <span>
                <img src={data.file} className="book-detail-size"></img>
              </span>
              <div className="right">
                <h1>{data.title}</h1>
                {data.author_name}<br /><br />
                {data.scenario.slice(0, 200)}<br />
              </div>
            </div>
          </div>
        </div>
        :
        <div>
          <div className="form">
            <div className="book-detail-sp">
              <div className="book-detail-sp-img">
                <img src={data.file} className="book-detail-size-sp"></img>
              </div>
              <div className="book-detail-content-sp">
                <h1 className="book-detail-title">{data.title}</h1>
                {data.author_name}<br /><br />
                {data.scenario.slice(0, 200)}<br />
              </div>
            </div>
          </div>
        </div>
      }
      {isLogin && userName != "" ?
        <div className="form">
          <div className="addBook">
            <table>
              <tr>
                {
                  bookStatus == 1 ?
                    <td onClick={() => liftBook(1)}>読んだ本から<br />解除</td>
                    :
                    <td onClick={() => addBook(1)}>読んだ本に<br />追加</td>
                }
                {
                  bookStatus == 2 ?
                    <td onClick={() => liftBook(2)}>読んでる本<br />から解除</td>
                    :
                    <td onClick={() => addBook(2)}>読んでる本<br />に追加</td>
                }
                {
                  bookStatus == 3 ?
                    <td onClick={() => liftBook(3)}>読みたい本<br />から解除</td>
                    :
                    <td onClick={() => addBook(3)}>読みたい本<br />に追加</td>
                }
              </tr>
            </table>
          </div>
        </div>
        :
        <div></div>
      }
      <div>
        <div className="form">
          <div id="comment" className="head">コメント</div>
          <div className="comment">
            <div className="blank-white-space"></div>
            {list}
            <div className="blank-white-space"></div>
          </div>
          <div className="page">
            <Pagination
              count={totalPage}
              color="primary"
              onChange={(e, page) => {
                let element = document.getElementById('comment');
                if (element != null) {
                  let rect = element.getBoundingClientRect();
                  let elemtop = rect.top + window.pageYOffset;
                  document.documentElement.scrollTop = elemtop;
                }
                setPage(page);
              }}
              page={page}
            />
          </div>
        </div>
      </div>
      <div className="form">
        <div className="head">コメントを投稿する</div>
        <ul className="ul-style">
          <li className="li-style">
            <div>名前</div>
            <div className="text-area">
              <input type="text" maxLength={32} value={name} onChange={doChangeName}></input>
            </div>
          </li>
          <li className="li-style">
            <div>コメント内容</div>
            <div className="text-area">
              <textarea className="scenario" rows={4} maxLength={200} value={comment} onChange={doChangeComment}></textarea>
            </div>
          </li>
          <li className="li-style">
            <div className="button-area">
              <input type="button" className='btn-green btn-radius' value="送信する" onClick={submit}></input>
            </div>
          </li>
        </ul>
      </div>
      <p className="popup">{popupMessage}</p>
    </div>
  )
}

export default Detail;