import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/Top/Top';
import Search from './pages/Search/Search';
import RegisterBook from './pages/RegisterBook/RegisterBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/search" element={<Search />} />
          <Route path='/register/book' element={<RegisterBook />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
