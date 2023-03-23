import React from 'react'
import { useNavigate } from 'react-router-dom';





function Logout() {
    const navigate = useNavigate();


    // clear localstorage and logout

    const logout = async () => {
        localStorage.clear()

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
