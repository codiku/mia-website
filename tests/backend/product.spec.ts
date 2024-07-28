import request from "supertest";

describe("/products", () => {
  it("GET ALL PRODUCTS should be protected", async () => {
    await request("http://localhost:3000")
      .get("/api/product")
      .expect(401)
      .expect("Content-Type", "application/json");
    // .expect({
    //   error: {
    //     name: "PrismaClientInitializationError",
    //     clientVersion: "5.8.1",
    //   },
    // });
  });
});
