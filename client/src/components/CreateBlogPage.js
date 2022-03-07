import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog, editAndUpdatePersonalBlog, uploadArticalBanner } from '../actions';
import SendIcon from '@mui/icons-material/Send';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Checkbox from './Checkbox';


const CreateBlogPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = queryString.parse(window.location.search)

    const [banner, setBanner] = useState('');
    const [article, setArticle] = useState('');
    const [EditBlogDetails, setEditBlogDetails] = useState([]);
    const [allTags, setAllTags] = useState([]);

    const loginUserBlogs = useSelector(state => state.blogUserReducer.loginUserBlogs)
    // const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    const Banner = useSelector(state => state.blogUserReducer.Banner)
    const loader = useSelector(state => state.blogUserReducer.loader)
    const toggle = useSelector(state => state.blogUserReducer.toggle)

    console.log("allTags", allTags);

    const formik = useFormik({
        initialValues: {
            title: "", description: "", category: "", tags: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .min(3, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            description: Yup.string()
                .min(10, 'Too Short!')
                .max(300, 'Too Long!')
                .required('Required'),
            category: Yup.string().required('Required'),
            tags: Yup.string()
                .min(3, 'Too Short!')
                .max(300, 'Too Long!')
                .required('Required'),
        }),
        onSubmit: (values) => {
            if (id) {
                const formData = new FormData();
                formData.append('ArticalBanner', banner[0]);
                dispatch(uploadArticalBanner(formData))
                setArticle(values)

            } else {
                const formData = new FormData();
                formData.append('ArticalBanner', banner[0])
                dispatch(uploadArticalBanner(formData))
                setArticle(values)
            }

        }
    })

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setAllTags([...allTags, id]);
        if (!checked) {
            setAllTags(allTags.filter((item) => item !== id));
        }
    };
    useEffect(() => {
        if (id) {
            const blogData = loginUserBlogs.find((ele) => ele._id === id ? ele : null);
            setEditBlogDetails(blogData);
        }
    }, [id]);

    useEffect(() => {
        if (id && EditBlogDetails) {
            formik.setValues(EditBlogDetails)
        }
    }, [EditBlogDetails])

    useEffect(() => {
        if (Banner.length !== 0 && !id) {
            dispatch(addNewBlog(article, Banner, allTags));
            setArticle('')

        }
        else if (Banner.length !== 0 && id) {
            dispatch(editAndUpdatePersonalBlog(id, article, Banner, allTags));
            setArticle('')

        }
    }, [Banner])
    useEffect(() => {
        if (toggle === true) {
            history.push('/myBlogs');
        }
    }, [toggle]);
    return (
        <div>
            {
                loader ? (
                    <>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </>
                ) : null
            }
            <form class="login-form" onSubmit={formik.handleSubmit}>
                <div className='mainWrapper'>

                    <div className='subWrapper'>
                        <label>Title:-</label>
                        <input
                            name='title'
                            type='text'
                            placeholder='Add title'
                            className='title'
                            {...formik.getFieldProps("title")}
                            value={formik.values.title}>
                        </input>

                        {formik.errors.title && formik.touched.title ? (
                            <div className="error">{formik.errors.title}</div>
                        ) : null}
                    </div>

                    <div className='subWrapper'>
                        <label>Artical Banner:-</label>
                        <input
                            type='file'
                            accept="image/*"
                            onChange={(e) => setBanner(e.target.files)}
                        >
                        </input>
                    </div>
                    <div className="employeeFeild">
                        <img src={EditBlogDetails.banner} alt='bannerImg' className='articalBannerImg'></img>
                    </div>
                    <div className='subWrapper'>
                        <label>Description:-</label>
                        <textarea
                            type='text'
                            name='description'
                            placeholder='Add Description'
                            className='Description'
                            {...formik.getFieldProps("description")}
                            value={formik.values.description}>
                        </textarea>
                        {formik.errors.description && formik.touched.description ? (
                            <div className="error">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <div className='subWrapper'>
                        <label>Blog category:-</label>
                        <select className='title' {...formik.getFieldProps("category")} value={formik.values.category} name="category">
                            <option value="">Select</option>
                            <option value="Personal">Personal</option>
                            <option value="Business/corporate">Business/corporate</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Affiliate/review">Affiliate/review</option>
                            <option value="Multimedia">Multimedia</option>
                            <option value="News">News</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                        </select>
                        {formik.errors.category && formik.touched.category ? (
                            <div className="error">{formik.errors.category}</div>
                        ) : null}
                    </div>
                    <div className="checkBox" >
                        <div className="checkBoxsubDiv">
                            <Checkbox
                                type='checkbox'
                                id={'#foodie'}
                                handleClick={handleClick}
                                isChecked={allTags.includes('#foodie')} />
                            <label>#foodie</label>
                        </div>
                        <div className="checkBoxsubDiv">
                            <Checkbox
                                type='checkbox'
                                id={'#photography'}
                                handleClick={handleClick}
                                isChecked={allTags.includes('#photography')} />
                            <label>#photography </label>

                        </div >
                        <div className="checkBoxsubDiv">
                            <Checkbox
                                type='checkbox'
                                id={'#fashion'}
                                handleClick={handleClick}
                                isChecked={allTags.includes('#fashion')} />
                            <label>#fashion</label>

                        </div>
                        <div className="checkBoxsubDiv">
                            <Checkbox
                                type='checkbox'
                                id={'#style'}
                                handleClick={handleClick}
                                isChecked={allTags.includes('#style')} />
                            <label>#style</label>

                        </div>
                        <div className="checkBoxsubDiv">
                            <Checkbox
                                type='checkbox'
                                id={'#bloggerstyle'}
                                handleClick={handleClick}
                                isChecked={allTags.includes('#bloggerstyle')} />
                            <label>#bloggerstyle </label>

                        </div>


                    </div>
                    <label>#Tags:-</label>
                    <input
                        type='text'
                        className='tags'
                        {...formik.getFieldProps("tags")}
                        value={formik.values.tags}
                        name="tags">
                    </input>
                    {formik.errors.tags && formik.touched.tags ? (
                        <div className="error">{formik.errors.tags}</div>
                    ) : null}
                    {
                        id ? (<div className='postButton'>
                            <Button
                                type='submit'
                                variant="outlined"
                                color='error'
                                disabled={loader}
                                endIcon={<SendIcon />} >
                                UPDATE
                            </Button>

                        </div>)
                            : (<div className='postButton'>
                                <Button
                                    type='submit'
                                    variant="outlined"
                                    color='error'
                                    disabled={loader}

                                    endIcon={<SendIcon />} >
                                    POST
                                </Button>
                            </div>)
                    }

                </div>
            </form>
        </div>
    )
}

export default CreateBlogPage