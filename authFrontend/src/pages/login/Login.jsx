import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';

function Login() {

    let { loginUser } = useContext(AuthContext);

    return (
        <>
            <div className="signupBoxContainer bg-black min-w-full min-h-screen items-center justify-center flex">
                <div className="signUpBox bg-white min-h-max w-6/12 items-center flex flex-col rounded-md p-5">
                    <Link to={"/"} className='' >
                        <div className="underline hover:text-blue-400">click here to register</div>
                    </Link>
                    <div className="signup items-center"> log in</div>

                    <div className="form-container m-5 ">
                        <form action="" className="flex flex-col items-start gap-5 " onSubmit={loginUser} >
                            <div className=" flex flex-col">
                                <label>Email:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="text"
                                    name="email"
                                    placeholder='email'
                                />
                            </div>
                            <div className=" flex flex-col">
                                <label>Password:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="password"
                                    name="password"
                                    placeholder='password'
                                />
                            </div>
                            <input className="border-2 border-black rounded-md" value={"log in"} type="submit" />
                        </form>
                    </div>




                </div>
            </div >
        </>
    )
}

export default Login