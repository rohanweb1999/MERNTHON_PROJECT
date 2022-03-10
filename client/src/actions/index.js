/**
 * @author Rohan Gajjar
 */
////////////////    start load Modules //////////////////////////////////////
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators } from 'redux';
import { ADD_COMMENT, ADD_GENRES, CHANGE_PASSWORD, CHECK_EMAIL_EXIST, CREATE_BLOCK, CREATE_BLOG, DELETE_GENRES, DELETE_PERSONAL_BLOG, EDIT_AND_UPDATE_PERSONAL_BLOG, GET_ARTIST, GET_ARTIST_AND_GENRES_COUNT, GET_BLOGS_COMMENTS, GET_GENRES, GET_LIKES, GET_LOGIN_USER_DETAILS, GET_NFT, GET_PUBLIC_BLOGS, GET_SEARCH_BLOGS, LIKE_BLOG, LOADER, LOGIN_USER, LOGOUT_USER, SEARCH_VALUE, SIGNUP_USER_DATA, UNLIKE_BLOG, UPDATE_GENRES, UPDATE_USER_PROFILE, UPLOAD_ARTICAL_BANNER, UPLOAD_AUDIO_COVERIMAGE, UPLOAD_AUDIO_FILE, UPLOAD_NFT, UPLOAD_PROFILE_PICTURE } from './Type';
toast.configure()
///////////////////// load modules end ///////////////////////////////////////


