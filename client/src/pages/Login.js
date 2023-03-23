import React from 'react'
import validator from "validator";
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";




function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    const { setAuth } = React.useContext(AuthContext);
    const [error, setError] = React.useState('');

    const validate = () => {
        if (email === '' || password === '') {
            setError('Please fill all the fields')
            return false
        }

        if (!validator.isEmail(email)) {
            setError('Please enter a valid email')
            return false
        }
        return true
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {
            axios.post('/api/login', {
                email,
                password
            }).then(res => {
                // console.log(res.data)
                alert("Login Successful")
                setPassword('')
                setEmail('')

                setAuth({ name: res.data.user.name, id: res.data.user._id, token: res.data.token });
                // save the token and name in local storage
                // localStorage.setItem('token', res.data.token)
                // localStorage.setItem('name', res.data.user.name)
                // localStorage.setItem('id', res.data.user._id)
                navigate('/')
            }
            ).catch(err => {
                console.log(err)
            }
            )

        }
    }


    return (

        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2 bg-gray-800 p-6 rounded-lg mt-2">
                    <h1 className="text-2xl text-white mb-5">Login</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <h2 className='text-red-500 mb-3'>{error}</h2>}
                        <div className="mb-4">
                            <label for="email" className="sr-only">Email</label>
                            <input type="text" name="email" id="email" placeholder="Email" className="bg-gray-700 border-2 p-4 rounded-lg w-full text-white" onChange={(e) => {
                                setEmail(e.target.value)

                            }} value={email} />


                        </div>
                        <div className="mb-4">
                            <label for="password" className="sr-only">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-700 border-2 p-4 rounded-lg w-full text-white" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full hover:bg-blue-300">Login</button>
                        </div>

                        <div className="mt-3">
                            <Link className="text-white text-underline text-white hover:text-gray-300 " to="/login">
                                Don't have an account? Sign up now
                            </Link>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
