import {
    useEffect,
    useState
} from "react";

import api from "../services/api";

import Layout from "../components/Layout";

function OwnerDashboard() {

    const [dashboard,
        setDashboard] =
        useState(null);

    const [ratings,
        setRatings] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        const loadData =
            async () => {

                try {

                    await Promise.all([
                        fetchDashboard(),
                        fetchRatings()
                    ]);

                }
                catch (error) {

                    console.log(error);

                }
                finally {

                    setLoading(false);

                }

            };

        loadData();

    }, []);

    const fetchDashboard =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(
                        "/owners/dashboard",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setDashboard(
                    response.data.data
                );

            }
            catch (error) {

                console.log(error);

                throw error;

            }

        };

    const fetchRatings =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(
                        "/owners/ratings",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setRatings(
                    response.data.data
                );

            }
            catch (error) {

                console.log(error);

                throw error;

            }

        };

    if (loading) {

        return (
            <h2>
                Loading...
            </h2>
        );

    }

    return (

        <div>
            <Layout>
                <h1>
                    Store Owner Dashboard
                </h1>
            </Layout>

            <div className="dashboard">

                <div className="card">
                    <p>Store</p>
                    <h2>
                        {dashboard?.store_name}
                    </h2>
                </div>

                <div className="card">
                    <p>Average Rating</p>
                    <h2>
                        {dashboard?.average_rating}
                    </h2>
                </div>

                <div className="card">
                    <p>Total Ratings</p>
                    <h2>
                        {dashboard?.total_ratings}
                    </h2>
                </div>

            </div>

            <hr />

            <h2>
                Users Who Rated
            </h2>

            <table border="1">

                <thead>

                    <tr>

                        <th>
                            Name
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Rating
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        ratings.length > 0

                            ?

                            ratings.map(
                                (user) => (

                                    <tr
                                        key={
                                            user.user_id
                                        }
                                    >

                                        <td>
                                            {
                                                user.user_name
                                            }
                                        </td>

                                        <td>
                                            {
                                                user.user_email
                                            }
                                        </td>

                                        <td>
                                            {
                                                user.rating
                                            }
                                        </td>

                                    </tr>

                                )
                            )

                            :

                            <tr>

                                <td
                                    colSpan="3"
                                >
                                    No Ratings Found
                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default OwnerDashboard;