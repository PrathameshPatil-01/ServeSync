import React from 'react';
import AdminNavbar from '../../components/AdminComp/AdminNavbar';
import Dashboard from '../../components/AdminComp/Dashboard';

function DashboardPage() {
    return (
        <div>
            <AdminNavbar />
            <div className="container my-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
