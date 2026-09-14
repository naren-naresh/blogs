import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { randomBytes } from "crypto"
import axios from "axios";

const app = express();

app.use(cors());

app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req,res) =>{
    const postId = req.params.id
    res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments',async(req,res) =>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    comments.push({id:commentId, content});

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type: "CommentCreated",
        data: {
            id:commentId, 
            content,
            postId
        }
    })

     res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Event Received ', req.body.type);

  res.send({});
});

app.listen(4001,() => {
    console.log('Listening on 4001')
});  