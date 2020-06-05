USE Inventory;
CREATE TABLE
IF NOT EXISTS abl
(
	id int AUTO_INCREMENT,
    reagentName VARCHAR
(50),
	displayName VARCHAR
(100) NOT NULL,
    lotNum VARCHAR
(100) NOT NULL,
    quantity INT NOT NULL,
    isCurrentLot BOOLEAN NOT NULL,
    isNewLot BOOLEAN NOT NULL,
    par INT NOT NULL,
    countPerBox INT NOT NULL,
    expirationDate DATETIME NOT NULL,
    orderID VARCHAR
(100) NOT NULL,
    instrumentID VARCHAR(10) NOT NULL DEFAULT 'Abl',
    PRIMARY KEY
(id)
);

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("cal1", "Calibration Solution 1", "QK9-2KJS9A", 10, TRUE, FALSE, 10, 4, "2023-05-30 00:00:00", "AKLJDWEWFDSJK298");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("cal2", "Calibration Solution 2", "FEWOI-SLKQ", 10, TRUE, FALSE, 10, 4, "2023-06-30 00:00:00", "SKEWOIFD23092");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("cal2", "Calibration Solution 2", "ODWEOI2-DDS0", 10, FALSE, TRUE, 10, 4, "2025-10-30 00:00:00", "WEKLD389SDKJ");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("metClean", "Cleaning Met II Solution", "EWOI-23", 10, TRUE, FALSE, 10, 4, "2022-12-30 00:00:00", "TRO-232LKSDF");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("gas1", "Gas Cylinder 1", "FJIEOO-SFJ", 10, TRUE, FALSE, 4, 2, "2026-01-30 00:00:00", "WQPKSDKEWIO");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("gas2", "Gas Cylinder 2", "WEOI-SDK", 10, TRUE, FALSE, 4, 2, "2026-02-28 00:00:00", "OIWQK2392KDS8S");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("rinseSoln", "Rinse Solution", "WALK-K3-DSLK", 10, TRUE, FALSE, 20, 8, "2021-07-30 00:00:00", "OIWLKDSALKEWIDJK2K2");

INSERT INTO abl
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES ("wasteContainer", "Waste Container", "WEOIPSLK-23SDKL-1KL", 10, TRUE, FALSE, 20, 8, "2030-01-30 00:00:00", "DSLKOIWELKLKDS22K22");

CREATE TABLE
IF NOT EXISTS abl_transactions
(
	id INT AUTO_INCREMENT,
    lotNum VARCHAR
(100) NOT NULL,
    transactionType VARCHAR
(10) NOT NULL,
    amount int NULL,
    numBoxesReceived INT NULL,
    quantityInStock int NULL,
    timestamp BIGINT,
    PRIMARY KEY
(id)
);