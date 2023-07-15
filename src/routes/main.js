const express = require("express");
const router = express.Router();
const Students = require("../models/student");
const Groups = require("../models/group");
const Users = require("../models/user");
const authMiddleWare = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const generateTokens = require("../../utils/generate");
const config = require("../../config/secrets");

router.post("/studentcreate", authMiddleWare, async (req, res) => {
  const student = new Students(req.body);

  const savedStudent = await student.save();

  res.status(201).json(savedStudent);
});

router.post("/groupcreate", authMiddleWare, async (req, res) => {
  const groups = new Groups(req.body);

  const savedGroups = await groups.save();

  res.status(201).json(savedGroups);
});

router.get("/:groupId/students", authMiddleWare, async (req, res) => {
  try {
    const students = await Students.find({
      groupNumber: req.params.groupId,
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/groups", authMiddleWare, async (req, res) => {
  try {
    let allGroups = await Groups.find();

    res.status(200).json(allGroups);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/signup", async (req, res) => {
  const users = new Users(req.body);

  const savedUsers = await users.save();

  res.status(201).json(savedUsers);
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ fullName: req.body.fullName });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    res.send({ user, tokens: generateTokens(user) });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post("/refreshtoken", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const userId = decoded?.id;

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(401).send("Invalid refresh token");
    }
    const accessToken = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
