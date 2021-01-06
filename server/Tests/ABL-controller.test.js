const app = require("../app");
const supertest = require("supertest");
const db = require("../db");
const api = supertest(app);

const initialABLItems = [
    {
        reagentName: "cal1",
        displayName: "CALIBRATION 1 SOLUTIONS",
        lotNum: "SKL2390-AKL23",
        quantity: 10,
        isCurrentLot: true,
        isNewLot: false,
        par: 4,
        countPerBox: 4,
        expirationDate: "2023-05-30 00:00:00",
        orderId: "23KJ392"
    },
    {
        reagentName: "AutoCheck2",
        displayName: "AUTOCHECK QC LEVEL 2",
        lotNum: "070",
        quantity: 12,
        isCurrentLot: true,
        isNewLot: false,
        par: 10,
        countPerBox: 8,
        expirationDate: "2023-06-30 00:00:00",
        orderId: "ZKJ290DJK2"
    },
    {
        reagentName: "InsletGasket",
        displayName: "INSLET GASKET",
        lotNum: "292KS9K2",
        quantity: 5,
        isCurrentLot: true,
        isNewLot: false,
        par: 5,
        countPerBox: 1,
        expirationDate: "2025-10-30 00:00:00",
        orderId: "SDKL2390SKL290"
    }
]

beforeEach(async () => {
    await db.query("DELETE FROM abl");
    await db.query("DELETE FROM abl_transactions");

    initialABLItems.forEach(({ reagentName, displayName, lotNum,
                          quantity, isCurrentLot, isNewLot,
                          par, countPerBox, expirationDate, orderId }) => {
        db.query('INSERT INTO Abl (reagentName, displayName, lotNum,  quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderID  ) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [reagentName, displayName, lotNum, quantity, isCurrentLot, isNewLot, par, countPerBox, expirationDate, orderId], (error, result) => {
                if (error) console.error(error);
                console.log(`Created ${displayName}`);
            });
    })
});

describe("GET /api/Item/all-items...", () => {
    test("returns HTTP 200 for success", async () => {
        await api.get("/api/Item/all-items").expect(200);
    });
    test("returns all items as JSON", async () => {
        const response = await api.get("/api/Item/all-items").expect("Content-Type", /application\/json/);
        const returnedItems = response.body;

        expect(returnedItems).toHaveLength(initialABLItems.length);
    });
});

afterAll(() => {
    db.end(err => console.error(err));
})