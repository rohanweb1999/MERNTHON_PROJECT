import React from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from "@material-ui/core";
import { useState } from 'react';
import { changePassword, getLoginUserDetails, updateUserProfile } from '../actions';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useEffect } from 'react';


const ChangePassword = () => {





    const dispatch = useDispatch()
    const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    console.log("loginAuthenticateUser", loginAuthenticateUser);
    const validationSchema = Yup.object().shape({
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
        oldPassword: "",
        password: "",
        confirmPassword: "",
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(changePassword(loginAuthenticateUser._id, values))

        }
    });


    return (

        <div className='mainWrapper'>
            <form onSubmit={formik.handleSubmit}>
                <div className='changePassword'>
                    <TextField
                        label="Enter Old Password"
                        id='oldPassword'
                        variant="standard"
                        name="OldPassword"
                        type="password"
                        onChange={formik.handleChange}
                        // value={formik.values.password}
                        {...formik.getFieldProps("oldPassword")}

                    />

                    <div>
                        <TextField
                            label="Password"
                            id='password'
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
                    </div>
                    <TextField
                        label="Confirm Password"
                        id='confirmPassword'
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

                    <div className='postButton'>
                        <Button
                            type='submit'
                            variant="outlined"
                            color='error'
                            endIcon={<EditIcon />} >
                            CHANGE PASSWORD
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword