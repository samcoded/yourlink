import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";





function Logout() {
    const navigate = useNavigate();
    const { setAuth } = React.useContext(AuthContext);


    // clear localstorage and logout

    const logout = async () => {
        localStorage.clear()
        setAuth(null)
        navigate('/')
    }

    React.useEffect(() => {
        logout()
    })


    return (
        <div>
            Logout
        </div>
    )
}

export default Logout
