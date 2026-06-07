import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async () => {

        try {

            const response = await api.post(
                "/auth/register",
                formData
            );

            alert(
                response.data.message ||
                "Registration Successful"
            );

            navigate("/");

        }
        catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="auth-container">

            <h1>Register</h1>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
            />

            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="USER">
                    Normal User
                </option>

                <option value="OWNER">
                    Store Owner
                </option>

                <option value="ADMIN">
                    Admin User
                </option>
            </select>

            <button
                onClick={handleRegister}
            >
                Register
            </button>

            <br />

            <p>
                Already have an account?
            </p>

            <button
                onClick={() =>
                    navigate("/")
                }
            >
                Login
            </button>

        </div>

    );
}

export default Register;