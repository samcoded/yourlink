import React from 'react'
import axios from '../api/axios';
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";




function Main() {
    const [originalUrl, setOriginalUrl] = React.useState('')
    const [urlSlug, setUrlSlug] = React.useState('')
    const [newOriginalUrl, setNewOriginalUrl] = React.useState('')
    const [newUrlSlug, setNewUrlSlug] = React.useState('')
    const [showPrompt, setShowPrompt] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const { auth } = React.useContext(AuthContext);
    const [userToken, setUserToken] = React.useState('')
    const [userId, setUserId] = React.useState('')


    const [urls, setUrls] = React.useState([])


    React.useEffect(() => {

        if (auth !== null) {
            setUserToken(auth.token)
            setUserId(auth.id)
            setLoggedIn(true)
        }

    }, [auth]
    )
    React.useEffect(() => {
        if (loggedIn) {
            console.log("user id", userId)
            axios.get(`/api/urls/${userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + userToken
                }
            }).then(res => {
                // console.log(res)
                setUrls(res.data)
            }).catch(err => {
                console.log(err)
            }
            )
        }
    }, [loggedIn, newOriginalUrl, newUrlSlug, userId, userToken])

    const handleSubmit = async (e) => {
        e.preventDefault()


        console.log("token", userToken)
        axios.post('/api/shorten', {
            originalUrl,
            urlSlug
        }, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }).then(res => {
            console.log(res)
            // alert("URL Shortened")
            setNewOriginalUrl(res.data.originalUrl)
            setNewUrlSlug(res.data.urlSlug)
            setOriginalUrl('')
            setUrlSlug('')
            setShowPrompt(true)
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
                    <h1 className="text-2xl text-white mb-5">Shorten URL</h1>

                    {!loggedIn && (<div className="my-5 text-white">
                        You need to be signed in to save and monitor your shortened urls
                        <p className="mt-5"> <Link to="/register" className="ml-4 bg-blue-500 rounded p-2 text-white hover:bg-blue-300 text-underline">Register</Link>
                            <Link to="/login" className="ml-4 bg-blue-500 rounded p-2 hover:bg-blue-300 text-white text-underline">Sign in</Link>
                        </p>
                    </div>)}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label for="url" className="sr-only">URL</label>
                            <input type="text" name="url" id="url" placeholder="URL" className="bg-gray-700 border-2 p-4 rounded-lg w-full text-white" onChange={(e) => {
                                setOriginalUrl(e.target.value)
                                setShowPrompt(false)
                            }} value={originalUrl} />
                        </div>
                        <div className="mb-4">
                            <label for="slug" className="sr-only">Slug</label>
                            <input type="text" name="slug" id="slug" placeholder="Slug" className="bg-gray-700 border-2 p-4 rounded-lg w-full text-white" onChange={(e) => {
                                setUrlSlug(e.target.value)
                                setShowPrompt(false)
                            }} value={urlSlug} />
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-3 hover:bg-blue-300 rounded font-medium w-full">Shorten</button>
                        </div>


                    </form>


                    {showPrompt && (<div className="bg-gray-600 rounded px-4 py-2 m-5 text-white">
                        <p>URL Shortened !!!!</p>
                        <p>Original: {newOriginalUrl}</p>
                        <p>Short URL: http://yourlink.live/{newUrlSlug} </p>
                        <button className="bg-blue-500 text-white p-1 m-3 rounded font-medium hover:bg-blue-300">Copy</button>
                    </div>)}
                </div>
            </div>





            {loggedIn && (<div className="flex justify-center overflow-x">
                <div className="w-1/2 bg-gray-800 p-6 rounded-lg mt-2">
                    <h1 className="text-2xl text-white mb-5">Shortened URLs</h1>
                    <table className="table-auto text-white table-auto overflow-scroll w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Original URL</th>
                                <th className="px-4 py-2">Shortened URL</th>
                            </tr>
                        </thead>
                        <tbody>

                            {urls.map(
                                (url, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{url.originalUrl}</td>
                                            <td className="border px-4 py-2">http://yourlink.live/{url.urlSlug}
                                                <button className="bg-blue-500 text-white p-1 rounded font-medium hover:bg-blue-300 ml-3">Copy</button>
                                            </td>

                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>)
            }


        </div>
    )
}

export default Main
