-- 1. USERS (Staff, Managers, Executives)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('Executive', 'Manager', 'Staff')) NOT NULL,
    department VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. INVENTORY (Motorcycles)
CREATE TABLE inventory (
    vin VARCHAR(17) PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Available', 'Pending', 'Sold', 'Service')) DEFAULT 'Available',
    price DECIMAL(10, 2),
    mileage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CUSTOMERS & LEADS
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assigned_to UUID REFERENCES users(id),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    lead_score INT DEFAULT 0, -- AI Predictive Score
    status VARCHAR(50) DEFAULT 'New',
    interested_vin VARCHAR(17) REFERENCES inventory(vin),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. REPAIR ORDERS (Service Center)
CREATE TABLE repair_orders (
    id SERIAL PRIMARY KEY,
    customer_id UUID REFERENCES leads(id),
    assigned_tech UUID REFERENCES users(id),
    vin VARCHAR(17) REFERENCES inventory(vin),
    status VARCHAR(50) DEFAULT 'Checked In',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);