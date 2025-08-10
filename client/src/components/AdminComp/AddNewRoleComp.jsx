import React, { useState } from 'react';

function AddNewRoleComp() {
    const [role, setRole] = useState({
        roleName: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRole((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/role/add-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic c3RyaW5nQGdtYWlsLmNvbTpzdHJpbmc='
                },
                body: JSON.stringify(role)
            });

            console.log("rs", response);
            if (response.status === 200) {
                const data = await response.json();
                console.log('Role added successfully:', data);
                alert('Role added successfully!');
                setRole({
                    roleName: '',
                    description: ''
                });
            } else {
                console.error('Failed to add Role');
                alert(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to backend');
        }
    };

    return (
        <div className="container my-4">
            <div className="card shadow-lg border-0 rounded">
                <div className="card-body">
                    <h3 className="mb-4 text-center text-primary">
                        <span className="me-2 fs-2 fw-bold">+</span>
                        Add New Role
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label fw-semibold">Role Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control border-primary"
                                    name='roleName'
                                    placeholder="e.g., Service Provider, Customer"
                                    value={role.roleName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Description</label>
                            <textarea
                                className="form-control border-primary"
                                rows={3}
                                name='description'
                                placeholder="Describe what this role can do"
                                value={role.description}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary px-4" style={{ backgroundColor: '#0d6efd', borderRadius: '20px' }}>
                            <span className="me-2 fs-5">+</span> Add Role
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNewRoleComp;
