import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function AdminStores() {

    const [stores, setStores] = useState([]);
    const [owners, setOwners] = useState([]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [storeData, setStoreData] = useState({
        name: "",
        email: "",
        address: "",
        owner_id: ""
    });

    useEffect(() => {

        fetchStores();
        fetchOwners();

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

    const fetchOwners = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/admin/owners",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Owners API:", response.data);

            setOwners(response.data.data);

            setOwners(
                response.data.data
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setStoreData({
            ...storeData,
            [e.target.name]: e.target.value
        });

    };

    const addStore = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.post(
                    "/admin/stores",
                    storeData,
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

            setStoreData({
                name: "",
                email: "",
                address: "",
                owner_id: ""
            });

            fetchStores();
            fetchOwners();

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create store"
            );

        }

    };

    return (

        <Layout>

            <h1>
                Stores Management
            </h1>

            <hr />

            <h2>
                Add Store
            </h2>

            <input
                type="text"
                name="name"
                placeholder="Store Name"
                value={storeData.name}
                onChange={handleChange}
            />

            <br />
            <br />

            <input
                type="email"
                name="email"
                placeholder="Store Email"
                value={storeData.email}
                onChange={handleChange}
            />

            <br />
            <br />

            <input
                type="text"
                name="address"
                placeholder="Store Address"
                value={storeData.address}
                onChange={handleChange}
            />

            <br />
            <br />

            <select
                name="owner_id"
                value={storeData.owner_id}
                onChange={handleChange}
            >

                <option value="">
                    Select Owner
                </option>

                {owners.map(
                    (owner) => (

                        <option
                            key={owner.user_id}
                            value={owner.user_id}
                        >
                            {owner.name} - {owner.email}
                        </option>

                    )
                )}

            </select>

            <br />
            <br />

            <button
                onClick={addStore}
            >
                Add Store
            </button>

            <br />
            <br />

            <hr />

            <h2>
                Store List
            </h2>

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
                onClick={() => {
                    setPage(1);
                    fetchStores();
                }}
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

                            <td colSpan="5">

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

        </Layout>

    );

}

export default AdminStores;