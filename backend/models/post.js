const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: true },
  },
  { timestamps: true }
);

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

postSchema.set("toObject", {
  virtuals: true,
});

postSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);
