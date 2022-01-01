import DBConnection from "./../configs/connectDB";

let updateFName = (fname,user) => {
    const updateFirstName = "UPDATE user SET name='"+fname+"' WHERE name='"+user.name+"' AND iduser="+user.iduser;
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updateFirstName, 
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let updateLName = (lname,user) => {
    const updateLastName = "UPDATE user SET fname='"+lname+"' WHERE fname='"+user.fname+"' AND iduser="+user.iduser;
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updateLastName, 
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let updateEmail = (email,user) => {
    const updatemail = "UPDATE user SET email='"+email+"' WHERE email='"+user.email+"' AND iduser="+user.iduser;
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updatemail, 
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let updatePassword = (password,user) => {
    const updatePass = "UPDATE user SET password='"+password+"' WHERE password='"+user.password+"' AND iduser="+user.iduser;
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updatePass, 
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    updateFName: updateFName,
    updateLName: updateLName,
    updateEmail: updateEmail,
    updatePassword: updatePassword,
};