import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {

        fetchUsers();

    }, [page]);

    const fetchUsers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    `/admin/users?page=${page}&search=${search}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setUsers(
                response.data.data
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div>
            <Layout>
                <h1>
                    Users Management
                </h1>
            </Layout>

            <br />

            <input
                type="text"
                placeholder="Search User"
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <button
                onClick={fetchUsers}
            >
                Search
            </button>

            <br />
            <br />

            <table border="1">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Address</th>

                    </tr>

                </thead>

                <tbody>

                    {users.length > 0 ? (

                        users.map(
                            (user) => (

                                <tr
                                    key={user.user_id}
                                >

                                    <td>
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>
                                        {user.role}
                                    </td>

                                    <td>
                                        {user.address}
                                    </td>

                                </tr>

                            )
                        )

                    ) : (

                        <tr>

                            <td
                                colSpan="4"
                            >
                                No Users Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

            <br />

            <div>

                <button
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                    disabled={
                        page === 1
                    }
                >
                    Previous
                </button>

                <span
                    style={{
                        margin: "0 10px"
                    }}
                >
                    Page {page}
                </span>

                <button
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </button>

            </div>

        </div>

    );
}

export default AdminUsers;