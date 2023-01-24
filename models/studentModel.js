const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
        type: Number,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);