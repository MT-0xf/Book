import './Top.css';
import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Top() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const doChangeKeyword = (e: any) => {
    setKeyword(e.target.value);
  }

  const doSearch = (e: any) => {
    e.preventDefault();

    const path = axios.getUri({
      url: '/search',
      params: {
        keyword: keyword
      }
    });
    navigate(path);
  }

  return (
    <div>
      <Header />
      <div>
        <form className="search_container" onSubmit={doSearch}>
          <input className="keywordBox" type="text" placeholder="キーワード検索" value={keyword} onChange={doChangeKeyword}></input>
          <input type="submit" value="  検索  " className='search-btn-green search-btn-radius'></input>
        </form>
      </div>
    </div>
  );
}

export default Top;