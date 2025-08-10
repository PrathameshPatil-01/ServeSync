import React from 'react';
import AdminNavbar from '../../components/AdminComp/AdminNavbar';
import AddNewRoleComp from '../../components/AdminComp/AddNewRoleComp';

function AddRolePage() {
    return (
        <div>
            <AdminNavbar />
            <div className="container my-4">
                <div className="text-center mb-4">
                    <h1 className="display-4 fw-bold">Role Addition</h1>
                    <p className="lead text-muted">Create and manage user roles effectively.</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <AddNewRoleComp />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRolePage;
