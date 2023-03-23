import React from 'react'
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';




function Register() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault()

        axios.post('/api/register', {
            email,
            password,
            name,
        }).then(res => {
            console.log(res.data)
            alert("Registration Successful")
            setPassword('')
            setEmail('')
            setName('')

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




        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2 bg-gray-800 p-6 rounded-lg mt-2">
                    <h1 className="text-2xl text-white mb-5">Register</h1>
                    <form onSubmit={handleSubmit}>
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