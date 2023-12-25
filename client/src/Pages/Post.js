 // eslint-disable-next-line
import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment]= useState("");
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

useEffect(()=>{
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
      setPostObject(response.data);  
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
      setComments(response.data);  
    });// eslint-disable-next-line
}, []);

  const addComment=()=>{
    axios
    .post("http://localhost:3001/comments", {
      commentBody: newComment, 
        PostId: id,
      },
      {
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        }
      })
    .then((response)=>{
      if (response.data.error){
        //alert(response.data.error);
        console.log(response.data.error);
    } else{
      const commentToAdd= {commentBody: newComment, username: response.data.username};
      setComments([...comments, commentToAdd]);
      setNewComment("");
    }
    });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate('/');
      });
};

  const editPost = (option)=>{
    if( option=== "title"){
      let newTitle = prompt("Enter new title: ");
      axios.put("http://localhost:3001/posts/title", 
      { 
        newTitle: newTitle, 
        id: id,
      },
      { 
        headers: { accessToken: localStorage.getItem("accessToken")},
      });

      setPostObject({...postObject, title: newTitle});
    }else{
      let newPostText = prompt("Enter new text: ");
      axios.put("http://localhost:3001/posts/postText", 
      { 
        newText: newPostText, 
        id: id,
      },
      { 
        headers: { accessToken: localStorage.getItem("accessToken")},
      });

      setPostObject({...postObject, postText: newPostText});
    }
  };

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='title' 
        onClick = {()=>{
          if (authState.username === postObject.username){
          editPost("title");
          }
        }}>  {postObject.title}{" "}  </div>

        <div className='postText'
          onClick = {()=>{
            if (authState.username === postObject.username){
            editPost("body");
          }
        }}>   {postObject.postText} </div>
        <div className='footer'>
          {postObject.username}
          <span style={{ marginRight: '290px' }}></span>
          {authState.username === postObject.username && (
            <DeleteForeverRoundedIcon onClick={() => { deletePost(postObject.id);}}> </DeleteForeverRoundedIcon>
            )}
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input type="text" placeholder='Comments...' value={newComment} onChange={(event)=>{setNewComment(event.target.value)}}></input>
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment,key)=>{
            return (
              <div key={key} className='comment'> {comment.commentBody}
              <label> &emsp; &emsp; Username: {comment.username}</label>
              <span style={{ marginRight: '120px' }}></span>
              {authState.username === comment.username && (
                 <DeleteForeverRoundedIcon onClick={() => {deleteComment(comment.id)}}> </DeleteForeverRoundedIcon>
              )}
          </div>
          );
        })}
      </div>
    </div>
  </div>
)}

export default Post;
