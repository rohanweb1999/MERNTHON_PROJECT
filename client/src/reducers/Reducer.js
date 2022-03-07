import { ADD_COMMENT, CHECK_EMAIL_EXIST, CREATE_BLOCK, CREATE_BLOG, DELETE_PERSONAL_BLOG, EDIT_AND_UPDATE_PERSONAL_BLOG, GET_BLOGS_COMMENTS, GET_LIKES, GET_LOGIN_USER_DETAILS, GET_PUBLIC_BLOGS, GET_SEARCH_BLOGS, LIKE_BLOG, LOADER, LOGIN_USER, LOGOUT_USER, SEARCH_VALUE, SIGNUP_USER_DATA, UNLIKE_BLOG, UPLOAD_ARTICAL_BANNER } from "../actions/Type";

/**
 * @author Rohan Gajjar
 */
const initialState = {
    loginAuthenticateUser: "",
    loginStatus: true,
    deleteBlog: false,
    validUser: false,
    loader: false,
    loginUserBlogs: [],
    publicBlogs: [],
    Banner: [],
    like: [],
    page: [],
    blogComments: [],
    likeToggle: false,
    toggle: false,
    search: "",

}

const blogUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case SIGNUP_USER_DATA:
            return {
                ...state,
                validUser: true
            }
        case CHECK_EMAIL_EXIST:
            return {
                ...state,
                validUser: false
            }
        case LOGIN_USER:
            return {
                ...state,
                loginStatus: false
            }
        case LOGOUT_USER:
            return {
                ...state,
                loginStatus: true,
                loginAuthenticateUser: ""
            }
        case GET_LOGIN_USER_DETAILS:
            return {
                ...state,
                loginStatus: false,
                toggle: false,
                loginAuthenticateUser: action.payload.LoginUser,
                loginUserBlogs: action.payload.LoginUserBlogs,
                deleteBlog: false,
                Banner: [],

            }
        case GET_PUBLIC_BLOGS:
            return {
                ...state,
                loginStatus: false,
                toggle: false,
                publicBlogs: action.payload
            }
        case DELETE_PERSONAL_BLOG:
            return {
                ...state,
                deleteBlog: true
            }
        case UPLOAD_ARTICAL_BANNER:
            return {
                ...state,
                Banner: action.payload
            }
        case EDIT_AND_UPDATE_PERSONAL_BLOG:
            return {
                ...state,
                loader: false,
                toggle: true,

            }
        case LIKE_BLOG: {
            return {
                ...state,
                likeToggle: true
            }
        }
        case UNLIKE_BLOG: {
            return {
                ...state,
                likeToggle: true
            }
        }
        case GET_LIKES: {

            return {
                ...state,
                toggle: false,
                like: action.payload,
                likeToggle: false
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                likeToggle: true
            }
        }
        case GET_BLOGS_COMMENTS: {
            return {
                ...state,
                likeToggle: false,
                toggle: false,
                blogComments: action.payload
            }
        }
        case GET_SEARCH_BLOGS: {
            return {
                ...state,
                toggle: false,
                publicBlogs: action.payload
            }
        }
        case LOADER: {
            return {
                ...state,
                loader: true

            }
        }
        case CREATE_BLOG: {
            return {
                ...state,
                loader: false,
                toggle: true,

            }
        }
        case SEARCH_VALUE: {
            return {
                ...state,
                search: action.payload

            }
        }
        default:
            return state;
    }
}

export default blogUserReducer;