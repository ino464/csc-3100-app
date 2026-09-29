import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    job: String,
  },
  { collection: "users_list" },
);

export default mongoose.model("User", userSchema);
