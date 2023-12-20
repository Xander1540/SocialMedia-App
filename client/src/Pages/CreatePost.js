// eslint-disable-next-line
import React, {useContext, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";  
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
    
  const initialvalues={ 
    title: "",
    postText: "",
    username: "",
    };
 
    useEffect(()=>{
      if (!authState.status){
        navigate('/login');
      }
    });

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    })

    const onSubmit=  (data)=>{
        axios.post("http://localhost:3001/posts", data).then((response)=>{
        navigate("/");
      });
    };

  return (
    <div className="createPostPage">
      <Formik initialValues={initialvalues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>Title: </label>
            <ErrorMessage name="title" component="span"/>
            <Field id="inputCreatePost" name="title" placeholder="Ex. Xander"/>
            <label>Post: </label>
            <ErrorMessage name="postText" component="span"/>
            <Field id="inputCreatePost" name="postText" placeholder="Enter your text here." />
            <label>Username: </label>
            <ErrorMessage name="username" component="span"/>
            <Field id="inputCreatePost" name="username" placeholder="xyz" />
            <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
