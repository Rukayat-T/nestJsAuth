import React, { useContext, useEffect, useState } from 'react'
import AuthContext, { AuthProvider } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import UserComponent from './UserComponent'

function Home() {
    let { user, logoutUser, authTokens } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const userD = user.user
    const userRole = userD.role

    const getUsers = async (token) => {
        // console.log(token)
        try {
            let response = await fetch("https://nestauthservice.onrender.com/auth/getAllUsers",
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,

                    }

                })
            const resJson = await response.json();
            if (response.status === 200) {
                setUsers(resJson.response);

            } else {
                console.log(resJson);
                alert("error: " + resJson.message)
            }
        } catch (error) {
            console.log(error);
        }

    }

    // const currentUser = (element) => element.id == userD.id;
    // const userIndex = users.findIndex(currentUser)
    // const usersWithoutCurrUser = users.splice(userIndex)





    useEffect(() => {
        if (userRole == "admin") {
            getUsers(authTokens.token)
        }


    }, [users])

    const Display = () => {
        if (userRole === "admin") {
            return (
                <>

                    <div className=" text-center">
                        {users.length > 0 && (
                            <div className="">
                                {users.map(u => (
                                    <UserComponent user={u} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-center"> Thanks for visiting!</div>
                </>)

        }
        else {
            return (
                <>
                    <div className=""> Thanks for visiting! To see more, sign up as an admin user
                        {/* <Link to={"/"} className='' >
                            <div className="underline hover:text-blue-400">click here</div>
                        </Link> */}
                    </div>
                </>)
        }

    }
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className='p-10'>Welcome! you have successfully logged in as {userD?.name}, {userD?.role == "admin" ? "an" : "a"} {userD?.role}</div>
                <div className="display p-10">{Display()}</div>
                <div className="logout pt-10">
                    <button className='border-2 border-black rounded-md' onClick={logoutUser}>Log out</button>
                </div>
            </div>
        </>
    )
}

export default Home