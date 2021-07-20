const express = require("express");

const router = express.Router();

const Post = require("../models/post");

router.post("", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
      },
    });
  });
});

router.put("/:id", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.json({
      message: "Updated successfully",
      result,
    });
  });
});

router.get("", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts fetched successfully.",
        posts,
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((resData) => {
      res.status(200).json({
        message: "Document deleted successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Document could not be found",
        error: err,
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({
        message: "Post was found successfully",
        post,
      });
    } else {
      res.status(404).json({
        message: "Post was not found",
        error: err,
      });
    }
  });
});

module.exports = router;
