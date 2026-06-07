import { useState } from "react";

import api from "../services/api";

import {
    useNavigate
}
from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async ()=>{

        try{

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.user.role
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            const role = response.data.user.role;

            if (role === "ADMIN") {

                navigate(
                    "/admin/dashboard"
                );

            }
            else if (role === "USER") {

                navigate(
                    "/stores"
                );

            }
            else {

                navigate(
                    "/owner/dashboard"
                );

            }

        }
        catch(error){

            console.log(error);

        }

    };

    return (

        <div className="auth-container">

            <h1>Login</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
            >
                Login
            </button>

            <br />

            <p>
                Don't have an account?
            </p>

            <button
                onClick={() =>
                    navigate("/register")
                }
            >
                Register
            </button>

        </div>

    );
}

export default Login;