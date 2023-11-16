import React, { useContext, useState } from 'react'
import AuthContext, { AuthProvider } from '../../context/AuthContext'

function Home() {
    // const [user, setUser] = useState(localStorage.getItem("user"))
    let { user, logoutUser } = useContext(AuthContext)
    const userD = user.user
    console.log(userD)
    return (
        <>
            <div>Welcome! you have successfully logged in as {userD?.name}, a {userD?.role}</div>
            <div className="logout">
                <button className='border-2 border-black rounded-md' onClick={logoutUser}>Log out</button>
            </div>
        </>
    )
}

export default Home