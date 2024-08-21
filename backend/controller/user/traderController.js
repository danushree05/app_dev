

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const traderModel = require("../../models/traderModel");
const userModel = require("../../models/userModel");

// Create a new trader
exports.createTrader = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const traderData = {
      ...req.body,
      password: hashedPassword,
    };

    const trader = new traderModel(traderData);
    await trader.save();

    // Create a corresponding user entry
    const userData = {
      name: trader.name,
      email: trader.email,
      password: hashedPassword, // Use the same hashed password
      role: "TRADER", // Set role if needed
      assignedTrader: trader._id,
    };

    const user = new userModel(userData);
    await user.save();

    res.status(201).json({ success: true, data: trader });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Trader sign-in (new function for JWT authentication)
exports.traderSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const trader = await traderModel.findOne({ email });

    if (!trader) {
      throw new Error("Trader not found");
    }

    const checkPassword = await bcrypt.compare(password, trader.password);

    if (checkPassword) {
      const tokenData = {
        _id: trader._id,
        email: trader.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h",
      });

      const tokenOption = {
        httpOnly: true,
        secure: true, // Set to true in production
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Fetch all traders
exports.getTraders = async (req, res) => {
  try {
    const traders = await traderModel.find();
    res.status(200).json({ success: true, data: traders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
