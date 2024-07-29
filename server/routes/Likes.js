const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const { PostId } = req.body;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    Likes.create({ PostId: PostId, UserId: UserId });
    res.json("Liked the post");
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json("Unliked the post");
  }
});

module.exports = router;
