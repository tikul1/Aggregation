const marks = require("../models/marksModel");
const students = require("../models/studentModel");

// get all student information
const marksList = async (req, res) => {
  try {
    const list = await marks.find();
    // .populate("studentId", "_id firstname lastname").populate("subjectId", "_id subjectName status");
    res.status(200).json({ list });
  } catch (e) {
    res.status(400).json({ msg: "an error occured!!!!!!!!!!!!!!!!!!!!!!!" });
  }
};

// // adding student infomation

const markAdd = async (req, res) => {
  try {
    const mark = await new marks({
      studentId: req.body.studentId,
      subjectId: req.body.subjectId,
      marks: req.body.marks,
    });
    await mark.save();
    res.json(mark);
  } catch (error) {
    res.json("Error Occured!!!!!!!!!!!!!!!!!!!!");
  }
};

const report = async (req, res) => {
  try {
    let fName = req.query.firstname ? req.query.firstname : "";
    let lName = req.query.lastname ? req.query.lastname : "";
    let sName = req.query.subject ? req.query.subject : "";
    const studentDetails = await students.aggregate([
      {
        $match: {
          $or: [
            {
              firstname: {
                $regex: fName,
              },
              lastname: {
                $regex: lName,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "marks",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$studentId", "$$id"] }] } } },
            {
              $lookup: {
                from: "subjects",
                let: { id: "$subjectId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        // $or: {
                        $eq: ["$_id", "$$id"],
                        //   subjectName: {
                        //     $regex: sName,
                        //   },
                        // },
                      },
                    },
                  },
                  {
                    $project: {
                      subjectName: {
                        $cond: {
                          if: {
                            $regexMatch: {
                              input: "$subjectName",
                              regex: sName,
                            },
                          },
                          then: "$subjectName",
                          else: 0,
                        },
                      },

                      status: 1,
                      _id: 0,
                    },
                  },
                ],
                as: "subjects",
              },
            },
            { $project: { subjects: 1, _id: 0, marks: 1 } },
          ],
          as: "marks",
        },
      },
      {
        $project: {
          totalMarks: { $sum: "$marks.marks" },
          totalSubject: { $size: "$marks.subjects" },
          avgMarks: { $divide: [{ $sum: "$marks.marks" }, { $size: "$marks.subjects" }] },
          fullName: { $concat: ["$firstname", " ", "$lastname"] },
          marks: 1,
          firstname: 1,
          lastname: 1,
          subjects: 1,
          email: 1,
          mobile: 1,
          _id: 0,
        },
      },
    ]);

    res.json(studentDetails);
  } catch (error) {
    res.json("Error Occured!!!!!!!!!!!!!");
  }
};

module.exports = {
  markAdd,
  marksList,
  report,
};
