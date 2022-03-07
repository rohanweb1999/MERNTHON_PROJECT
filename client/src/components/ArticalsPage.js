import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getBlogsComments, getLikes, getLoginUserDetails, getPublicBlogs, getSearchBlogs, likeBlog, unlikeBlog } from '../actions';
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';




const ArticalsPage = () => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");


    const publicBlogs = useSelector(state => state.blogUserReducer.publicBlogs)
    const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)
    const like = useSelector(state => state.blogUserReducer.like)
    const likeToggle = useSelector(state => state.blogUserReducer.likeToggle)
    const blogComments = useSelector(state => state.blogUserReducer.blogComments)
    const search = useSelector(state => state.blogUserReducer.search)

    const loginUserId = loginAuthenticateUser._id
    const loginUserName = loginAuthenticateUser.userName


    const handleLikeBlog = (blogId) => {
        dispatch(likeBlog(blogId, loginUserId, loginUserName))
    }
    const handleUnlikeLikeBlog = (blogId) => {
        dispatch(unlikeBlog(blogId, loginUserId, loginUserName))
    }
    const handleChangeComment = (e) => {
        setComment(e.target.value)

    }
    const handleComment = (blogId) => {
        dispatch(addComment(comment, blogId, loginUserId, loginUserName));
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
        dispatch(getPublicBlogs(search))
        dispatch(getLoginUserDetails())
        dispatch(getLikes())
        dispatch(getBlogsComments())
    }, [likeToggle, dispatch, search])
    return (
        <>
            <div >
                {
                    publicBlogs && publicBlogs.map((elem) => {
                        return (
                            <>
                                {
                                    elem._id !== loginUserId ? (
                                        <>
                                            <div className='myBlogSubDiv'>
                                                <div className="employeeFeild">
                                                    <img src={elem.Articles.banner} alt='bannerImg' className='articalBannerImg'></img>
                                                </div>
                                                <div className="employeeFeild">
                                                    <Chip className='titleBlogDiv' label={elem.Articles.title} />
                                                </div>
                                                <label>CREATED BY</label>
                                                <Chip className='titleBlogDiv' label={elem.userName} />
                                                <div >
                                                    <p className='descriptionView'>{elem.Articles.description}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <Chip label={"Category-" + elem.Articles.category} variant="outlined" />
                                                </div>
                                                <p>{elem.Articles.tags}</p>
                                                <div className='likesView'>
                                                    {
                                                        elem.Articles.likes.includes(loginUserId) ? <div className='likeButton'>
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<FavoriteIcon />}
                                                                onClick={() => handleUnlikeLikeBlog(elem.Articles._id)}
                                                            >
                                                                Unlike
                                                            </Button>
                                                        </div> : <div className='likeButton'>
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<FavoriteBorderIcon />}
                                                                onClick={() => handleLikeBlog(elem.Articles._id)}
                                                            >
                                                                LIKE
                                                            </Button>
                                                        </div>
                                                    }
                                                    {
                                                        elem.Articles.likes.length > 0 ?
                                                            <h5 >{elem.Articles.length > 0 ? `${elem.Articles.likes.length} Likes` : `${elem.Articles.likes.length} Like`}</h5> : null
                                                    }


                                                    {
                                                        elem.Articles.likes.length > 0 ?
                                                            <HtmlTooltip
                                                                title={
                                                                    <React.Fragment>

                                                                        <Typography color="inherit">
                                                                            {
                                                                                like && like.map(e => {
                                                                                    return (
                                                                                        <>
                                                                                            {
                                                                                                elem.Articles.likes.map(like => {
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
                                                            onChange={(e) => handleChangeComment(e)} />
                                                    </Box>
                                                    <Button
                                                        type='submit'
                                                        variant="outlined"
                                                        color='error'
                                                        onClick={() => handleComment(elem.Articles._id)}
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
                                                                        elem.Articles._id === like.articleId ?
                                                                            (
                                                                                <>
                                                                                    <h5 >{like.Users.length > 1 ? `${like.Users.length} Comments` : `${like.Users.length} Comment`}</h5>
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
                                                                            ) : null
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>


                                            </div>
                                        </>) : null
                                }

                            </>
                        )
                    })
                }





            </div>
        </>
    )
}

export default ArticalsPage