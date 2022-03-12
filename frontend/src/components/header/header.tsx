import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return(
    <div className='bg'>
      <div className='title'>
        <Link className='register' to="/"><span>読書記録</span></Link>
      </div>
      <div className='panel'>
        <Link className='register' to="/register/book"><span>本を登録</span></Link>
        <span className='register'>新規登録</span>
        <span className='login'>ログイン</span>
      </div>
    </div>
  )
}

export default Header;