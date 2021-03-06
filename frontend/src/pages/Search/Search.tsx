import Header from "../../components/header/header";
import BookCard from "../../components/book-card/BookCard";
import './Search.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';

function Search() {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const keyword = query.get('keyword');
  const [data, setData] = useState([]);
  let allList: any[];
  let list;
  let max: number = 15;
  let windowSize: number = window.innerWidth;

  if (windowSize > 600 && windowSize < 700) {
    max = 16;
  }

  const [page, setPage] = useState(1)
  const Pagination = withStyles({
    root: {
      display: 'inline-block',  //中央寄せのためインラインブロックに変更
    },
  })(MuiPagination);  

  useEffect(() => {
    axios.get('http://localhost:3000/books/search?keyword=' + keyword).then(
      (response: any) => {
        setData(response.data);
      }
    );
  }, []);

  window.addEventListener("orientationchange", ()=>{
    let angle = window.orientation;
    if (angle == 0) {
      max = 15;
    } 
    if (angle == 90) {
      max = 16;
    }
    list = allList.slice((page - 1) * max, page * max);
    window.location.reload();
  });

  allList = data.map((value: { id: number; title: string; author_name: string; page_number: string; file: string;}, key) => {
    return <BookCard key={key} 
                    id={value.id} 
                    title={value.title}
                    authorName={value.author_name}
                    pageNumber={value.page_number}
                    file={value.file} />
  });

  let totalPage: number = Math.ceil(allList.length / max);
  list = allList.slice((page - 1) * max, page * max);
  
  return (
    <div>
      <Header />
      <div className="form">
        <div className="head">「{keyword}」の検索結果</div>
        <div className="book-list">
          {list}
        </div>
        <div className="page">
          <Pagination 
            count={totalPage}
            color="primary"
            onChange={(e, page) =>{
              window.scrollTo(0, 0);
              setPage(page);
            }}
            page={page}
          />
        </div>
      </div>
    </div>
  )
}

export default Search;