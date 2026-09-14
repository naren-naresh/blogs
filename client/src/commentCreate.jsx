import { useState } from "react"
import axios from "axios";


export default function CommentCreate({postId}) {

    const [content, setContent] = useState('')

    const onsubmit = async(event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            content
        });

        setContent('');
    }
  return (
    <div>
      <form onSubmit={onsubmit} className="form-group">
        <label>New Comment</label>
        <input 
          value={content} 
          onChange={e => setContent(e.target.value)}
          type="text" 
          className="form-control" 
        />
       <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  )
}
