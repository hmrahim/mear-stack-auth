const { model, Schema } = require("mongoose");
const User = require("./User");
const Comment = require("./Comment");

const postSchema = new Schema(
  {
    title: {
      types: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: String,
    readTime: String,
    likes: [
      {
        type: Schema.types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        types: Schema.types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
module.exports = Post;
