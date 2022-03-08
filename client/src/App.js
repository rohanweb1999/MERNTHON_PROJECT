import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage'
import SigninPage from './components/SigninPage'
import ProtectedRoute from './components/ProtectedRoute'
import Cookies from 'js-cookie'
import PageNotFound from './components/PageNotFound'
import ProfilePage from './components/ProfilePage'
import ChangePassword from './components/ChangePassword'
import ListGenres from './components/AdminListGenres'
import CreateGenres from './components/CreateGenres'
import {
  Route,
  Switch,
  Redirect

} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLoginUserDetails } from './actions'



const App = () => {
  const cookie = Cookies.get('jwt')
  const dispatch = useDispatch()
  const loginAuthenticateUser = useSelector(state => state.blogUserReducer.loginAuthenticateUser)

  const loginStatus = useSelector(state => state.blogUserReducer.loginStatus)
  const toggle = useSelector(state => state.blogUserReducer.toggle)


  console.log("toggle", toggle);
  useEffect(() => {

    dispatch(getLoginUserDetails())
  }, [loginStatus])
  return (
    <div>
      <Navbar />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} authStatus={cookie} />
        <ProtectedRoute path="/editgenres/:id" component={CreateGenres} authStatus={cookie} />

        {
          loginAuthenticateUser.roll === "admin" ?
            (
              <>
                <ProtectedRoute exact path="/admingenres" component={ListGenres} authStatus={cookie} />
                <ProtectedRoute exact path="/changepwd" component={ChangePassword} authStatus={cookie} />
                <ProtectedRoute exact path="/createGenres" component={CreateGenres} authStatus={cookie} />

              </>
            )
            : null
        }


        {
          cookie === undefined || loginStatus === true ? (
            <>
              <Route exact path='/signIn' component={SigninPage} />

            </>
          ) : <Redirect to='/' />
        }

        <Route path="*" component={PageNotFound}></Route>

      </Switch>

    </div>
  )
}

export default App