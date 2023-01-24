const subjects = require("../models/subjectModel");

// get all subjects information
const subjectList = async (req, res) => {
  try {
    const list = await subjects.find();
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ msg: "an error occured!!!!!!!!!!" });
  }
};

// // adding subjects infomation

const subjectAdd = async (req, res) => {
  try {
    const { subjectName, status } = req.body;
    const subjectExist = await subjects.findOne({ subjectName });
    if (subjectExist) {
      res.status(401).json({ msg: "subject already exist!!!!!!!!!!!!!!!" });
    } else {
      const subject = await new subjects({
        subjectName,
        status,
      });
      await subject.save();
      res.status(200).json({ msg: "subjects added sucessfully!!!!!!!!!!!" });
    }
  } catch (error) {
    res.status(400).json("An error occured");
  }
};

const subjectSearch = async (req, res) => {
  try {
    const { subject, status } = req.query;
    console.log(req.query);
    await subjects.find(req.query).then((response) => {
      res.json({ response });
    });
  } catch (error) {
    res.json({ msg: "An Error occured: " + error });
  }
};

module.exports = {
  subjectAdd,
  subjectList,
  subjectSearch,
};
