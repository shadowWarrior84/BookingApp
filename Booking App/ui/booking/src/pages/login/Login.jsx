import axios from 'axios';
import React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import "./login.css"

const login = () => {

    const [ credentials, setCredentials ] = useState({
        username: undefined,
        password: undefined
    })

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e)=>{
        setCredentials((prev)=>({ ...prev, [e.taget.id]: e.target.value}))
    }

    const handleClick = async (e)=>{
        e.preventDefault()
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }

    console.log(user)

  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" onChange={handleChange} id="username" className="lInput" />
            <input type="password" placeholder="password" onChange={handleChange} id="password" className="lInput" />
            <button onClick={handleClick} className="lButton">Login</button>
            { error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default login