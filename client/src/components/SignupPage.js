/**
 * @author Rohan Gajjar
 */

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module start ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Form } from "antd";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import signupImg from '../assets/signupImage.jpg'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import { checkEmailExists, profileImageUpload, userSignUpData } from "../actions";
import Avatar from '@mui/material/Avatar';
import pimg from '../assets/profile.jpeg'
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module End ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////
toast.configure()

const Input = styled('input')({
    display: 'none',
});
const Signup = () => {
    const [profilePhoto, setProfilePhoto] = useState('');
    const [roll, setRoll] = useState('');

    const validUser = useSelector(state => state.blogUserReducer.validUser)

    const dispatch = useDispatch()
    const history = useHistory()


    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        userName: Yup.string()
            .max(20, 'Must be 18 characters or less')
            .required('Required'),
        contact: Yup.string()
            .required("required")
            .min(10, "to short")
            .max(13, "to long"),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        roll: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 charaters')
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Confirm Password Not Match')
            .required('Confirm password is required'),
    })

    const initialValues = {
        id: new Date().getTime().toString(),
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        roll: ""
    }

    const handleRollChange = (e) => {
        formik.values.roll = e.target.value

    }

    useEffect(() => {
        if (validUser === true) {
            history.push('/signIn')

            dispatch(checkEmailExists())
        }
    }, [validUser])
    //use UseFormik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append('profilePicture', profilePhoto[0])
            dispatch(userSignUpData(values))

            dispatch(profileImageUpload(formData, values.email))
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
                        <strong>SIGN UP</strong>
                    </h2>
                    <div className="profilePictureMainDiv">
                        <Avatar src={"/broken-image.jpg"} className="profilePicture" />
                    </div>
                    <label htmlFor="contained-button-file">
                        Upload Profile Picture
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => setProfilePhoto(e.target.files)} />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>

                    <TextField
                        label="First Name"
                        variant="standard"
                        name="firstName"
                        type="text"

                        {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.firstName}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Last Name"
                        variant="standard"
                        name="lastName"
                        type="text"

                        {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.lastName}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Username"
                        variant="standard"
                        name="userName"
                        type="text"

                        {...formik.getFieldProps("userName")}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.userName}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Contact"
                        variant="standard"
                        name="contact"
                        type="number"

                        {...formik.getFieldProps("contact")}
                    />
                    {formik.touched.contact && formik.errors.contact ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.contact}
                            </div>
                        </div>
                    ) : null}

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
                    <select name="roll"
                        onChange={(e) => handleRollChange(e)}>
                        <option value="">Select Roll</option>
                        <option value="admin">Admin</option>
                        <option value="artist">Artist</option>

                    </select>
                    {formik.touched.roll && formik.errors.roll ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.roll}
                            </div>
                        </div>
                    ) : null}
                    <TextField
                        label="Password"
                        variant="standard"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        // value={formik.values.password}
                        {...formik.getFieldProps("password")}

                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.password}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        {...formik.getFieldProps("confirmPassword")}

                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.confirmPassword}
                            </div>
                        </div>
                    ) : null}
                    <div className="Bottom-class">

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                variant="contained"
                            >
                                SIGN UP
                            </Button>
                        </Form.Item>


                    </div>
                </form>


            </div>
        </>
    );
};

export default Signup;