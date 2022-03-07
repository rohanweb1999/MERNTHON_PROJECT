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

    const [enable, setEnable] = useState(true);




    const dispatch = useDispatch()
    const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    // console.log("loginAuthenticateUser", loginAuthenticateUser._id);

    const handleChangeEdit = () => {
        setEnable(false)
    }
    const updateProfile = () => {
        setEnable(true)
        dispatch(updateUserProfile(loginAuthenticateUser._id, loginAuthenticateUser.email))

    }
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
            console.log(values);
            dispatch(updateUserProfile(loginAuthenticateUser._id, loginAuthenticateUser.email, values))

        }
    });
    useEffect(() => {
        dispatch(getLoginUserDetails())
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
                        id='firstName'
                        className='firstName'
                        name="firstName"
                        type="text"
                        disabled={enable}
                        {...formik.getFieldProps("firstName")}
                        value={enable === false ? null : loginAuthenticateUser.firstName}
                    />
                    <label>Lastname: -</label>
                    <TextField
                        variant="standard"
                        id='lastName'
                        name="firstName"
                        type="text"
                        disabled={enable}
                        {...formik.getFieldProps("lastName")}

                        value={enable === false ? null : loginAuthenticateUser.lastName}

                    />
                </div>
                <div className='editProfileTextDiv'>
                    <label>Username: -</label>
                    <TextField
                        variant="standard"
                        id='Username'

                        name="firstName"
                        type="text"
                        disabled={true}

                        value={loginAuthenticateUser.userName}
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
                        value={loginAuthenticateUser.email}
                    />
                </div>
                <div className='editProfileTextDiv'>
                    <label>Contact: -</label>
                    <TextField
                        variant="standard"
                        id='contact'
                        name="contact"
                        type="number"
                        disabled={enable}
                        {...formik.getFieldProps("contact")}
                        value={enable === false ? null : loginAuthenticateUser.contact}
                    />
                </div>
                <div className='postButton'>
                    {
                        enable === true ? <Button
                            type='submit'
                            variant="outlined"
                            color='error'
                            onClick={handleChangeEdit}
                            endIcon={<EditIcon />} >
                            EDIT PROFILE
                        </Button> : <Button
                            type='submit'
                            variant="outlined"
                            color='error'
                            onClick={updateProfile}
                            endIcon={<EditIcon />} >
                            UPDATE
                        </Button>
                    }


                </div>
            </form>
        </div>
    )
}

export default ProfilePage