DROP DATABASE IF EXISTS servsync;
CREATE DATABASE servsync;
USE servsync;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS role_types,
service_categories,
verification_statuses,
users,
user_roles,
services,
sub_services,
service_providers,
provider_services,
provider_verifications,
addresses,
user_addresses,
booking_statuses,
bookings,
payment_methods,
payment_statuses,
payments,
reviews,
audit_actions,
audit_logs;
START TRANSACTION;
-- 1. Lookup Tables
CREATE TABLE role_types (
    role_type_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE,
    -- customer, provider, admin
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE service_categories (
    category_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(20) NOT NULL UNIQUE,
    -- home, store, hybrid
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE verification_statuses (
    status_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(20) NOT NULL UNIQUE,
    -- pending, approved, rejected
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 2. Core Tables
CREATE TABLE users (
    user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_country_code CHAR(5) NOT NULL DEFAULT '+91',
    phone_number VARCHAR(20) NOT NULL,
    password_hash CHAR(97) NOT NULL,
    -- bcrypt format
    profile_pic VARCHAR(500),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_phone (phone_country_code, phone_number)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE user_roles (
    user_id BIGINT UNSIGNED NOT NULL,
    role_type_id TINYINT UNSIGNED NOT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_type_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_type_id) REFERENCES role_types(role_type_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 3. Service Catalog
CREATE TABLE services (
    service_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    category_id TINYINT UNSIGNED NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(category_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE sub_services (
    sub_service_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_id INT UNSIGNED NOT NULL,
    sub_service_name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL CHECK (base_price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (service_id, sub_service_name),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 4. Provider Management
CREATE TABLE service_providers (
    provider_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    business_name VARCHAR(255) NOT NULL,
    business_reg_number VARCHAR(100),
    business_tax_id VARCHAR(100),
    description TEXT,
    years_of_experience SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE provider_services (
    provider_service_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    sub_service_id INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    estimated_duration SMALLINT UNSIGNED NOT NULL COMMENT 'Minutes',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (provider_id, sub_service_id),
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id),
    FOREIGN KEY (sub_service_id) REFERENCES sub_services(sub_service_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 5. Verification System
CREATE TABLE provider_verifications (
    verification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_number VARCHAR(100) NOT NULL,
    document_hash BINARY(32) NOT NULL COMMENT 'SHA-256',
    front_image_url VARCHAR(500) NOT NULL,
    back_image_url VARCHAR(500),
    status_id TINYINT UNSIGNED NOT NULL,
    verified_by BIGINT UNSIGNED,
    rejection_reason TEXT,
    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified_at DATETIME,
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id),
    FOREIGN KEY (status_id) REFERENCES verification_statuses(status_id),
    FOREIGN KEY (verified_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 6. Address System
CREATE TABLE addresses (
    address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE user_addresses (
    user_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NOT NULL,
    address_tag VARCHAR(50) NOT NULL DEFAULT 'primary',
    PRIMARY KEY (user_id, address_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 7. Booking System
CREATE TABLE booking_statuses (
    status_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE bookings (
    booking_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    provider_service_id BIGINT UNSIGNED NOT NULL,
    service_address_id BIGINT UNSIGNED NOT NULL,
    scheduled_start DATETIME NOT NULL,
    scheduled_end DATETIME NOT NULL,
    actual_start DATETIME,
    actual_end DATETIME,
    status_id TINYINT UNSIGNED NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    travel_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (travel_fee >= 0),
    cancellation_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (cancellation_fee >= 0),
    special_requests TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (provider_service_id) REFERENCES provider_services(provider_service_id),
    FOREIGN KEY (service_address_id) REFERENCES addresses(address_id),
    FOREIGN KEY (status_id) REFERENCES booking_statuses(status_id),
    INDEX idx_booking_dates (scheduled_start, scheduled_end)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 8. Payment System
CREATE TABLE payment_methods (
    method_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    method_name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE payment_statuses (
    status_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE payments (
    payment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL UNIQUE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    currency CHAR(3) NOT NULL DEFAULT 'INR',
    method_id TINYINT UNSIGNED NOT NULL,
    status_id TINYINT UNSIGNED NOT NULL,
    gateway_transaction_id VARCHAR(255),
    gateway_response JSON,
    paid_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id),
    FOREIGN KEY (status_id) REFERENCES payment_statuses(status_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 9. Review System
-- 1. Review Type Definition
CREATE TABLE review_types (
    type_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(20) NOT NULL UNIQUE,
    -- 'provider_to_customer', 'customer_to_provider'
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 2. Enhanced Review Table (Maintaining your original columns)
CREATE TABLE reviews (
    review_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    reviewer_id BIGINT UNSIGNED NOT NULL,
    reviewee_id BIGINT UNSIGNED NOT NULL,
    -- Added: Who is being reviewed
    type_id TINYINT UNSIGNED NOT NULL,
    -- Added: Review direction
    -- Your original fields
    rating TINYINT UNSIGNED NOT NULL CHECK (
        rating BETWEEN 1 AND 5
    ),
    comment TEXT,
    response TEXT,
    -- Renamed from provider_response for neutrality
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Enhanced constraints
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (reviewer_id) REFERENCES users(user_id),
    FOREIGN KEY (reviewee_id) REFERENCES users(user_id),
    FOREIGN KEY (type_id) REFERENCES review_types(type_id),
    -- Modified unique constraint to allow bidirectional reviews
    UNIQUE (booking_id, reviewer_id, type_id),
    -- Additional indexes
    INDEX idx_reviewee (reviewee_id, type_id),
    INDEX idx_booking_review (booking_id, type_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- 10. Audit & Compliance
CREATE TABLE audit_actions (
    action_id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    action_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
CREATE TABLE audit_logs (
    log_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    action_id SMALLINT UNSIGNED NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id BIGINT UNSIGNED NOT NULL,
    old_values JSON,
    new_values JSON,
    ip_address VARBINARY(16),
    user_agent VARCHAR(500),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (action_id) REFERENCES audit_actions(action_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
-- Populate lookup tables first
INSERT INTO role_types (role_name)
VALUES ('customer'),
    ('provider'),
    ('admin');
INSERT INTO service_categories (category_name)
VALUES ('home'),
    ('store'),
    ('hybrid');
INSERT INTO verification_statuses (status_name)
VALUES ('pending'),
    ('approved'),
    ('rejected');
-- For frequently accessed aggregates like ratings
CREATE VIEW provider_ratings AS
SELECT p.provider_id,
    AVG(r.rating) AS avg_rating,
    COUNT(r.review_id) AS total_reviews
FROM service_providers p
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN reviews r ON u.user_id = r.reviewer_id
GROUP BY p.provider_id;
INSERT INTO review_types (type_name, description)
VALUES (
        'customer_to_provider',
        'Customer rating the service provider'
    ),
    (
        'provider_to_customer',
        'Provider rating the customer behavior'
    );