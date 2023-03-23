import React from 'react'
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';




function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post('/api/login', {
            email,
            password
        }).then(res => {
            console.log(res.data)
            alert("Login Successful")
            setPassword('')
            setEmail('')
            // save the token and name in local storage
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('name', res.data.user.name)
            navigate('/')
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }


    return (
        <div>
            <h1 className=''>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' placeholder='Enter your email' onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email} />
                <input type='password' name='password' placeholder='Enter your password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                <button type='submit' >Login</button>
            </form>
        </div>
    )
}

export default Login
