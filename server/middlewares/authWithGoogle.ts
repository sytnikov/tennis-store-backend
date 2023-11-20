import GoogleTokenStrategy from "passport-google-id-token";
import "dotenv/config";
import { ApiError } from "./errors/ApiError";
import UserRepo from "../models/UserModel"

export const authWithGoogle = () => {
      console.log(process.env.GOOGLE_CLIENT_ID);
  return new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
    },
    async function (parsedToken, googleId, done) {
      const { email, name } = parsedToken.payload;
      try {
        let user = await UserRepo.findOne({ email })
        if (!user) {
          const newUser = new UserRepo({
            name,
            email,
          });

          await newUser.save();
          user = newUser;
        }
          console.log("🚀 ~ file: authWithGoogle.ts:24 ~ user:", user);
        done(false, user);
      } catch (error) {
        return done(ApiError.forbidden("google authentication failed"));
      }
    }
  );
};
