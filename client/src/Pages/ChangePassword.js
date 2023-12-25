// eslint-disable-next-line
import React, {useState} from 'react';
import axios from 'axios';

function ChangePassword() {
const [oldPassword, setOldPassword]= useState("");
const [newPassword, setNewPassword]= useState("");

const changePassword = () =>{
    axios.put("http://localhost:3001/auth/changepassword", {oldPassword: oldPassword, newPassword: newPassword},
    {
        headers: { accessToken: localStorage.getItem("accessToken")},
    }
    ).then((response)=>{
        if(response.data.error){
            alert(response.data.error);
        }
    });
};

  return (

    <div className='post'>
        <div className='title'> 
            <h3>Change your Password</h3>
        </div>
        <div className='body'>
            <input type="text" placeholder='Old password' onChange={(event)=>{ setOldPassword(event.target.value)}}/>
            <input type="text" placeholder='New password' onChange={(event)=>{ setNewPassword(event.target.value)}}/> 
        </div>
        
        <div className='footer'>
            <button onClick={changePassword}>Save Changes</button>
        </div> 

    </div>
  );
}

export default ChangePassword;
