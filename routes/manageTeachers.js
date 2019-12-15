const router = require("express").Router();
let isLoggedIn = require("../lib/isLoggedIn")

//Users Schema Imported Here
let userSchema = require("../schema/users.Schema");

//Students Schema Imported Here
let teacherSchema = require("../schema/teacher.Schema");


//Method To Render Manage Students Page
router.get("/manageTeachers", isLoggedIn, function (req, res) {
    res.render("ManageTeachers");
});

//Method To Get Students
router.get('/manageTeachers/getAllTeachers', isLoggedIn, function (req, res) {
    teacherSchema.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: "UserID",
                foreignField: "UserID",
                as: "user"
            }
        },
        {
            $lookup: {
                from: 'departments',
                localField: "DepartmentID",
                foreignField: "DepartmentID",
                as: "department"
            }
        },
        {
            $project: {
                FirstName: 1,
                LastName: 1,
                UserID: 1,
                DepartmentID: 1,
                Password: {$arrayElemAt: ["$user.Password", 0]},
                ContactNumber: {$arrayElemAt: ["$user.ContactNumber", 0]},
                teacherID: 1,
                User: {$arrayElemAt: ["$user", 0]},
                Department: {$arrayElemAt: ["$department", 0]}
            }
        }
    ]).exec(function (err, users) {
        if (err)
            res.sendStatus(500);
        else
            res.send(users);
    })
});

//Method To Edit Student Details
router.get("/manageTeachers/editStudent", isLoggedIn, function (req, res) {

});
module.exports = router;