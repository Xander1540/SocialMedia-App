// eslint-disable-next-line
import React, { useEffect, useState, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";


function Profile() {
  let {id}= useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts]= useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(()=>{ 
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response)=>{
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((reponse)=>{
      setListOfPosts(reponse.data);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className="profilePageContainer"> 
      <div className='basicInfo'> {" "}<h1>Username: { username } </h1>
        {authState.username === username && (
          <button 
            onClick={()=>{
              navigate('/changepassword');
            }}> {" "} Change Password</button>
        )}
      </div>
      <div className='listOfPosts'>
      {listOfPosts.map((value, key) =>{
       return (
       <div key ={key} className='post'>
         <div className='title'> {value.title} </div>
         <div className='body'onClick={()=>{navigate(`/post/${value.id}`);}}> {value.postText} </div>
         <div className='footer'> {value.username} <span style={{ marginRight: '240px' }}></span>
          <label> {value.Likes.length}</label>
          </div>
        </div>
       ); 
    })}
      </div>
    </div>
  )
}

export default Profile;
