import React from 'react';
import AdminNavbar from './../../components/AdminComp/AdminNavbar';
import AddServiceForm from './../../components/AdminComp/AddServiceForm';
// import ServicesAccordion from '../../components/AdminComp/ServicesAccordion';

function AddingServicesPage() {
    return (
        <div>
            <AdminNavbar />
            <div className="container my-4">
                <div className="text-center mb-4">
                    <h1 className="display-4 fw-bold">Add New Service</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <AddServiceForm />
                    </div>
                </div>
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">
                        <h3 className="mb-3">Services Overview</h3>
                        {/* Uncomment the following line to include the ServicesAccordion component */}
                        {/* <ServicesAccordion /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddingServicesPage;
