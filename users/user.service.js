const pool = require("../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
            values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, result, fields) => {
                console.log("resultresultresultresultresult", result)
                if (error) {
                    return callback(error)
                }
                return callback(null, result)
            }
        )
    },

    getUsers: callback => {
        pool.query(
            `select * from registration`,
            [],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result);
            }
        )
    },

    getUserByUserId: (id, callback) => {
        pool.query(
            `select * from registration where id = ?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, result[0]);
            }
        )
    },

    updateUser: (data, callback) => {
        pool.query(
            `update registration SET firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, result, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, result);

            }
        );
    },

    deleteUser: (data, callback) => {
        pool.query(
            `delete from registration where id =?`,
            [data.id],
            (error, result, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, result[0]);
            }
        );
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(
            `select * from registration where email =?`,
            [email],
            (error, result, fields) => {
                console.log("resultresultresultresultresult",email);
                if (error) {
                    callback(error);
                }
                return callback(null, result[0]);
            }
        );
    }
};