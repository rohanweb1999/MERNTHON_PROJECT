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
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import bg from '../assets/bg.jpg'
import PublishIcon from '@mui/icons-material/Publish';
import { uploadAudioFile, uploadCoverImg, uploadNFT } from "../actions";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module End ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////
toast.configure()

const Input = styled('input')({
    display: 'none',
});
const CreateNft = () => {
    const [coverImage, setcoverImage] = useState('');
    const [audio, setAudio] = useState('');
    const [values, setValues] = useState('');


    const dispatch = useDispatch()
    const history = useHistory()

    const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    const AudioFile = useSelector(state => state.blogUserReducer.AudioFile)
    const CoverImg = useSelector(state => state.blogUserReducer.CoverImg)
    const loader = useSelector(state => state.blogUserReducer.loader)
    const toggle = useSelector(state => state.blogUserReducer.toggle)

    console.log("audio", audio);
    console.log("values", values);

    console.log("coverImage", coverImage);


    const userId = loginAuthenticateUser._id
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        description: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required'),
        price: Yup.string()
            .required('Required'),
    })

    const initialValues = {
        title: "",
        description: "",
        price: ""
    }


    //use UseFormik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('audio', audio[0]);
            setValues(values);
            // dispatch(loading());
            dispatch(uploadAudioFile(formData));

        }
    });

    useEffect(() => {
        if (AudioFile.length !== 0) {
            console.log("run");
            const formData = new FormData();
            formData.append('image', coverImage[0]);
            dispatch(uploadCoverImg(formData));
        }
    }, [AudioFile]);

    useEffect(() => {
        if (AudioFile.length !== 0 && CoverImg.length !== 0) {
            dispatch(uploadNFT(userId, values, AudioFile, CoverImg));
            setValues('')
        }
    }, [AudioFile, CoverImg]);
    useEffect(() => {
        if (toggle === true) {
            history.push('/genres');
        }
    }, [toggle]);
    return (
        <>
            <div>
                <img className='signupImg' src={bg} alt='jpg'></img>
            </div>
            {
                loader ? (
                    <>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </>
                ) : null
            }
            <div className="loginBox">

                <form className="signupUser" onSubmit={formik.handleSubmit}>
                    <h2>
                        <strong>CREATE NFT</strong>
                    </h2>
                    <TextField
                        label="Title"
                        variant="standard"
                        name="title"
                        type="text"

                        {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.title}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Description"
                        variant="standard"
                        name="description"
                        type="text"

                        {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.description}
                            </div>
                        </div>
                    ) : null}
                    <div>
                        <label htmlFor="contained-button-file">
                            Upload Cover Picture
                            <input name="coverImg" type="file" placeholder="coverImg" onChange={(e) => setcoverImage(e.target.files)} />
                        </label>

                    </div>
                    <label htmlFor="contained-button-file">
                        Upload Audio File
                        <input name="audioFile" type="file" placeholder="audioFile" onChange={(e) => setAudio(e.target.files)} />
                    </label>

                    <TextField
                        label="Enter Price"
                        variant="standard"
                        name="price"
                        type="Number"

                        {...formik.getFieldProps("price")}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.price}
                            </div>
                        </div>
                    ) : null}
                    <div className="Bottom-class">
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type='submit'
                                variant="contained" color="success"
                                disabled={loader}

                                endIcon={<PublishIcon />} >
                                PUBLISH
                            </Button>
                        </Form.Item>
                    </div>
                </form>


            </div>
        </>
    );
};

export default CreateNft;