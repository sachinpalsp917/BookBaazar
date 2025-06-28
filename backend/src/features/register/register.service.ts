import { ConflictError } from "../../lib/errors";
import { ApiModel } from "../../models/api.models";
import { UserModel } from "../../models/user.models";
import crypto from "crypto";
import { oneHourFromNow } from "../../utils/date";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../constants/env";

export default class RegisterService {
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userAgent?: string
  ) {
    const username = firstName.concat("_", lastName);
    //1. verify user doesn't exist
    //2. create user
    //3. create verification token
    //4. send verification email
    //5. create api key
    //6. sign access and refesh token
    //7. return user, refresh and access token

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const verificationCode = crypto.randomBytes(32).toString("hex");
    const newUser = await UserModel.create({
      username,
      email,
      password,
      emailVerificationToken: verificationCode,
      emailVerificationExpiry: oneHourFromNow,
    });

    const apikey = crypto.randomBytes(36).toString("hex");

    //send email -> done later
    const Api_key = await ApiModel.create({
      userId: newUser._id,
      api_key: apikey,
      userAgent: userAgent,
    });

    const refreshToken = jwt.sign(
      { API_KEY: Api_key.api_key },
      JWT_REFRESH_SECRET,
      {
        audience: ["user"],
        expiresIn: "30d",
      }
    );

    const accessToken = jwt.sign(
      { userId: newUser._id, API_KEY: Api_key.api_key },
      JWT_SECRET,
      {
        audience: ["user"],
        expiresIn: "15m",
      }
    );

    return { user: newUser.omitPassword(), refreshToken, accessToken };
  }
}
