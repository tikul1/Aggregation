const students = require("../models/studentModel");

// get all student information
const studentList = async (req, res) => {
  try {
    const list = await students.find();
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ msg: "an error occured" });
  }
};

const studentAdd = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile } = req.body;
    const studentExist = await students.findOne({ email });
    if (studentExist) {
      res.status(401).json({ msg: "Student already exist" });
    } else {
      const student = await new students({
        firstname,
        lastname,
        email,
        mobile,
      });
      await student.save();
      res.status(200).json({ msg: "student added sucessfully" });
    }
  } catch (error) {
    res.status(400).json("An error occured");
  }
};

const studentSearch = async (req, res) => {
  try {
    const { firstname, lastname } = req.query;
    await students.find(req.query).then((response) => {
      res.json({ response });
    });
  } catch (error) {
    res.json({ msg: "An Error occured: " + error });
  }
};

module.exports = {
  studentAdd,
  studentList,
  studentSearch,
};
