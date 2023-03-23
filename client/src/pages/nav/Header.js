import React from 'react'
import { Link } from "react-router-dom";

function Header() {

    const user = localStorage.getItem('name')
    console.log(user)

    return (<nav nav className="p-6 bg-gray-800 text-white flex justify-between mb-6 w-full" >
        <ul className="flex items-center">
            <li>
                <Link to="/" className="p-3 rounded bg-gray-600 hover:bg-gray-500 mx-5">YourLink</Link>
            </li>
            <li>
                <Link to="/logout" className="p-3 rounded bg-gray-600 hover:bg-gray-500 mx-5">Logout</Link>
            </li>
            <li>
                <Link to="/login" className="p-3 rounded bg-gray-600 hover:bg-gray-500 mx-5">Login</Link>
            </li>
            <li>
                <Link to="/register" className="p-3 rounded bg-gray-600 hover:bg-gray-500 mx-5">Register</Link>
            </li>
        </ul>
    </nav >)
}

export default Header
