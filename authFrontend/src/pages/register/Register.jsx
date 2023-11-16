import { useEffect, useRef, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    // const [items, setItems] = useState([]);
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password1: "",
        password2: "",
        age: "",
        role: ""
    })

    const checkbox = useRef();

    const handleCheck = () => {
        if (checkbox.current.checked) {
            setformData({ ...formData, role: "admin" });
        } else {
            setformData({ ...formData, role: "customer" });
        }
    }



    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(items));
    // }, [items]);

    let handleSubmit = async (e) => {
        handleCheck;

        e.preventDefault()
        try {
            var data = new FormData();
            data.append("name", formData.name)
            data.append("email", formData.email)
            data.append("password1", formData.password1)
            data.append("password2", formData.password2)
            data.append("age", formData.age)
            data.append("role", formData.role)
            Register()
        }
        catch (err) {
            console.log(err)
        }

    }

    const Register = async () => {
        let res = await fetch("http://localhost:3000/auth/createUser",
            {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        let resJson = await res.json();
        if (resJson.status === 200) {
            // localStorage.setItem("user", JSON.stringify(resJson.response));
            navigate("/login")
        } else {
            alert("something went wrong")
        }

    }

    return (
        <>
            <div className="signupBoxContainer bg-black min-w-full min-h-screen items-center justify-center flex">
                <div className="signUpBox bg-white min-h-max w-6/12 items-center flex flex-col rounded-md p-5">
                    <div className="signup items-center"> sign up</div>
                    <div className="form-container m-5 ">
                        <form action="" className="flex flex-col items-start gap-5 " onSubmit={handleSubmit} >
                            <div className=" flex flex-col ">
                                <label>Name:</label>
                                <input
                                    className="border-2 border-black rounded-md w-full"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setformData({ ...formData, name: e.target.value })}
                                    placeholder="Jane" />
                            </div>
                            <div className=" flex flex-col">
                                <label>Email:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setformData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className=" flex flex-col">
                                <label>Password:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="password"
                                    name="password1"
                                    value={formData.password1}
                                    onChange={(e) => setformData({ ...formData, password1: e.target.value })} />
                            </div>
                            <div className=" flex flex-col">
                                <label> Confirm Password:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="password"
                                    name="password2"
                                    value={formData.password2}
                                    onChange={(e) => setformData({ ...formData, password2: e.target.value })}
                                />
                            </div>
                            <div className=" flex flex-col">
                                <label>Age:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={(e) => setformData({ ...formData, age: e.target.value })} />
                            </div>
                            <div className=" flex flex-col ">
                                <label>Role</label>
                                <select className="border-2 border-black rounded-md" value={formData.role} onChange={(e) => setformData({ ...formData, role: e.target.value })}>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button className="border-2 border-black rounded-md" type="button" onClick={handleSubmit}> signup</button>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Register;