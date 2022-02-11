import React, {useEffect, useState, useContext} from 'react';
import Navbar from '../Navebar'
import {useParams} from 'react-router-dom'
import {UserContext} from '../../App'

const Profile = ()=>{
    const [userprofile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowfollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            
            setProfile(result)
        })
    }, [])

    const followUser = ()=>{
        fetch('/follow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:'UPDATE', payload:{following:data.following, followers:data.followers}})
            localStorage.setItem('user', JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setShowfollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:'UPDATE', payload:{following:data.following, followers:data.followers}})
            localStorage.setItem('user', JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=> item!= data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowfollow(true)
        })
    }


    return (
        <>
        <Navbar />
        {userprofile ? 
            <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }} 
            >
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"                  
                        />
                    </div>
                    <div>
                        <h4>{userprofile.user.name}</h4>
                        <h5>{userprofile.user.email}</h5>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>{userprofile.posts.length} Posts</h6>
                            <h6>{userprofile.user.followers.length} Followers</h6>
                            <h6>{userprofile.user.following.length} Following</h6>
                        </div>
                        {showfollow?
                        
                        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={()=>followUser()}
                        >
                            Follow
                        </button>
                        :

                        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={()=>unfollowUser()}
                        >
                            Unfollow
                        </button>
                    }
                    </div>
                </div>

                <div className='gallery'>
                    {
                        userprofile.posts.map(item=>{
                            return (
                                <img key={item._id} className='item' src={item.photo} alt={item.title} />
                            )
                        })
                    }
                </div>
            </div>
        
        
        
        : <h2>loading....!</h2>}
      
        </>
    )
}

export default Profile