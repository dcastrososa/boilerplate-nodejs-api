const { User } = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

class UsersController {
  static async create(req, res) {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(500).json({ message: "email already exist!" });

    try {
      const response = await User.create({
        email,
        password: encryptedPassword
      });

      delete response.dataValues.password;
      res.status(201).json(response.dataValues);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const checkPass = await bcrypt.compare(
        password,
        user.dataValues.password
      );

      if (checkPass) {
        const token = jwt.sign({ email }, config.secret, {
          expiresIn: "3000h"
        });

        delete user.password;

        return res.status(200).json({
          message: "Authentication successful",
          token,
          user
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UsersController;
