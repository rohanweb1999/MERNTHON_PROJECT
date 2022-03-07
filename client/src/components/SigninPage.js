/**
 * @author Rohan Gajjar
 */

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module start ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { TextField } from "@material-ui/core";
import { Form } from "antd";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import signupImg from '../assets/login.jpg'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { userLogin } from "../actions";



/////////////////////////////////////////////////////////////////////////////////////
/******************Load module End ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////
toast.configure()


const SigninPage = () => {
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({

        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 charaters')
            .required('Password is required'),
    })

    const initialValues = {
        email: "",
        password: "",

    }
    //use UseFormik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(userLogin(values))
        }
    });
    return (
        <>
            <div>
                <img className='signupImg' src={signupImg} alt='jpg'></img>

            </div>
            <div className="loginBox">

                <form className="signupUser" onSubmit={formik.handleSubmit}>
                    <h2>
                        <strong>SIGN IN</strong>
                    </h2>

                    <TextField
                        label="Email"
                        variant="standard"
                        name="email"
                        type="email"

                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.email}
                            </div>
                        </div>
                    ) : null}


                    {formik.touched.contact && formik.errors.contact ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.contact}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Password"
                        variant="standard"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        {...formik.getFieldProps("password")}

                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.password}
                            </div>
                        </div>
                    ) : null}


                    <div className="Bottom-class">
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                variant="contained"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </div>
                </form>
                <div className="last-div">
                    <Link to='/signup'>I haven't account</Link>
                </div>
                <br></br>
            </div>
        </>
    );
};

export default SigninPage;