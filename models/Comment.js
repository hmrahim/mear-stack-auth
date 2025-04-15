const { model, Schema } = require("mongoose");
const Post = require("./Post");
const User = require("./User");
const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  replies: [
    {
      body: {
        types: String,
        required: true,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    },
  ],
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;
