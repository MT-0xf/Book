import { useContext, useEffect, useState } from "react";
import { context } from "../../App";
import Header from "../../components/header/header";
import './MyPage.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import BookCard from "../../components/book-card/BookCard";
import { Pagination } from "@material-ui/lab";
import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';

interface Book {
  id: number;
  title: string;
  author_name: string;
  page_number: number;
  file: string;
}

function MyPage() {
  const { userName, setUserName, isLogin, setIsLogin } = useContext(context);
  const [data, setData] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [readingBooks, setReadingBooks] = useState([]);
  const [wantBooks, setWantBooks] = useState([]);
  const [firstFlg, setFirstFlg] = useState(false);
  const [page1, setPage1] = useState(1)
  const [page2, setPage2] = useState(1)
  const [page3, setPage3] = useState(1)

  const Pagination = withStyles({
    root: {
      display: 'inline-block',  //中央寄せのためインラインブロックに変更
    },
  })(MuiPagination);  

  let allReadList: any[];
  let allReadingList: any[];
  let allWantList: any[];

  let ReadList;
  let ReadingList;
  let WantList;

  let max: number = 15;

  let windowSize: number = window.innerWidth;

  if (windowSize > 600 && windowSize < 700) {
    max = 16;
  }

  window.addEventListener("orientationchange", ()=>{
    let angle = window.orientation;
    if (angle == 0) {
      max = 15;
    } 
    if (angle == 90) {
      max = 16;
    }
    ReadList = allReadList.slice((page1 - 1) * max, page1 * max);
    ReadingList = allReadingList.slice((page2 - 1) * max, page2 * max);
    WantList = allWantList.slice((page3 - 1) * max, page3 * max);
      window.location.reload();
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    let name = window.localStorage.getItem("userName");

    axios.get('http://192.168.1.179:3000/books/mypage?name=' + name).then(response => {
      setData(response.data);
    });
  }, []);

  if (!firstFlg && data.length != 0) {
    let filterBook = data.filter((value: { status: number; }, key) => {
      return value.status == 1
    });
    setReadBooks(filterBook);

    filterBook = data.filter((value: { status: number; }, key) => {
      return value.status == 2
    });
    setReadingBooks(filterBook);

    filterBook = data.filter((value: { status: number; }, key) => {
      return value.status == 3
    });
    setWantBooks(filterBook);
    setFirstFlg(true);
  }

  allReadList = readBooks.map((value: { Book: Book; }, key) => {
    return <BookCard key={key}
      id={value.Book.id}
      title={value.Book.title}
      authorName={value.Book.author_name}
      pageNumber={value.Book.page_number}
      file={value.Book.file} />
  });

  allReadingList = readingBooks.map((value: { Book: Book; }, key) => {
    return <BookCard key={key}
      id={value.Book.id}
      title={value.Book.title}
      authorName={value.Book.author_name}
      pageNumber={value.Book.page_number}
      file={value.Book.file} />
  });

  allWantList = wantBooks.map((value: { Book: Book; }, key) => {
    return <BookCard key={key}
      id={value.Book.id}
      title={value.Book.title}
      authorName={value.Book.author_name}
      pageNumber={value.Book.page_number}
      file={value.Book.file} />
  });


  let totalPage_1: number = Math.ceil(allReadList.length / max);
  let totalPage_2: number = Math.ceil(allReadingList.length / max);
  let totalPage_3: number = Math.ceil(allWantList.length / max);

  ReadList = allReadList.slice((page1 - 1) * max, page1 * max);
  ReadingList = allReadingList.slice((page2 - 1) * max, page2 * max);
  WantList = allWantList.slice((page3 - 1) * max, page3 * max);

  return (
    <div>
      <Header />
      <div className="form">
        <div className="head">{userName}のページ</div>
        <div className="tabPanel">
          <Tabs>
            <TabList>
              <Tab>読んだ本</Tab>
              <Tab>読んでる本</Tab>
              <Tab>読みたい本</Tab>
            </TabList>

            <TabPanel>
              <div className="book-list list-padding">
                {ReadList}
              </div>
              <div className="page">
                <Pagination
                  count={totalPage_1}
                  color="primary"
                  onChange={(e, page) => {
                    window.scrollTo(0, 0);
                    setPage1(page);
                  }}
                  page={page1}
                />
              </div>
            </TabPanel>

            <TabPanel>
            <div className="book-list">
                {ReadingList}
              </div>
              <div className="page">
                <Pagination
                  count={totalPage_2}
                  color="primary"
                  onChange={(e, page) => {
                    window.scrollTo(0, 0);
                    setPage2(page);
                  }}
                  page={page2}
                />
              </div>
            </TabPanel>

            <TabPanel>
            <div className="book-list">
                {WantList}
              </div>
              <div className="page">
                <Pagination
                  count={totalPage_3}
                  color="primary"
                  onChange={(e, page) => {
                    window.scrollTo(0, 0);
                    setPage3(page);
                  }}
                  page={page3}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MyPage;