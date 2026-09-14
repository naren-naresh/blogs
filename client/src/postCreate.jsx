import axios from "axios";
import { useState } from "react";


function PostCreate() {
    const [title, setTitle] = useState('');

    const onsubmit = async (event) => {
      event.preventDefault();
      await axios.post('http://localhost:4000/posts',{
        title
      });

      setTitle('');
    };
  return (
    <div>
       <form onSubmit={onsubmit}>
           <div className='form-group'>
              <label className="h5">
                Title
              </label>
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                type="text" 
                className='form-control'
              />
              <button className='btn btn-primary mt-2'> 
                Submit  
              </button>
           </div>
       </form>
    </div>
  )
}

export default PostCreate
