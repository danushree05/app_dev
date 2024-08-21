
const TraderModel = require("../../models/traderModel");

// Controller to get trader by email
const getTraderByEmail = async (req, res) => {
  try {
    // Extract the email from query parameters
    const { email } = req.query;

    // Check if the email parameter is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    // Search for the trader in the database
    const trader = await TraderModel.findOne({ email });

    // If trader not found, return a 404 error
    if (!trader) {
      return res.status(404).json({
        success: false,
        message: "Trader not found",
      });
    }

    // If trader found, return the trader details
    res.status(200).json({
      success: true,
      trader,
    });
  } catch (error) {
    // Log the error and return a 500 server error response
    console.error("Error fetching trader details:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { getTraderByEmail };
