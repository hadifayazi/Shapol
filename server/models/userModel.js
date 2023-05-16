import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";
// import { randomBytes, createHash } from "crypto";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      max: 50,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 5,
      select: false,
    },
    passwordConfirmation: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: function (el) {
        return el === this.password;
      },
      message: "Password should be the same!",
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    bio: String,
    viewedProfile: Number,
    impressions: Number,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 12);
  this.passwordConfirmation = undefined;
  next();
});

//instanceMethode, comparing password and checking if they are correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await compare(candidatePassword, userPassword);
};

const User = model("User", userSchema);

export default User;
