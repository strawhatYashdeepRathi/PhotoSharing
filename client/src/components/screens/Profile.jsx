import React, {useEffect, useState, useContext} from 'react';
import Navbar from '../Navebar'
import {UserContext} from '../../App'

const Profile = ()=>{
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    }, [])
    return (
        <>
        <Navbar />
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
                    <h4>{state?state.name:'loading ...'}</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{mypics.length} Posts</h6>
                        <h6>{state?state.followers.length:'loading...'} Followers</h6>
                        <h6>{state?state.following.length:'loading...'} Following</h6>
                    </div>
                </div>
            </div>

            <div className='gallery'>
                {
                    mypics.map(item=>{
                        return (
                            <img key={item._id} className='item' src={item.photo} alt={item.title} />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Profile