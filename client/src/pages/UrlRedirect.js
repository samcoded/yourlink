import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios';


function UrlRedirect() {
    const { slug } = useParams()

    // Redirect IMMEDIATE to the url
    React.useEffect(() => {
        axios.get(`/api/${slug}`)
            .then(res => {
                // console.log(res.data)
                window.location.href = res.data.url
            })
            .catch(err => {
                // console.log(err)
            })
    }, [slug])


    return (
        <div>{slug}</div>
    )
}

export default UrlRedirect
