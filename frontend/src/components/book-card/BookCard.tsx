import Header from "../header/header";
import './BookCard.css';
import axios from "axios";

function BookCard(props: any) {
  let id: number = props.id;
  let title: string = props.title;
  let authorName: string = props.authorName;
  let pageNumber: number = props.pageNumber;
  let file: string = props.file;

  return (
    <div className="book-card">
      <div><img src={file} height="150px" width="100px" /></div>
      <div className="text">{title}</div>
      <div className="text">{authorName}</div>
    </div>
  )
}

export default BookCard;