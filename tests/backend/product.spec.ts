import request from "supertest";

describe("Random Dog Image", () => {
  it("shows the products from our server", async () => {
    await request("http://localhost:3000")
      .get("/api/product")
      .expect(500)
      .expect("Content-Type", "application/json")
      .expect({
        error: {
          name: "PrismaClientInitializationError",
          clientVersion: "5.8.1",
        },
      });
  });
});
