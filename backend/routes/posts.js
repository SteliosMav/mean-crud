const express = require("express");
const multer = require("multer");

const router = express.Router();

const Post = require("../models/post");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalide mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

router.post("", multer({ storage: storage }).single("image"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
  });
  post.save().then((post) => {
    return res.status(201).json({
      message: "Post added successfully",
      post,
    });
  });
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = {
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
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
  Post.findById(req.params.id)
    .then((post) => {
      res.status(200).json({
        message: "Post was found successfully",
        post,
      });
    })
    .catch((result) => {
      res.status(400).json({
        message: "Post was not found",
        result: result,
      });
    });
});

module.exports = router;
