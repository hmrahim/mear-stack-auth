const { model, Schema } = require("mongoose");
const User = require("./User");
const Post = require("./Post");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    profilePic: {
      type: String,
    },
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
    },
    posts: [
      {
        type: Schema.types.ObjectId,
        ref: "Post",
      },
    ],
    bookmark: [
      {
        types: Schema.types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
