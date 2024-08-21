
// const productModelForHome = require("../../models/productModelForHome");
// const locationService = require("../../services/locationService");

// async function allEwasteUploads(req, res) {
//   try {
//     console.log("Fetching all e-waste uploads for user:", req.userId);

//     const allEwasteUploads = await productModelForHome.find();

//     res.json({
//       message: "All e-waste uploads fetched successfully",
//       data: allEwasteUploads,
//       success: true,
//       error: false,
//     });
//   } catch (err) {
//     console.error("Error fetching e-waste uploads:", err.message);
//     res.status(400).json({
//       message: err.message || err,
//       error: true,
//       success: false,
//     });
//   }
// }

// async function assignTraderToUser(req, res) {
//   try {
//     const { traderId, userId, status, remarks } = req.body;

//     // Find and update the e-waste upload record
//     const updatedProduct = await productModelForHome.findByIdAndUpdate(
//       userId,
//       { status, remarks, traderId },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({
//         message: "E-waste upload not found",
//         success: false,
//         error: true,
//       });
//     }

//     res.json({
//       message: "Trader assigned successfully",
//       data: updatedProduct,
//       success: true,
//       error: false,
//     });
//   } catch (err) {
//     console.error("Error assigning trader to user:", err.message);
//     res.status(400).json({
//       message: err.message || err,
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = {
//   allEwasteUploads,
//   assignTraderToUser,
// };
// controllers/productController.js
const productModelForHome = require("../../models/productModelForHome");
const locationService = require("../../services/locationService");
const sendEmail = require("../../services/emailService"); // Assuming you have an email service setup

async function allEwasteUploads(req, res) {
  try {
    console.log("Fetching all e-waste uploads for user:", req.userId);

    const allEwasteUploads = await productModelForHome.find();

    res.json({
      message: "All e-waste uploads fetched successfully",
      data: allEwasteUploads,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching e-waste uploads:", err.message);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

async function assignTraderToUser(req, res) {
  try {
    const { traderId, userId, status, remarks } = req.body;

    // Find and update the e-waste upload record
    const updatedProduct = await productModelForHome.findByIdAndUpdate(
      userId,
      { status, remarks, traderId },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "E-waste upload not found",
        success: false,
        error: true,
      });
    }

    // Optionally, send an email notification to the user
    await sendEmail(
      updatedProduct.username, // Assuming the username field contains the user's email
      "E-Waste Status Update",
      `Your e-waste item has been updated to status: ${status}. Remarks: ${remarks}.`
    );

    res.json({
      message: "Trader assigned successfully",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error assigning trader to user:", err.message);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

async function assignEwasteToTrader(req, res) {
  try {
    const { userLocation } = req.body;
    const assignedTrader = await locationService.assignTraderToUser(userLocation);

    if (!assignedTrader) {
      return res.status(404).json({
        message: "No trader found for the provided location",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Trader assigned to e-waste successfully",
      data: assignedTrader,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error assigning e-waste to trader:", err.message);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = {
  allEwasteUploads,
  assignTraderToUser,
  assignEwasteToTrader,
};
