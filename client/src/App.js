
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './Pages/Home';
import CreatePost from "./Pages/CreatePost";
import Post from "./Pages/Post";
import Registration from "./Pages/Registeration"
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import {AuthContext} from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

function App() {
  const [authState, setAuthState]=  useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(()=>{
    axios.get('http://localhost:3001/auth/auth', {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response)=>{
       if (response.data.error){
        setAuthState({ ...authState, status: false });
       }else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        }
    });
  });

  const logout = () =>{
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
      <div className='navbar'>
        <div className='links'>
        <Link to="/"><HomeRoundedIcon/></Link>
        <Link to="/createpost">Create Post </Link>
        {!authState.status && (
        <>
        <Link to="/login">Login </Link>
        <Link to="/registration">Register </Link>
        </>
        )}
      </div>
          <div className="loggedInContainer">
          <h1>{authState.username} </h1>
          {authState.status && <button onClick={logout}> Logout</button>}
          </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element ={<PageNotFound/>} />
      </Routes>
    </Router>
    </AuthContext.Provider>
  </div>
  );
}

export default App;
