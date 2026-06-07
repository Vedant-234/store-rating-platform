import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function AdminStores() {

    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {

        fetchStores();

    }, [page]);

    const fetchStores = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    `/admin/stores?page=${page}&search=${search}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setStores(
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
                    Stores Management
                </h1>
            </Layout>
            <br />

            <input
                type="text"
                placeholder="Search Store"
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <button
                onClick={fetchStores}
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
                        <th>Address</th>
                        <th>Owner</th>
                        <th>Average Rating</th>

                    </tr>

                </thead>

                <tbody>

                    {stores.length > 0 ? (

                        stores.map(
                            (store) => (

                                <tr
                                    key={store.store_id}
                                >

                                    <td>
                                        {store.name}
                                    </td>

                                    <td>
                                        {store.email}
                                    </td>

                                    <td>
                                        {store.address}
                                    </td>

                                    <td>
                                        {store.owner_name}
                                    </td>

                                    <td>
                                        {store.average_rating}
                                    </td>

                                </tr>

                            )
                        )

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                            >
                                No Stores Found
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

export default AdminStores;