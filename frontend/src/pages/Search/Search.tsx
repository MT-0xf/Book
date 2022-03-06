import Header from "../../components/header/header";
import BookCard from "../../components/book-card/BookCard";
import './Search.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function Search() {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const keyword = query.get('keyword');
  const [data, setData] = useState([]);
  let list;

  useEffect(() => {
    axios.get('http://localhost:3000/books/search?keyword=' + keyword).then(
      (response: any) => {
        setData(response.data);
      }
    );
  }, []);

  list = data.map((value: { id: number; title: string; author_name: string; page_number: string; file: string;}, key) => {
    return <BookCard key={key} 
                    id={value.id} 
                    title={value.title}
                    authorName={value.author_name}
                    pageNumber={value.page_number}
                    file={value.file} />
  })

  return (
    <div>
      <Header />
      <div className="form">
        <div className="head">「{keyword}」の検索結果</div>
        <div className="book-list">
          {list}
        </div>
      </div>
    </div>
  )
}

export default Search;