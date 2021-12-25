import './Top.css';
import Header from '../../components/header/header';

function Top() {
  return (
    <div>
      <Header />
      <div>Top</div>
      <div>{test()}</div>
    </div>
  );
}

export default Top;

function test(){
  return 'test';
}