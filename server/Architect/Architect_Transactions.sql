USE inventory;
CREATE TABLE IF NOT EXISTS architect_transactions (
	id INT AUTO_INCREMENT,
    lot VARCHAR(100) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,
    amount int NULL,
    num_boxes_received INT NULL,
    quantity_in_stock int NULL,
    update_time TIMESTAMP,
    PRIMARY KEY(id)
);

SELECT * FROM architect_transactions;