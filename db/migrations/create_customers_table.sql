-- Buat enum untuk gender
CREATE TYPE GENDER_ENUM AS ENUM ('male', 'female');
-- Buat tabel customers
CREATE TABLE IF NOT EXISTS customers (
    customer_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    address TEXT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    gender GENDER_ENUM NOT NULL,
    created_at DATE NOT NULL DEFAULT NOW()
);