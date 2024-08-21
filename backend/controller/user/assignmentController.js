const Assignment = require("../../models/assignmentModel");
const User = require("../../models/productModelForHome");
exports.createAssignment = async (req, res) => {
  const {
    traderId,
    traderEmail,
    userId,
    userEmail,
    status,
    remarks,
    phoneNumber,
    location,
    productName,
    category,
    dueDate,
  } = req.body;

  try {
    const assignment = new Assignment({
      traderId,
      traderEmail,
      userId,
      userEmail,
      status,
      remarks,
      phoneNumber,
      location,
      productName,
      category,
      dueDate,
    });

    await assignment.save();
    res
      .status(201)
      .json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error });
  }
};
// In your assignment controller

exports.getAssignments = async (req, res) => {
  // Extract email from query parameters
  const traderEmail = req.query.email;

  // Debug statement to log the email received in the request
  console.log("Received email query parameter:", traderEmail);

  try {
    // Check if the email query parameter is provided
    if (!traderEmail) {
      console.log("Error: Email query parameter is missing.");
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    // Query the database for assignments with the provided email
    const tasks = await Assignment.find({ traderEmail });

    // Debug statement to log the tasks fetched from the database
    console.log("Fetched tasks:", tasks);

    // Check if any tasks were found
    if (tasks.length === 0) {
      console.log("No tasks found for the email:", traderEmail);
      return res.status(404).json({
        success: false,
        message: "No tasks found for this trader",
      });
    }

    // Return the tasks if found
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    // Log any error encountered
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// In your assignment controller

exports.deleteAssignment = async (req, res) => {
  const assignmentId = req.params.id; // Get the assignment ID from URL parameters
  const userEmail = req.params.email; // Get the user email from URL parameters

  try {
    // Find and delete the assignment by ID
    const result = await Assignment.findByIdAndDelete(assignmentId);

    // Check if an assignment was found and deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }
    //update points
    //  const user = await User.findOne({ email: userEmail });
    //  if (user) {
    //    user.points = (user.points || 0) + 50;
    //    await user.save();
    //  }
    // Remove the e-waste entry from the user's database
    const userUpdateResult = await User.updateOne(
      { email: userEmail },
      { $pull: { ewasteEntries: { assignmentId: assignmentId } } } // Modify according to your schema
    );

    if (userUpdateResult.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: "User's e-waste entry not found",
      });
    }

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Assignment and e-waste entry deleted successfully",
    });
  } catch (error) {
    // Log any error encountered
    console.error("Error deleting assignment and e-waste entry:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};