export const userSignUpData = (userData, genres) => {
    return (dispatch) => {
        Axios.post('/signUp', { userData, genres })
            .then((res) => {
                const result = res.data
                toast.success(result, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch({ type: SIGNUP_USER_DATA })
            })
            .catch(err => {
                toast.error("Invalid Registration", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            })
    }
}

export const userLogin = (data) => {
    return (dispatch) => {
        Axios.post(`/signIn`, data)
            .then((res) => {
                toast.success('Login successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                dispatch({ type: LOGIN_USER })
            })
            .catch(err => {
                toast.error('Invalid Password or Email', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            })
    }
}

export const updateUserProfile = (id, email, data) => {
    console.log("data", data);
    return (
        (dispatch) => {
            Axios.put(`/updateUser/${id}/${email}`, data)
                .then((res) => {
                    toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                    dispatch({ type: UPDATE_USER_PROFILE })
                })
                .catch(err => {

                })
        }
    )
}

export const changePassword = (id, values) => {
    return (dispatch) => {
        Axios.put(`/changePassword/${id}`, values)
            .then((res) => {
                toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch({ type: CHANGE_PASSWORD })
            })
            .catch(error => {
                toast.error("Old Password did not match", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            })
    }
}
export const addGenres = (genresData) => {
    return (dispatch) => {
        Axios.post('/addGenres', genresData)
            .then((res) => {
                const result = res.data
                toast.success(result, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch({ type: ADD_GENRES })
            })
            .catch(err => {
                toast.error("Failed", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            })
    }
}
export const getGenres = (pageNumber, search) => {
    return (dispatch) => {
        Axios.get(`/getGenres/?Page=${pageNumber}&&Request=${search}`)
            .then((res) => {

                dispatch({ type: GET_GENRES, payload: res.data })
            })
            .catch(err => {
                toast.error("Failed", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            })
    }
}
export const deleteGenres = (id) => {
    return (
        (dispatch) => {
            if (window.confirm("Are you Sure delete this Genres")) {
                Axios.delete(`/deleteGenres/${id}`)
                    .then((res) => {
                        toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                        dispatch({ type: DELETE_GENRES })
                    })
                    .catch(err => {
                    });
            }

        }
    )
}
export const updateGenres = (id, data) => {
    return (
        (dispatch) => {
            Axios.put(`/updateGenres/${id}`, data)
                .then((res) => {
                    toast.success("Genres Update Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

                    dispatch({ type: UPDATE_GENRES })
                })
                .catch(err => {

                })
        }
    )
}

export const getArtistList = (pageNumber, search) => {
    return (dispatch) => {
        Axios.get(`/getArtistList/?Page=${pageNumber}&&Request=${search}`)
            .then((res) => {

                dispatch({ type: GET_ARTIST, payload: res.data })
            })
            .catch(err => {
                toast.error("Failed", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            })
    }
}

export const uploadCoverImg = (values) => {

    return (dispatch) => {

        Axios.post(`/uploadImg`, values)
            .then((res) => {
                dispatch({ type: UPLOAD_AUDIO_COVERIMAGE, payload: res.data })
            })
            .catch(error => {

                toast.error("File Is Not An Image file!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

            })
    }
}


export const uploadAudioFile = (values) => {

    return (dispatch) => {
        dispatch({ type: LOADER })

        Axios.post(`/uploadAudioFile`, values)
            .then((res) => {
                dispatch({ type: UPLOAD_AUDIO_FILE, payload: res.data })
            })
            .catch(err => {
                toast.error("File Is Not An Audio file!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

            })
    }
}

export const uploadNFT = (userId, values, AudioFile, CoverImg) => {

    return (dispatch) => {

        Axios.post(`/uploadNFT/?Id=${userId}`, { values, AudioFile, CoverImg })
            .then((res) => {
                toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch({ type: UPLOAD_NFT })
            })
            .catch(err => {

                toast.error("Nft Title Is Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

            })
    }
}

export const getNFT = () => {

    return (dispatch) => {
        Axios.get(`/getNFT`)
            .then((res) => {
                dispatch({ type: GET_NFT, payload: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getArtistAndGenresCount = () => {

    return (dispatch) => {
        Axios.get(`/getArtistAndGenresCount`)
            .then((res) => {
                dispatch({ type: GET_ARTIST_AND_GENRES_COUNT, payload: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const profileImageUpload = (profilePicture, email) => {
    return (
        (dispatch) => {
            Axios.post(`/uploadProfilePicture/${email}`, profilePicture)
                .then((res) => {
                    dispatch({ type: UPLOAD_PROFILE_PICTURE })
                })
                .catch(err => {
                });
        }
    )
}
export const userLogout = () => {
    return (
        (dispatch) => {
            Axios.get(`/logout`)
                .then(() => {
                    toast.info('Logout', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                    dispatch({ type: LOGOUT_USER })
                })
                .catch(err => {
                });
        }
    )
}
export const getLoginUserDetails = () => {
    return (
        (dispatch) => {
            Axios.get(`/getLoginUserDetails`)
                .then((res) => {
                    dispatch({ type: GET_LOGIN_USER_DETAILS, payload: res.data })
                })
                .catch(err => {
                });
        }
    )
}
export const getPublicBlogs = (SearchValue) => {
    return (
        (dispatch) => {
            Axios.put(`/getSearchBlogs`, { SearchValue })
                .then((res) => {

                    dispatch({ type: GET_PUBLIC_BLOGS, payload: res.data })
                })
                .catch(err => {
                });
        }
    )
}
export const searchValue = (value) => {
    return (
        (dispatch) => {
            dispatch({ type: SEARCH_VALUE, payload: value })
        }
    )
}
export const addNewBlog = (values, Banner, allTags) => {

    return (
        (dispatch) => {
            dispatch({ type: LOADER })
            Axios.post(`/addNewBlog`, { values, Banner, allTags })
                .then(() => {
                    toast.success("Blog Post Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                    dispatch({ type: CREATE_BLOG })
                })
                .catch(err => {
                });
        }
    )
}
export const uploadArticalBanner = (articalBanner) => {
    return (
        (dispatch) => {
            dispatch({ type: LOADER })

            Axios.post(`/uploadArticalBanner`, articalBanner)
                .then((res) => {
                    dispatch({ type: UPLOAD_ARTICAL_BANNER, payload: res.data })

                })
                .catch(err => {
                });
        }
    )
}

export const deletePersonalBlog = (id) => {
    return (
        (dispatch) => {
            if (window.confirm("Are you Sure delete this blog")) {
                Axios.delete(`/deletePersonalBlog/${id}`)
                    .then((res) => {
                        toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                        dispatch({ type: DELETE_PERSONAL_BLOG })
                    })
                    .catch(err => {
                    });
            }

        }
    )
}

export const editAndUpdatePersonalBlog = (id, values, Banner) => {
    return (
        (dispatch) => {
            dispatch({ type: LOADER })

            Axios.put(`/editAndUpdatePersonalBlog/?id=${id}`, { values, Banner })
                .then((res) => {
                    toast.success("Blog Update Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                    dispatch({ type: EDIT_AND_UPDATE_PERSONAL_BLOG })
                })
                .catch(err => {
                    toast.error("Some thing went wrong failed to update Profile!!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                });


        }
    )
}


export const checkEmailExists = () => {
    return (
        (dispatch) => {
            dispatch({ type: CHECK_EMAIL_EXIST })
        }
    )
}
export const likeBlog = (articleId, userId, username) => {

    return (dispatch) => {
        Axios.put(`/likeBlog/${articleId}`, { userId, username })
            .then((res) => {

                dispatch({ type: LIKE_BLOG });
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const unlikeBlog = (articleId, userId, username) => {

    return (dispatch) => {
        Axios.put(`/unlikeBlog/${articleId}`, { userId, username })
            .then((res) => {

                dispatch({ type: UNLIKE_BLOG });
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const getLikes = () => {

    return (dispatch) => {
        Axios.get(`/getLikes`)
            .then((res) => {
                dispatch({ type: GET_LIKES, payload: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const addComment = (comment, blogId, userId, username) => {

    return (dispatch) => {
        Axios.post(`/addComment/${blogId}`, { comment, userId, username })
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

}
export const getBlogsComments = () => {

    return (dispatch) => {
        Axios.get(`/getComments`)
            .then((res) => {
                dispatch({ type: GET_BLOGS_COMMENTS, payload: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }
}



export const getSearchBlogs = (SearchValue) => {

    return (dispatch) => {
        Axios.put(`/getSearchBlogs`, { SearchValue })
            .then((res) => {
                console.log("res.data", res.data);
                dispatch({ type: GET_SEARCH_BLOGS, payload: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }
}  