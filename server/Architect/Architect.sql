USE Inventory;
CREATE TABLE
IF NOT EXISTS Architect
(
	id int AUTO_INCREMENT,
	display_name VARCHAR
(100) NOT NULL,
    lot_num VARCHAR
(100) NOT NULL,
    quantity INT NOT NULL,
    is_current_lot BOOLEAN NOT NULL,
    is_new_lot BOOLEAN NOT NULL,
    par INT NOT NULL,
    count_per_box INT NOT NULL,
    expiration_date DATETIME NOT NULL,
    order_id VARCHAR
(100) NOT NULL,
    PRIMARY KEY
(id)
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Hepatitis B Surface Antigen Reagent", "SLKW-ZKL28", 0, TRUE, FALSE, 4, 2, "2022-08-30 00:00:00", "SLKW22KZ23JK2KL"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Hepatitis B Surface Antigen Reagent", "Q92S-2LKS", 0, FALSE, TRUE, 4, 2, "2023-02-28 00:00:00", "VBWIW02KJSJK23L"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Hepatitis B Surface Antigen Neutralization Reagent", "WEOIZ-2KLZKL-2LK", 0, TRUE, FALSE, 4, 2, "2021-10-30 00:00:00", "ACXM9832DSJKZJK"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Hepatitis C Antibody Reagent", "FIWE-23SDKL-2KL", 0, TRUE, FALSE, 4, 2, "2024-03-30 00:00:00", "OI23908X1KLSIU3"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Troponin I Reagent", "CXM2389", 0, TRUE, FALSE, 4, 2, "2026-12-30 00:00:00", "XZOI398DJKFDKJ320287"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Troponin I Reagent", "2KLJAKJ", 0, FALSE, TRUE, 4, 2, "2027-04-30 00:00:00", "VNERJK4389DFKSDKJ2398SLKZ"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Homocysteine Reagent", "SLKJ-2398", 0, TRUE, FALSE, 4, 2, "2020-11-30 00:00:00", "TEIO298ZLK2398ASKL"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "React Vessels", "SDLK32398S0", 0, TRUE, FALSE, 4, 2, "2030-12-30 00:00:00", "PWOI3-ZJK32"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Concentrated Wash Buffer", "XLK34023JK", 0, TRUE, FALSE, 4, 2, "2025-09-30 00:00:00", "IOWLXM1223984902"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Trigger Solution", "SDKLDS23-XKLS", 0, TRUE, FALSE, 4, 2, "2020-11-30 00:00:00", "WQI239890438U9DN"
);

INSERT INTO Architect
    (
    display_name, lot_num, quantity, is_current_lot, is_new_lot, par, count_per_box, expiration_date, order_id
    )
VALUES
    (
        "Pre Trigger Solution", "RELK23M", 0, TRUE, FALSE, 4, 2, "2020-12-30 00:00:00", "383289ZSJ23JKOcobas_8100_transactions"
);

-- ARCHITECT TRANSACTIONS
CREATE TABLE
IF NOT EXISTS architect_transactions (
	id INT AUTO_INCREMENT,
    lot_num VARCHAR(100) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,
    amount int NULL,
    num_boxes_received INT NULL,
    quantity_in_stock int NULL,
    timestamp TIMESTAMP,
    PRIMARY KEY(id)
);

SELECT *
FROM architect_transactions;