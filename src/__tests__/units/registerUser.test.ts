import { container } from "tsyringe";
import { UserServices } from "../../services/user.services";
import {
   completeUserMock,
   userMock,
   userRegisterBodyMock,
} from "../__mocks__/user.mocks";
import { prismaMock } from "../__mocks__/prisma";

describe("Unit test: register user", () => {
   test("register user should work correctly", async () => {
      const userServices = container.resolve(UserServices);

      const completeUser = await completeUserMock();

      prismaMock.user.create.mockResolvedValue(completeUser);
      const data = await userServices.register(userRegisterBodyMock);

      expect(data).toStrictEqual(userMock);
   });

   test("register user should throw error when email is already registered", async () => {
      const userServices = container.resolve(UserServices);

      const completeUser = await completeUserMock();

      prismaMock.user.findFirst.mockResolvedValue(completeUser);
      const register = async () => await userServices.register(userRegisterBodyMock);
      
      expect(register()).rejects.toThrow("This email is already registered");
   });
});
