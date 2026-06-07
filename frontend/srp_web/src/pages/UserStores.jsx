import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function UserStores() {

    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState({});

    useEffect(() => {

        fetchStores();

    }, []);

    const fetchStores = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/stores",
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

    const submitRating = async (storeId) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/ratings",
                {
                    store_id: storeId,
                    rating:
                        ratings[storeId] || 1
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Rating Submitted"
            );

            fetchStores();

        }
        catch (error) {

            alert(
                error.response?.data?.message
            );

        }

    };

    const updateRating = async (storeId) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.put(
                `/ratings/${storeId}`,
                {
                    rating:
                        ratings[storeId] || 1
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Rating Updated"
            );

            fetchStores();

        }
        catch (error) {

            alert(
                error.response?.data?.message
            );

        }

    };

    return (

        <div>
            <Layout>
                <h1>
                    Available Stores
                </h1>
            </Layout>

            <table border="1">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Address</th>
                        <th>Average Rating</th>
                        <th>My Rating</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {stores.map(
                        (store) => (

                            <tr
                                key={store.store_id}
                            >

                                <td>
                                    {store.name}
                                </td>

                                <td>
                                    {store.address}
                                </td>

                                <td>
                                    {store.average_rating}
                                </td>

                                <td>

                                    {
                                        store.my_rating ??
                                        "Not Rated"
                                    }

                                </td>

                                <td>

                                    <select
                                        value={
                                            ratings[
                                                store.store_id
                                            ] || 1
                                        }
                                        onChange={(e) =>
                                            setRatings({
                                                ...ratings,
                                                [store.store_id]:
                                                    Number(
                                                        e.target.value
                                                    )
                                            })
                                        }
                                    >

                                        <option value="1">
                                            1
                                        </option>

                                        <option value="2">
                                            2
                                        </option>

                                        <option value="3">
                                            3
                                        </option>

                                        <option value="4">
                                            4
                                        </option>

                                        <option value="5">
                                            5
                                        </option>

                                    </select>

                                    {

                                        store.my_rating

                                            ? (

                                                <button
                                                    onClick={() =>
                                                        updateRating(
                                                            store.store_id
                                                        )
                                                    }
                                                >
                                                    Update Rating
                                                </button>

                                            )

                                            : (

                                                <button
                                                    onClick={() =>
                                                        submitRating(
                                                            store.store_id
                                                        )
                                                    }
                                                >
                                                    Rate Store
                                                </button>

                                            )

                                    }

                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );

}

export default UserStores;