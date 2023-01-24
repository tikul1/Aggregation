const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    marks: {
      type: Number,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Marks", marksSchema);