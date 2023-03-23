import React from 'react'
import axios from '../api/axios';
import validator from "validator";
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";




function Register() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const navigate = useNavigate();
    const { setAuth } = React.useContext(AuthContext);
    const [error, setError] = React.useState('');

    const validate = () => {
        if (email === '' || password === '' || name === '') {
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
            axios.post('/api/register', {
                email,
                password,
                name,
            }).then(res => {
                // console.log(res.data)

                if (res.data.success) {
                    // alert("Registration Successful")
                    setPassword('')
                    setEmail('')
                    setName('')
                    setError('')

                    // console.log(res.data)
                    setAuth({ name: res.data.user.name, id: res.data.user._id, token: res.data.token });
                    // save the token and name in local storage
                    // localStorage.setItem('token', res.data.token)
                    // localStorage.setItem('name', res.data.user.name)
                    // localStorage.setItem('id', res.data.user._id)
                    navigate('/')
                }
                else {
                    setError(res.data.message)
                }
            }
            ).catch(err => {
                // console.log(err)
                setError(err.response.data.message)
            }
            )
        }
    }


    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2 bg-gray-800 p-6 rounded-lg mt-2">
                    <h1 className="text-2xl text-white mb-5">Register</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <h2 className='text-red-500 mb-3'>{error}</h2>}
                        <div className="mb-4">
                            <label for="name" className="sr-only">Name</label>
                            <input type="text" name="name" id="name" placeholder="Name" className="bg-gray-700 border-2 p-4 rounded-lg w-full text-white" onChange={(e) => {
                                setName(e.target.value)
                            }} value={name} />
                        </div>

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
                            <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full hover:bg-blue-300">Sign up</button>
                        </div>

                        <div className="mt-3">
                            <Link className="text-white text-underline text-white hover:text-gray-300 " to="/login">
                                Already signed up? Login now
                            </Link>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    )
}

export default Register
