USE Inventory;
CREATE TABLE
IF NOT EXISTS Architect
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
    PRIMARY KEY
(id)
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "hepBsAg", "Hepatitis B Surface Antigen Reagent", "SLKW-ZKL28", 10, TRUE, FALSE, 4, 2, "2022-08-30 00:00:00", "SLKW22KZ23JK2KL"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "hepBsAg", "Hepatitis B Surface Antigen Reagent", "Q92S-2LKS", 10, FALSE, TRUE, 4, 2, "2023-02-28 00:00:00", "VBWIW02KJSJK23L"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "hepBsAgNeut", "Hepatitis B Surface Antigen Neutralization Reagent", "WEOIZ-2KLZKL-2LK", 10, TRUE, FALSE, 4, 2, "2021-10-30 00:00:00", "ACXM9832DSJKZJK"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "hepCAbReagent", "Hepatitis C Antibody Reagent", "FIWE-23SDKL-2KL", 10, TRUE, FALSE, 4, 2, "2024-03-30 00:00:00", "OI23908X1KLSIU3"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "tropi", "Troponin I Reagent", "CXM2389", 10, TRUE, FALSE, 4, 2, "2026-12-30 00:00:00", "XZOI398DJKFDKJ320287"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "tropi", "Troponin I Reagent", "2KLJAKJ", 10, FALSE, TRUE, 4, 2, "2027-04-30 00:00:00", "VNERJK4389DFKSDKJ2398SLKZ"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "hcyReagent", "Homocysteine Reagent", "SLKJ-2398", 10, TRUE, FALSE, 4, 2, "2020-11-30 00:00:00", "TEIO298ZLK2398ASKL"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "rv", "Reaction Vessels", "SDLK32398S0", 10, TRUE, FALSE, 4, 2, "2030-12-30 00:00:00", "PWOI3-ZJK32"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "washBuffer", "Concentrated Wash Buffer", "XLK34023JK", 10, TRUE, FALSE, 4, 2, "2025-09-30 00:00:00", "IOWLXM1223984902"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "triggerSoln", "Trigger Solution", "SDKLDS23-XKLS", 10, TRUE, FALSE, 4, 2, "2020-11-30 00:00:00", "WQI239890438U9DN"
);

INSERT INTO Architect
    (
    reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID
    )
VALUES
    (
        "preTriggerSoln", "Pre Trigger Solution", "RELK23M", 10, TRUE, FALSE, 4, 2, "2020-12-30 00:00:00", "383289ZSJ23JKOcobas_8100_transactions"
);

CREATE TABLE
IF NOT EXISTS architect_transactions
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

SELECT *
FROM architect_transactions;