var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentModel = require("../models/student.model");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Studentrespond with a resource");
});

router.get("/add", function (req, res, next) {
  let newStudent = new StudentModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    dob: req.body.dob,
    department: req.body.department,
  });

  newStudent.save(function (err, newStudent) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        statu: 200,
        message: "Student added successfullys",
        studentObject: newStudent,
      });
    }
  });
});

router.get("/list", function (req, res, next) {
  StudentModel.find(function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        students: response,
      });
    }
  });
});

router.get("/search-by-name", function (req, res, next) {
  const firstName = req.query.firstName;
  StudentModel.find({ firstName: firstName }, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        students: response,
      });
    }
  });
});

router.delete("/delete-user", function (req, res, next) {
  const id = req.query.userId;
  StudentModel.findByIdAndDelete(id, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        student: response,
      });
    }
  });
});

module.exports = router;
