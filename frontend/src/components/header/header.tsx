import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../../App';
import './header.css';

function Header() {
  const { userName, setUserName, isLogin, setIsLogin } = useContext(context);

  return(
    <div className='bg'>
      <div className='title'>
        <Link className='register' to="/"><span>読書記録</span></Link>
      </div>
      <div className='panel'>
        <Link className='register' to="/register/book"><span>本を登録</span></Link>
        <Link className='register' to="/register/user"><span>ユーザ登録</span></Link>
        {
          isLogin && userName != "" ?
          <Link className='login' to="/mypage"><span>マイページ</span></Link>
          :
          <Link className='login' to="/login"><span>ログイン</span></Link>
        }
      </div>
    </div>
  )
}

export default Header;