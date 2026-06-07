import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function AdminDashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/admin/dashboard",
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

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <Layout>

                <h1>
                    Admin Dashboard
                </h1>

            </Layout>
            <div className="dashboard">

                <div className="card">
                    <p>Total Users</p>
                    <h2>
                        {dashboard.totalUsers}
                    </h2>
                </div>

                <div className="card">
                    <p>Total Stores</p>
                    <h2>
                        {dashboard.totalStores}
                    </h2>
                </div>

                <div className="card">
                    <p>Total Ratings</p>
                    <h2>
                        {dashboard.totalRatings}
                    </h2>
                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;