import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../App'

const Navbar = ()=>{
  const  {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const renderList = ()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/followersfeed">Feed</Link></li>,
        <li><button className="btn #d50000 red accent-4"
        onClick={()=>{
          localStorage.clear()
          dispatch({type:'CLEAR'})
          navigate('/signin')
        }}
        >
            Logout
        </button></li>
      ]
    }else{
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return (
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default Navbar