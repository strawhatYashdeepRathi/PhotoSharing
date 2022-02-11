import React, {useState, useContext} from 'react';
import Navbar from '../Navebar'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = ()=>{
    const navigate = useNavigate()
    const {state, dispatch} = useContext(UserContext)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "imvalid email", classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:'USER', payload:data.user})
                M.toast({html:"Sign in success", classes:"#76ff03 light-green accent-3"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
            <Navbar />
            <div className='mycard'>
            <div className="card auth-card input-fields">
                <h2>Instagram</h2>
                <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                    Login
                </button>

                <h5>
                    <Link to="/signup">Don't have an account? Register here</Link>
                </h5>
            </div>
            </div>

        </>
    )
}

export default Signin