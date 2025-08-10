import React, { useEffect, useState } from "react";

function StatCard({ color, label, value, icon }) {
    return (
        <div className="card shadow-lg border-0 h-100" style={{ minWidth: 200 }}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <div className="fw-bold text-muted">{label}</div>
                    <div className="fs-2 fw-bold">{value}</div>
                </div>
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                        background: color,
                        width: 56,
                        height: 56,
                    }}
                >
                    <span className="text-white fs-4">{icon}</span>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const statsRes = await fetch("/api/stats");
                const statsData = await statsRes.json();
                const ordersRes = await fetch("/api/orders?limit=3");
                const ordersData = await ordersRes.json();
                setStats(statsData);
                setOrders(ordersData);
            } catch (error) {
                setStats(null);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center my-5"><h4>Loading dashboard...</h4></div>;
    }

    return (
        <>
            {/* Spacing below navbar */}
            <div style={{ height: 30 }}></div>
            {/* Cards Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <StatCard
                        color="#0d6efd"
                        label="Orders Today"
                        value={stats?.ordersToday ?? "-"}
                        icon="📦"
                    />
                </div>
                <div className="col-md-3">
                    <StatCard
                        color="#28a745"
                        label="Active Providers"
                        value={stats?.activeProviders ?? "-"}
                        icon="👨‍🔧"
                    />
                </div>
                <div className="col-md-3">
                    <StatCard
                        color="#ffc107"
                        label="New Users"
                        value={stats?.newUsers ?? "-"}
                        icon="🧑‍💻"
                    />
                </div>
                <div className="col-md-3">
                    <StatCard
                        color="#17a2b8"
                        label="Revenue"
                        value={stats?.revenue ?? "-"}
                        icon="💰"
                    />
                </div>
            </div>
            {/* Simple Table */}
            <div className="card shadow-lg border-0 mb-4">
                <div className="card-header bg-light fw-semibold">Latest Orders</div>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Provider</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user}</td>
                                        <td>{order.provider}</td>
                                        <td>
                                            <span
                                                className={`badge ${order.status === "Completed"
                                                    ? "bg-success"
                                                    : order.status === "Pending"
                                                        ? "bg-warning text-dark"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.amount}</td>
                                        <td>{order.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Placeholder for chart */}
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    <div className="fw-semibold mb-2">Orders Trend (Weekly)</div>
                    <div
                        className="text-muted"
                        style={{
                            minHeight: 140,
                            background: "#f4f6fb",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span>Chart coming soon…</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
