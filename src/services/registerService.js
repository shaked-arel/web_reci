import DBConnection from "./../configs/connectDB";
//import bcrypt from "bcryptjs";

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        try {
            let check = await checkEmailUser(user.email);
            if (check) {
                reject(`This email "${data.email}" has already exist. Please choose an other email`);
            }
            else {
                let data = {
                    iduser: user.id,
                    name: user.firstname,
                    fname: user.lastname,
                    email: user.email,
                    password: user.password
                };

                DBConnection.query('INSERT INTO user set ?', data,
                    function (err, rows) {
                        if (err) {
                            if(err.code = 'ER_DUP_ENTRY'){
                            reject(`This password "${data.iduser}" has already exist - Please choose an other id`)
                            }
                        }
                        resolve("Create a new user successful");
                    })
            }


        }
        catch (e) {
            reject(e);
        }

    });
};

let checkEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `user` WHERE `email` = ? ', email,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    createNewUser: createNewUser
};