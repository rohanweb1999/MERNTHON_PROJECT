import React from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from "@material-ui/core";
import { useState } from 'react';
import { getLoginUserDetails, updateUserProfile } from '../actions';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useEffect } from 'react';


const ProfilePage = () => {



    const dispatch = useDispatch()
    const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    console.log("loginAuthenticateUser", loginAuthenticateUser);
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        contact: Yup.string()
            .required("required")
            .min(10, "to short")
            .max(13, "to long"),
    })

    const initialValues = {
        firstName: "",
        lastName: "",
        contact: "",
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(updateUserProfile(loginAuthenticateUser._id, loginAuthenticateUser.email, values))
            dispatch(getLoginUserDetails())

        }
    });
    useEffect(() => {
        formik.setValues(loginAuthenticateUser)
    }, [])
    useEffect(() => {
        // dispatch(getLoginUserDetails())
    }, [])
    return (

        <div className='mainWrapper'>

            <div className='subWrapper'>
                <img alt="Remy Sharp" className='userImg' src={loginAuthenticateUser.profilePhoto ? loginAuthenticateUser.profilePhoto : "/static/images/avatar/2.jpg"} />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='editProfileTextDiv'>
                    <label>Firstname: -</label>
                    <TextField
                        variant="standard"
                        id="firstName"
                        name="firstName"
                        type="text"
                        {...formik.getFieldProps("firstName")}
                    />
                    <label>Lastname: -</label>
                    <TextField
                        variant="standard"
                        id='lastName'
                        name="firstName"
                        type="text"
                        disabled={false}
                        {...formik.getFieldProps("lastName")}

                    />
                </div>
                <div className='editProfileTextDiv'>
                    <label>Username: -</label>
                    <TextField
                        variant="standard"
                        id='Username'
                        name="userName"
                        type="text"
                        disabled={true}
                        {...formik.getFieldProps("userName")}

                    />
                </div>
                <div className='editProfileTextDiv'>
                    <label>Email: -</label>
                    <TextField
                        variant="standard"
                        id='email'
                        name="email"
                        type="text"
                        disabled={true}
                        {...formik.getFieldProps("email")}

                    />
                </div>
                <div className='editProfileTextDiv'>
                    <label>Contact: -</label>
                    <TextField
                        variant="standard"
                        id='contact'
                        name="contact"
                        type="number"
                        disabled={false}
                        {...formik.getFieldProps("contact")}
                    />
                </div>
                <div className='postButton'>
                    <Button
                        type='submit'
                        variant="outlined"
                        color='error'
                        endIcon={<EditIcon />} >
                        EDIT PROFILE
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage