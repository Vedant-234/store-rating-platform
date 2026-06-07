import {
    Link,
    useNavigate
} from "react-router-dom";

function Navbar() {

    const navigate =
        useNavigate();

    const role =
        localStorage.getItem(
            "role"
        );

    const handleLogout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="navbar">

            <h2>
                Store Rating System
            </h2>

            {
                role === "ADMIN" && (
                    <>
                        <Link to="/admin/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/admin/users">
                            Users
                        </Link>

                        <Link to="/admin/stores">
                            Stores
                        </Link>
                    </>
                )
            }

            {
                role === "USER" && (
                    <Link to="/stores">
                        Stores
                    </Link>
                )
            }

            {
                role === "OWNER" && (
                    <Link to="/owner/dashboard">
                        Dashboard
                    </Link>
                )
            }

            <Link to="/change-password">
                Change Password
            </Link>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>

    );

}

export default Navbar;