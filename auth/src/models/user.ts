import mongoose, { mongo } from "mongoose";
import { Password } from "../services/password";

// an interface that describe the properties that are required to create a new User

interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describe the properites that a userModal has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties that a User Document has

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requierd: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const password = this.get("password");
    if (password) {
      const hashedPassword = await Password.toHash(password);
      this.set("password", hashedPassword);
    }
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

//127.0.0.1 ticketing.dev
// Set-ExecutionPolicy Bypass -Scope Process.
// Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
