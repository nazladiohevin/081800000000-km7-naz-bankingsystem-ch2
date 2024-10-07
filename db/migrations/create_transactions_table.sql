-- Buat enum untuk jenis transaksi yang dilakukan
CREATE TYPE TRANSACTION_TYPE AS ENUM ('deposit', 'withdrawal', 'transfer', "cash deposit");
-- Buat tabel transaksi
CREATE TABLE IF NOT EXISTS transactions (
	transaction_id BIGSERIAL PRIMARY KEY,
	account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
	transaction_type TRANSACTION_TYPE NOT NULL,
	amount DECIMAL(18, 2) NOT NULL,
	note VARCHAR(100),
	created_at DATE NOT NULL DEFAULT NOW()
);