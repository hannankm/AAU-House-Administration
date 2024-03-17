const { House } = require("../models"); // Import your House model

const getAllHouses = async (req, res) => {
  try {
    const houses = await House.findAll();
    res.json({ houses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHouseById = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findByPk(id);

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    res.json({ house });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHouse = async (req, res) => {
  const {
    type,
    status,
    site,
    block,
    floor,
    rent,
    bed_cap,
    woreda,
    kebele,
    house_number,
  } = req.body;

  try {
    const newHouse = await House.create({
      type,
      status,
      site,
      block,
      floor,
      rent,
      bed_cap,
      woreda,
      kebele,
      house_number,
    });

    res
      .status(201)
      .json({ message: "House created successfully", house: newHouse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHouse = async (req, res) => {
  const { id } = req.params;
  const {
    type,
    status,
    site,
    block,
    floor,
    rent,
    bed_cap,
    woreda,
    kebele,
    house_number,
  } = req.body;

  try {
    const house = await House.findByPk(id);

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    await house.update({
      type,
      status,
      site,
      block,
      floor,
      rent,
      bed_cap,
      woreda,
      kebele,
      house_number,
    });

    res.json({ message: "House updated successfully", house });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findByPk(id);

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    await house.destroy();

    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmptyHouses = async (req, res) => {
  try {
    const houses = await House.findAll({
      where: { status: "empty" },
    });

    res.json({ houses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
  getEmptyHouses,
};
