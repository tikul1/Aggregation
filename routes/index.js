const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/studentController");
const subjectController = require("../Controllers/subjectController")
const markController = require("../Controllers/marksController")

//student routes
router.get("/studentlist", studentController.studentList);
router.post("/addstudent", studentController.studentAdd);
router.get("/studentsearch", studentController.studentSearch);


//subject routes
router.get("/subjectlist", subjectController.subjectList);
router.post("/addsubject", subjectController.subjectAdd);
router.get("/subjectsearch", subjectController.subjectSearch);


//marks routes
router.get("/markslist", markController.marksList);
router.post("/addmarks", markController.markAdd);
router.post("/report", markController.report);


module.exports = router;