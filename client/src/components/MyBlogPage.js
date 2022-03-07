import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deletePersonalBlog, getBlogsComments, getLikes, getLoginUserDetails, likeBlog, unlikeBlog } from '../actions'
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react'

const MyBlogPage = () => {

    const dispatch = useDispatch();
    const [comment, setComment] = useState("");


    const loginUserBlogs = useSelector(state => state.blogUserReducer.loginUserBlogs)
    const deleteBlog = useSelector(state => state.blogUserReducer.deleteBlog)

    const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    const like = useSelector(state => state.blogUserReducer.like)
    const likeToggle = useSelector(state => state.blogUserReducer.likeToggle)
    const blogComments = useSelector(state => state.blogUserReducer.blogComments)
    const toggle = useSelector(state => state.blogUserReducer.toggle)


    console.log("like", like);

    const loginUserId = loginAuthenticateUser._id
    const loginUserName = loginAuthenticateUser.userName

    const handleLikeBlog = (blogId) => {
        dispatch(likeBlog(blogId, loginUserId, loginUserName))
    }
    const handleUnlikeLikeBlog = (blogId) => {
        dispatch(unlikeBlog(blogId, loginUserId, loginUserName))
    }
    const handleComment = (blogId) => {
        dispatch(addComment(comment, blogId, loginUserId, loginUserName));
    }

    const handleBlogDelete = (id) => {
        dispatch(deletePersonalBlog(id))
    }
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));
    useEffect(() => {
        dispatch(getLoginUserDetails())
        dispatch(getLikes())
        dispatch(getBlogsComments())
    }, [likeToggle])

    useEffect(() => {
        dispatch(getLoginUserDetails())
    }, [deleteBlog])

    return (
        <div className='myBlogMainDiv'>
            <NavLink to="/createBlog"><Button variant="contained" color="error">Create Blog</Button></NavLink>
            <div >
                {
                    loginUserBlogs && loginUserBlogs.map((elem) => {
                        return (
                            <>
                                <div className='myBlogSubDiv'>
                                    <div className="employeeFeild">
                                        <img src={elem.banner} alt='bannerImg' className='articalBannerImg'></img>
                                    </div>
                                    <div className="employeeFeild">
                                        <Chip className='titleBlogDiv' label={elem.title} />
                                    </div>
                                    <div >
                                        <p className='descriptionView'>{elem.description}</p>
                                    </div>
                                    <div className="employeeFeild">
                                        <Chip label={elem.category} variant="outlined" />
                                    </div>
                                    <p>{elem.tags}</p>

                                    <div className='likesView'>
                                        {
                                            elem.likes.includes(loginUserId) ? <div className='likeButton'>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<FavoriteIcon />}
                                                    onClick={() => handleUnlikeLikeBlog(elem._id)}
                                                >
                                                    Unlike
                                                </Button>
                                            </div> : <div className='likeButton'>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<FavoriteBorderIcon />}
                                                    onClick={() => handleLikeBlog(elem._id)}
                                                >
                                                    LIKE
                                                </Button>
                                            </div>
                                        }


                                        {
                                            elem.likes.length > 0 ?
                                                <h5 >{elem.likes.length > 0 ? `${elem.likes.length} Likes` : `${elem.likes.length} Like`}</h5> : null
                                        }
                                        {
                                            elem.likes.length > 0 ?
                                                <HtmlTooltip
                                                    title={
                                                        <React.Fragment>

                                                            <Typography color="inherit">
                                                                {
                                                                    like && like.map(e => {
                                                                        return (
                                                                            <>
                                                                                {
                                                                                    elem.likes.map(like => {
                                                                                        return (
                                                                                            <>
                                                                                                {
                                                                                                    like === e._id ? `${e.userName} ${""} ${","} ${""} ` : null
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                >
                                                    <Button Button > View Likes</Button>

                                                </HtmlTooltip> : null
                                        }
                                    </div>

                                    <div className="AddCommentBox">
                                        <Box
                                            sx={{
                                                width: 400,
                                                maxWidth: '80%',
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Add comment"
                                                id="fullWidth"
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </Box>
                                        <Button
                                            type='submit'
                                            variant="outlined"
                                            color='error'
                                            onClick={() => handleComment(elem._id)}
                                            endIcon={<SendIcon />}
                                        >
                                            POST
                                        </Button>
                                    </div>
                                    <div className='likesView'>
                                        {
                                            blogComments && blogComments.map((like) => {
                                                return (
                                                    <>
                                                        {
                                                            elem._id === like.articleId ?
                                                                (
                                                                    <>
                                                                        <h5 >{like.Users.length > 1 ? `${like.Users.length} Comments` : `${like.Users.length} Comment`}</h5>

                                                                    </>
                                                                ) : null
                                                        }
                                                        {
                                                            elem._id === like.articleId ?
                                                                (
                                                                    <>
                                                                        <HtmlTooltip
                                                                            title={
                                                                                <React.Fragment>

                                                                                    <Typography color="inherit">{
                                                                                        like.Users.map(user => {
                                                                                            return `${user.username} ${user.comment} ${""}`
                                                                                        })
                                                                                    }</Typography>
                                                                                </React.Fragment>
                                                                            }
                                                                        >
                                                                            <Button Button > VIEW COMMENT</Button>

                                                                        </HtmlTooltip>

                                                                    </>

                                                                )
                                                                : null
                                                        }

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='EditDeleteButton'>
                                        <NavLink to={`/editBlog/:?id=${elem._id}`}><Button color="secondary" >Edit </Button></NavLink>
                                        <Button type='submit' color='error' onClick={() => handleBlogDelete(elem._id)}>Delete  </Button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default MyBlogPage