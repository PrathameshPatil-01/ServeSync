import React, { useState } from 'react';

function AddServiceForm() {
    const [service, setService] = useState({
        serviceName: '',
        subServiceName: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/services/add-with-subservice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic c3RyaW5nQGdtYWlsLmNvbTpzdHJpbmc='
                },
                body: JSON.stringify(service)
            });

            console.log("rs", response);
            if (response.status === 200) {
                const data = await response.json();
                console.log('Service added successfully:', data);
                alert('Service added successfully!');
                setService({
                    serviceName: '',
                    subServiceName: '',
                    description: ''
                });
            } else {
                console.error('Failed to add service');
                alert('Failed to add service');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to backend');
        }
    };

    return (
        <div className="container my-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="mb-4">
                        <span className="me-2 fs-2 fw-bold">+</span>
                        Add New Service
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Service Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="serviceName"
                                value={service.serviceName}
                                onChange={handleChange}
                                placeholder="House Cleaning"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Sub-Service Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="subServiceName"
                                value={service.subServiceName}
                                onChange={handleChange}
                                placeholder="Room Cleaning"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                placeholder="Detailed description of the service"
                                value={service.description}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary px-4" style={{ backgroundColor: '#0d6efd' }}>
                            <span className="me-2 fs-5">+</span> Add Service
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddServiceForm;
