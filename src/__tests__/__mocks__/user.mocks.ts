import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userMock = {
   id: "855ae363-9e01-483e-a6d4-1a20d64fa762",
   name: "John Doe",
   email: "johndoe@email.com",
};

export const completeUserMock = async () => {
   const hashPassword = await bcrypt.hash("12345678", 10);

   return {
      id: "855ae363-9e01-483e-a6d4-1a20d64fa762",
      name: "John Doe",
      email: "johndoe@email.com",
      password: hashPassword,
   };
};

export const userRegisterBodyMock = {
   name: "John Doe",
   email: "johndoe@email.com",
   password: "12345678",
};

export const userLoginBodyMock = {
   email: "johndoe@email.com",
   password: "12345678",
};

export const userLoginBodyWrongPasswordMock = {
    email: "johndoe@email.com",
    password: "123456",
 };

export const loginUserMock = async () => {
   const user = await prisma.user.create({ data: userRegisterBodyMock });

   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

   return { user, token };
};
