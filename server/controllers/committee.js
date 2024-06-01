const { Committee, User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const generateTempPassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Function to send email
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email_address, // replace with your email
      pass: process.env.email_password, // replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.email_address,
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

// Create Committee Member and send invite
const invitePrimaryCommitteeMember = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      surname,
      email,
      mobile_phone_number,
      position,
    } = req.body;

    // Generate temporary password
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create new user
    const newUser = await User.create({
      user_id: uuidv4(),
      first_name,
      last_name,
      surname,
      email,
      password: hashedPassword,
      mobile_phone_number,
    });

    // Assign committee role
    const newCommittee = await Committee.create({
      id: uuidv4(),
      position,
      date_of_assignment: new Date().toISOString(),
      UserId: newUser.user_id,
    });

    // Find primary committee role ID
    const primaryRole = await Role.findOne({
      where: { name: "primaryCommittee" },
    });
    if (!primaryRole) {
      return res
        .status(400)
        .json({ error: "Primary Committee role not found" });
    }

    // Assign primary committee role to the user
    await UserRole.create({
      user_id: newUser.user_id,
      role_id: primaryRole.id,
    });

    // Send email with temporary password
    const emailSubject = "Welcome to the Committee!";
    const emailText = `Dear ${first_name} ${last_name},\n\nYou have been invited to join the primary committee as a ${position}. Your temporary password is ${tempPassword}. Please change your password upon first login.\n\nBest regards,\nCommittee Team`;

    await sendEmail(email, emailSubject, emailText);

    res.status(201).json({
      message: "Primary Committee member invited successfully",
      newUser,
      newCommittee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Committee Member and send invite for secondary committee
const inviteSecondaryCommitteeMember = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      surname,
      email,
      mobile_phone_number,
      position,
    } = req.body;

    // Generate temporary password
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create new user
    const newUser = await User.create({
      user_id: uuidv4(),
      first_name,
      last_name,
      surname,
      email,
      password: hashedPassword,
      mobile_phone_number,
    });

    // Assign committee role
    const newCommittee = await Committee.create({
      id: uuidv4(),
      position,
      date_of_assignment: new Date().toISOString(),
      UserId: newUser.user_id,
    });

    // Find secondary committee role ID
    const secondaryRole = await Role.findOne({
      where: { name: "secondaryCommittee" },
    });
    if (!secondaryRole) {
      return res
        .status(400)
        .json({ error: "Secondary Committee role not found" });
    }

    // Assign secondary committee role to the user
    await UserRole.create({
      user_id: newUser.user_id,
      role_id: secondaryRole.id,
    });

    // Send email with temporary password
    const emailSubject = "Welcome to the Committee!";
    const emailText = `Dear ${first_name} ${last_name},\n\nYou have been invited to join the committee as a ${position}. Your temporary password is ${tempPassword}. Please change your password upon first login.\n\nBest regards,\nCommittee Team`;

    await sendEmail(email, emailSubject, emailText);

    res.status(201).json({
      message: "Secondary Committee member invited successfully",
      newUser,
      newCommittee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Check committee assignment dates and notify VP

// Check committee assignment dates and notify VP
const checkCommitteeAssignments = async () => {
  try {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    const expiredAssignments = await Committee.findAll({
      where: {
        date_of_assignment: {
          [Op.lt]: twoYearsAgo,
        },
      },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    for (const assignment of expiredAssignments) {
      // Send email to VP
      const emailSubject = "Committee Assignment Expired";
      const emailText = `The committee assignment for ${assignment.user.first_name} ${assignment.user.last_name} has expired. Please take the necessary action.`;

      await sendEmail("vp_email@example.com", emailSubject, emailText);

      // Remove committee role
      await assignment.destroy();
    }
  } catch (error) {
    console.error("Error checking committee assignments:", error.message);
  }
};

// CRUD operations for Committee model
const createCommittee = async (req, res) => {
  try {
    const { position, date_of_assignment, UserId } = req.body;
    const newCommittee = await Committee.create({
      id: uuidv4(),
      position,
      date_of_assignment,
      UserId,
    });
    res
      .status(201)
      .json({ message: "Committee created successfully", newCommittee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommittees = async (req, res) => {
  try {
    const committees = await Committee.findAll();
    res.status(200).json({ committees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommitteeById = async (req, res) => {
  try {
    const { id } = req.params;
    const committee = await Committee.findByPk(id);

    if (!committee) {
      return res.status(404).json({ error: "Committee not found" });
    }

    res.status(200).json({ committee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommittee = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedCommittees] = await Committee.update(
      req.body,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Committee not found" });
    }

    res.json(updatedCommittees[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommittee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Committee.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Committee not found" });
    }

    res.json({ message: "Committee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Schedule a check for committee assignments
const scheduleAssignmentCheck = () => {
  setInterval(checkCommitteeAssignments, 24 * 60 * 60 * 1000); // Check daily
};

scheduleAssignmentCheck();

module.exports = {
  invitePrimaryCommitteeMember,
  inviteSecondaryCommitteeMember,
  createCommittee,
  getCommittees,
  getCommitteeById,
  updateCommittee,
  deleteCommittee,
};
