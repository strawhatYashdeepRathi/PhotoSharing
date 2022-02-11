import React, {useEffect, createContext, useReducer, useContext} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import Followersfeed from './components/screens/followersfeed'
import {initialState, reducer} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'USER', payload:user})
    }else{
      navigate('/signin')
    }
  }, [])
  return(
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/profile/:userid' element={<UserProfile />} />
        <Route path='/followersfeed' element={<Followersfeed />} />

    </Routes>
  )
} 

function App() {
  const[state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;