import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage'
import SigninPage from './components/SigninPage'
import ProtectedRoute from './components/ProtectedRoute'
import CreateBlogPage from './components/CreateBlogPage'
import MyBlogPage from './components/MyBlogPage'
import Cookies from 'js-cookie'
import ArticalsPage from './components/ArticalsPage'
import PageNotFound from './components/PageNotFound'
import ProfilePage from './components/ProfilePage'
import ChangePassword from './components/ChangePassword'
import {
  Route,
  Switch,
  Redirect

} from "react-router-dom";
import { useSelector } from 'react-redux'



const App = () => {
  const cookie = Cookies.get('jwt')

  const loginStatus = useSelector(state => state.blogUserReducer.loginStatus)
  const toggle = useSelector(state => state.blogUserReducer.toggle)


  console.log("toggle", toggle);
  return (
    <div>
      <Navbar />

      <Switch>
        <ProtectedRoute exact path='/editBlog/:id' component={CreateBlogPage} authStatus={cookie} />
        <Route exact path='/' component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <ProtectedRoute exact path="/articals" component={ArticalsPage} authStatus={cookie} />
        <ProtectedRoute exact path="/createBlog" component={CreateBlogPage} authStatus={cookie} />
        <ProtectedRoute exact path="/myBlogs" component={MyBlogPage} authStatus={cookie} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} authStatus={cookie} />
        <ProtectedRoute exact path="/changepwd" component={ChangePassword} authStatus={cookie} />


        {
          cookie === undefined || loginStatus === true ? (
            <>
              <Route exact path='/signIn' component={SigninPage} />

            </>
          ) : <Redirect to='/articals' />
        }

        <Route path="*" component={PageNotFound}></Route>

      </Switch>

    </div>
  )
}

export default App