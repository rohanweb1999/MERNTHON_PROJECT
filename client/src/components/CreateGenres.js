import React from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { TextField } from "@material-ui/core";
import { useState } from 'react';
import { addGenres, changePassword, getLoginUserDetails, updateUserProfile } from '../actions';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useEffect } from 'react';
import Box from '@mui/material/Box';

const CreateGenres = () => {





    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(100, 'Title to long it shoud be less then 100 characters')
            .required('Title Required'),
        description: Yup.string()
            .max(255, 'description to long it shoud be less then 255 characters')
            .required('description Required'),
    })

    const initialValues = {
        title: "",
        description: ""
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(addGenres(values))
        }
    });


    return (

        <div className='mainWrapper'>
            <h2>Add Genres</h2>
            <form onSubmit={formik.handleSubmit}>

                <div className='changePassword'>

                    <TextField
                        label="Add title"
                        id='title'
                        variant="standard"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        // value={formik.values.password}
                        {...formik.getFieldProps("title")}

                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.title}
                            </div>
                        </div>
                    ) : null}

                    <div>
                        <TextField
                            id="description"
                            label="Add Description"
                            type="text"
                            name='description'
                            multiline
                            rows={4}
                            {...formik.getFieldProps("description")}

                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error">
                                    {formik.errors.description}
                                </div>
                            </div>
                        ) : null}
                    </div>


                    <div className='postButton'>
                        <Button
                            type='submit'
                            variant="contained" color="success"
                            endIcon={<PublishIcon />} >
                            SUBMIT
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CreateGenres