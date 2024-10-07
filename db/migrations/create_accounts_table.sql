-- Buat enum untuk tipe akun
CREATE TYPE ACCOUNT_TYPE_ENUM AS ENUM ('tabungan', 'deposito', 'giro');
-- Buat enum untuk status akun
CREATE TYPE STATUS_ENUM AS ENUM ('active', 'inactive');
-- Buat tabel accounts
CREATE TABLE IF NOT EXISTS accounts (
	account_id BIGSERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
	account_number INT NOT NULL UNIQUE,
	account_type ACCOUNT_TYPE_ENUM NOT NULL,
	balance DECIMAL(15, 2) NOT NULL DEFAULT 0,	
	pin VARCHAR(6) NOT NULL,
	status STATUS_ENUM NOT NULL DEFAULT 'active',
	created_at DATE NOT NULL DEFAULT NOW()
);