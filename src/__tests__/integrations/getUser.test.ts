import { invalidTokenMock, loginUserMock } from "../__mocks__/user.mocks";
import { request } from "../utils/request";

describe("Integration test: get user", () => {
   test("should be able to get user successfully", async () => {
      const { user, token } = await loginUserMock();

      const data = await request
         .get("/users")
         .set("Authorization", token)
         .expect(200)
         .then((response) => response.body);

      expect(data.id).toBe(user.id);
      expect(data.name).toBe(user.name);
      expect(data.email).toBe(user.email);
   });

   test("should throw error when there in no token", async () => {
      const data = await request
         .get("/users")
         .expect(401)
         .then((response) => response.body);

      expect(data.message).toBe("Token is required.");
   });

   test("should throw error when token is invalid or expired", async () => {
      const token = await invalidTokenMock();

      await request
         .get("/users")
         .set("Authorization", token)
         .expect(401)
         .then((response) => response.body);
   });
});
