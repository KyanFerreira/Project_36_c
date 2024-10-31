const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register a new instructor account (Works with Prisma)
router.post("/register", async (req, res, next) => {
  try {

    const instructor = await prisma.instructor.create({
      data: {
        username: req.body.username,
        password: req.body.password
      },
    })

/*
    const {
      rows: [instructor],
    } = await db.query(
      "INSERT INTO instructor (username, password) VALUES ($1, $2) RETURNING *",
      [req.body.username, req.body.password]
    );

*/

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing instructor account Works with Prisma
router.post("/login", async (req, res, next) => {
  try {

    const instructor = await prisma.instructor.findUnique({
      where: {
        username: req.body.username,
        password: req.body.password
      },
    })

    /*
    const {
      rows: [instructor],
    } = await db.query(
      "SELECT * FROM instructor WHERE username = $1 AND password = $2",
      [req.body.username, req.body.password]
    );

    if (!instructor) {
      return res.status(401).send("Invalid login credentials.");
    }

    */
    // Create a token with the instructor id
    
    if (!instructor) {
      return res.status(401).send("Invalid login credentials.");
    }

    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in instructor (Works with Prisma)
router.get("/me", async (req, res, next) => {
  try {
    
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: req.user?.id
      },
    })
    res.send(instructor);
    
    /*
    const {
      rows: [instructor],
    } = await db.query("SELECT * FROM instructor WHERE id = $1", [
      req.user?.id,
    ]);

    res.send(instructor);
    */
  } catch (error) {
    next(error);
  }
});

module.exports = router;
