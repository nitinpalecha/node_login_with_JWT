const { create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, result) => {
            if (err) {
                console.log('errerrerrerrerr', err);
                return res.status(500)({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                status: '200',
                message: 'Data has been inserted',
                data: result
            });
        })
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, result) => {
            if (err) {
                console.log(err);
                return
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                status: '200',
                message: 'Record inserted successfully...!',
                data: result
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: result
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "Update successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, result) => {
            console.log("emailemailemail", body, result, err);
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "Invalid email and password"
                });
            }
            const passResult = compareSync(body.password, result.password);
            if (passResult) {
                result.password = undefined;
                // here we don't want to password in web token so we undefinding password
                const jsonToken = sign({ passResult: result }, "nitin1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login Successfully",
                    token: jsonToken
                })
            }
            else {
                return res.json({
                    success: 2,
                    message: "Invalid Email and Password",
                })
            }
        });
    }
}