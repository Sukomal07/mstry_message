import { Schema, Document, model, models, Model } from "mongoose";
import { boolean } from "zod";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: [true, "content is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "createdAt is required"],
  },
});

export interface User extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  message: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is reuired"],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  message: [messageSchema],
});

const UserModel =
  (models.User as Model<User>) || model<User>("User", userSchema);

export default UserModel;
