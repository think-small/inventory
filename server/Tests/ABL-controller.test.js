const app = require("../app");
const supertest = require("supertest");
const db = require("../db");
const api = supertest(app);

beforeEach(async () => {
    await db.query("DELETE FROM test_abl");
    await db.query("DELETE FROM test_abl_transactions");
});

describe("GET /api/ABL/all-items...", () => {
    test("returns status code 200 for success", async () => {
        await api.get("/api/ABL/all-items").expect(200);
    });
    test("returns all items as JSON", async () => {
        await api.get("/api/ABL/all-items").expect("Content-Type", /application\/json/);
    });
});

afterAll(() => {
    db.end(err => console.error(err));
})