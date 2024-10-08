-- Pendaftaran sebagai nasabah bank
-- Saya mendummy langsung 4 nasabah
INSERT INTO customers (name, address, phone, email, password, birth_date, gender)
VALUES 
    ('Nazla Dio Hevin', 'Minomartani', '082222567555', 'dionazla@gmail.com', '12345678', '2003-02-15', 'male'),
    ('Safira Ananda', 'Balikpapan', '083654789876', 'safira@gmail.com', 'qwerty', '2003-01-19', 'female'),
    ('Jin Runcadel', 'Runcaled Clan', '089789765444', 'jin@gmail.com', 'temulawak', '1994-12-23', 'male'),
    ('Bichir Baskervile', 'Baskervile Kingdom', '087555666789', 'bichir@gmail.com', 'berasku', '2001-11-23', 'male');

-- Pembukaan rekening
INSERT INTO accounts (customer_id, account_number, account_type, balance, pin, status)
VALUES 
  (1, '000222111444', 'tabungan', 0, '098765', 'active'),
	(2, '000999123111', 'giro', 0, '123456', 'active'),
	(3, '004567989232', 'tabungan', 0, '777888', 'active');

-- Dummy rekening yang sudah ada saldonya
INSERT INTO accounts (customer_id, account_number, account_type, balance, pin, status)
VALUES
	(4, '000987456123', 'deposito', 50000, '090807', 'inactive'),
	(1, '023777888124', 'deposito', 12000000, '010203', 'active');

-- Login ke user Nazla Dio Hevin
SELECT * FROM customers WHERE email='dionazla@gmail.com' AND password='12345678';

-- Memilih jenis rekening yang sudah didaftarkan
-- menampilkan jenis rekening yang dimiliki oleh Nazla Dio Hevin
SELECT a.*
FROM accounts a 
INNER JOIN customers c ON a.customer_id=c.customer_id 
WHERE c.customer_id = 1;

-- User Nazla memilih rekening tabungan dan sekaligus menampilkan datanya 
SELECT *
FROM accounts a 
INNER JOIN customers c ON a.customer_id=c.customer_id 
WHERE a.account_id = 1;

-- System mengecek apakah sudah melakukan deposit atau belum
SELECT 
    CASE 
        WHEN a.balance = 0 THEN TRUE 
        ELSE FALSE 
    END AS is_balance_zero
FROM accounts a
INNER JOIN customers c ON a.customer_id = c.customer_id
WHERE a.account_id = 1 AND c.customer_id = 1;

-- deposit(): Melakukan deposit oleh nasabah Nazla Dio Hevin
--  Lacak history transaksi
INSERT INTO transactions (account_id, transaction_type, amount, note)
VALUES (1, 'deposit', 50000, NULL);
--  Update saldo
UPDATE accounts SET balance = 50000 WHERE account_id = 1;

-- setortunai(): Melakukan setor tunai oleh nasabah Nazla Dio Hevin
--  Lacak history transaksi
INSERT INTO transactions (account_id, transaction_type, amount, note)
  VALUES (1, 'cash deposit', 250000, NULL);
--  Update saldo
UPDATE accounts SET balance = balance + 250000 WHERE account_id = 1;

-- withdrawal() : melakukan tarik tunai
INSERT INTO transactions (account_id, transaction_type, amount, note)
  VALUES (1, 'withdrawal', 100000, NULL);
UPDATE accounts SET balance = balance - 100000 WHERE account_id = 1;


-- lihat seluruh transaksi
SELECT * FROM transactions;

-- Cari customer bank dan buat index nya
CREATE INDEX idx_user_name ON customers (name);
SELECT * FROM customers WHERE name LIKE '%Naz%';

-- Hapus transaksi hari ini
DELETE FROM transactions WHERE account_id = 1 AND created_at = CURRENT_DATE;

-- Hapus nasabah
DELETE FROM customers WHERE customer_id = 2;