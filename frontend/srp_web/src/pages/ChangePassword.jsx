import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function ChangePassword() {

    const [
        currentPassword,
        setCurrentPassword
    ] = useState("");

    const [
        newPassword,
        setNewPassword
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");

    const handleSubmit =
        async () => {

            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match"
                );

                return;

            }

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.put(
                        "/user/password",
                        {
                            currentPassword,
                            newPassword
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                alert(
                    response.data.message
                );

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

            }
            catch (error) {

                alert(
                    error.response?.data?.message
                    ||
                    "Password Update Failed"
                );

            }

        };

    return (

        <div>
            <Layout>
                <h1>
                    Change Password
                </h1>
            </Layout>
            <br />

            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                    setCurrentPassword(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={handleSubmit}
            >
                Update Password
            </button>

        </div>

    );

}

export default ChangePassword;