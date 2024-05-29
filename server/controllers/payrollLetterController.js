// controllers/PayrollLetterController.js
const PayrollLetter = require("../models").PayrollLetter;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createPayrollLetter = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    // find active lease id for this user id
    const lease_id = user_id;

    const PayrollLetter = await PayrollLetter.create({
      status: "pending",
      lease_id,
    });

    res
      .status(201)
      .json({ message: "PayrollLetter created successfully", PayrollLetter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPayrollLetters = async (req, res) => {
  try {
    const PayrollLetters = await PayrollLetter.findAll();

    res.status(200).json({ PayrollLetters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPayrollLetterById = async (req, res) => {
  try {
    const { id } = req.params;

    const PayrollLetter = await PayrollLetter.findByPk(id);

    if (!PayrollLetter) {
      return res.status(404).json({ error: "PayrollLetter not found" });
    }

    res.status(200).json({ PayrollLetter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePayrollLetter = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedPayrollLetters] =
      await PayrollLetter.update(req.body, {
        where: { ad_id: id },
        returning: true,
      });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "PayrollLetter not found" });
    }

    res.json(updatedPayrollLetters[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePayrollLetter = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await PayrollLetter.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "PayrollLetter not found" });
    }

    res.json({ message: "PayrollLetter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayrollLetter,
  getPayrollLetters,
  getPayrollLetterById,
  updatePayrollLetter,
  deletePayrollLetter,
};

// generate word document
// authorize lease
