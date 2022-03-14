import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBox from "../../components/comment-box/CommentBox";
import Header from "../../components/header/header";
import './Detail.css';
import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';

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
    let hour_str = date.getHours();
    let minute_str = date.getMinutes();
    let second_str = date.getSeconds();

    let format_str = 'YYYY-MM-DD hh時mm分ss秒';
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
    axios.post('http://localhost:3000/comments/regist', req);

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
    </div>
  )
}

export default Detail;