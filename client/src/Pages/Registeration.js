// eslint-disable-next-line
import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik"; // helps in making form validation system 
import * as Yup from 'yup';
import axios from 'axios';

function Registeration() {

    const initialvalues={
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const onSubmit= (data) =>{
        axios.post("http://localhost:3001/auth", data).then(()=>{
            console.log(data);
        });
    };

  return ( <div>
        <Formik initialValues={initialvalues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>Username: </label>
            <ErrorMessage name="username" component="span"/>
            <Field id="inputCreatePost" name="username" placeholder="xyz" />

            <label>Password: </label>
            <ErrorMessage name="password" component="span"/>
            <Field id="inputCreatePost" type="password" name="password" placeholder="password" />

            <button type="submit">Register</button>
        </Form>
    </Formik>
  </div>
  );
}

export default Registeration;
