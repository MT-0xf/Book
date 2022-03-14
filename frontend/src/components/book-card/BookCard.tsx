import Header from "../header/header";
import './BookCard.css';
import axios from "axios";
import { Link } from "react-router-dom";

function BookCard(props: any) {
  let id: number = props.id;
  let title: string = props.title;
  let authorName: string = props.authorName;
  let pageNumber: number = props.pageNumber;
  let file: string = props.file;
  let link: string = "/detail/book/" + id.toString();

  return (
      <div className="book-card">
        <Link to={link} className="link">
          <div><img src={file} height="150px" width="100px" /></div>
          <div className="text">{title}</div>
          <div className="text">{authorName}</div>
        </Link>
      </div>
  )
}

export default BookCard;