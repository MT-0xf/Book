import './CommentBox.css';
import axios from "axios";

function CommentBox(props: any) {
  let name: string = props.name;
  let date: string = props.date;
  let comment: string = props.comment

  return (
    <div className="comment-box">
      <div className='comment-wrap'>
        <div>{name}：{date}</div>
        <div>{comment}</div>
      </div>
    </div>
  )
}

export default CommentBox;