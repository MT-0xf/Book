import './header.css';

function Header() {
  return(
    <div className='bg'>
      <div className='title'>
        読書記録
      </div>
      <div className='panel'>
        <span className='register'>新規登録</span>
        <span className='login'>ログイン</span>
      </div>
    </div>
  )
}

export default Header;