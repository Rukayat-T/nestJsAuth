import React, { useContext, useState } from 'react'
import AuthContext, { AuthProvider } from '../../context/AuthContext'

function Home() {
    let { user, logoutUser } = useContext(AuthContext)
    const userD = user.user
    return (
        <>
            <div>Welcome! you have successfully logged in as {userD?.name}, {userD?.role == "admin" ? "an" : "a"} {userD?.role}</div>
            <div className="logout">
                <button className='border-2 border-black rounded-md' onClick={logoutUser}>Log out</button>
            </div>
        </>
    )
}

export default Home