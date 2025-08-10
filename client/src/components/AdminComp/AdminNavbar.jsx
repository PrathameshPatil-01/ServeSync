import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (
                sidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                !e.target.closest('.menu-btn')
            ) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [sidebarOpen]);

    return (
        <>
            <nav
                className="navbar navbar-expand-lg shadow-sm"
                style={{ background: '#343a40', borderBottom: '1.5px solid #e9ecef' }}
            >
                <div className="container-fluid">
                    <button
                        type="button"
                        className="btn btn-outline-primary rounded-circle menu-btn me-3"
                        aria-label="Open menu"
                        aria-expanded={sidebarOpen}
                        onClick={() => setSidebarOpen((o) => !o)}
                        style={{
                            width: 38,
                            height: 38,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: sidebarOpen ? '0 0 0 2px #0d6efd' : '',
                        }}
                    >
                        {/* Hamburger Icon */}
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                fillRule="evenodd"
                                d="M1.75 3.5a.5.5 0 0 1 .5-.5h11.5a.5.5 0 0 1 0 1H2.25a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11.5a.5.5 0 0 1 0 1H2.25a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11.5a.5.5 0 0 1 0 1H2.25a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>

                    <Link className="navbar-brand fw-bold fs-3" to="/">
                        <span style={{ letterSpacing: '2px', color: '#0d6efd' }}>ServeSync</span>
                    </Link>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            <div
                aria-hidden={!sidebarOpen}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1050,
                    pointerEvents: sidebarOpen ? 'auto' : 'none',
                }}
            >
                {/* BACKDROP */}
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: sidebarOpen ? 'blur(4px)' : 'none',
                        opacity: sidebarOpen ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                    }}
                />

                {/* SIDEBAR */}
                <aside
                    ref={sidebarRef}
                    role="navigation"
                    aria-label="Main menu"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: 270,
                        background: '#343a40',
                        borderRight: '1.5px solid #444',
                        boxShadow: sidebarOpen ? '5px 0 16px rgba(13,110,253,0.2)' : 'none',
                        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'transform 0.3s cubic-bezier(.53,1.67,.74,1.31), box-shadow 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1.5rem 1rem',
                        overflowY: 'auto',
                        minHeight: '100vh',
                    }}
                >
                    {/* Sidebar Header */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <span
                            className="fs-4 fw-semibold"
                            style={{ color: '#0d6efd', letterSpacing: '1.4px' }}
                        >
                            ServeSync
                        </span>
                        <button
                            aria-label="Close sidebar"
                            className="btn btn-sm btn-outline-secondary"
                            style={{ fontSize: 19, lineHeight: '19px', borderRadius: '50%' }}
                            onClick={() => setSidebarOpen(false)}
                            tabIndex={0}
                        >
                            &times;
                        </button>
                    </div>
                    {/* NAVIGATION LINKS */}
                    <nav className="nav flex-column gap-2">
                        {['/admin/dashboard', '/admin/addingServices', '/admin/role', '/view-feedbacks'].map((path, index) => {
                            const labels = ['Dashboard', 'Add Services', 'Add Roles', 'View Feedbacks'];
                            const icons = ['bi-speedometer2', 'bi-plus-circle', 'bi-people', 'bi-chat-left-text'];
                            return (
                                <Link
                                    key={index}
                                    to={path}
                                    className="nav-link fw-semibold py-2 px-3 rounded"
                                    style={{
                                        color: 'white',
                                        transition: 'background .2s, color .2s',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setSidebarOpen(false)}
                                    tabIndex={0}
                                    onFocus={(e) => {
                                        e.target.style.background = '#0d6efd';
                                        e.target.style.color = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#0d6efd';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = 'white';
                                    }}
                                >
                                    <i className={`bi ${icons[index]} me-2`} /> {labels[index]}
                                </Link>
                            );
                        })}
                    </nav>
                    <hr className="my-4" style={{ borderColor: '#444' }} />
                    <span
                        className="text-muted small text-center mb-1"
                        style={{ color: '#ccc' }}
                    >
                        Admin Panel
                    </span>
                </aside>
            </div>
        </>
    );
}

export default AdminNavbar;
