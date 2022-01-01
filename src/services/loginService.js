import DBConnection from "./../configs/connectDB";

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(email);
        if (user) {
            //compare password
            /*comparePassword(password, user)*/
            if (password.localeCompare(userObject.password) == 0) {
                resolve(true);
            } else {
                reject(`The password that you've entered is incorrect`);
            }
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};


let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `user` WHERE `email` = ?  ', email,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
let comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
        if (password.localeCompare(userObject.password) == 0) {
            resolve(true);
        } else {
            resolve(false);
        }
          } catch (e) {
              reject(e);
          }
    });
}; 
let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `user` WHERE `iduser` = ?  ', id,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    comparePassword: comparePassword,
    findUserById: findUserById,
};