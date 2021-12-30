import DBConnection from "./../configs/connectDB";

let updateFName = (fname,user) => {
    console.log(fname);
    console.log(user);
    const updateFirstName = "UPDATE user SET name='"+fname+"' WHERE name='"+user.name+"' AND iduser="+user.iduser;
    console.log(updateFirstName);
    return new Promise((resolve, reject) => {
        try {
           // console.log(str);
            DBConnection.query(
                updateFirstName, 
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
                        reject(err)
                    }
                    //let user = rows[0];
                    //console.log(rows)
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let updateLName = (lname,user) => {
    console.log(lname);
    console.log(user);
    const updateLastName = "UPDATE user SET fname='"+lname+"' WHERE fname='"+user.fname+"' AND iduser="+user.iduser;
    console.log(updateLastName);
    return new Promise((resolve, reject) => {
        try {
           // console.log(str);
            DBConnection.query(
                updateLastName, 
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
                        reject(err)
                    }
                    //let user = rows[0];
                    //console.log(rows)
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let updateEmail = (email,user) => {
    console.log(email);
    console.log(user);
    const updatemail = "UPDATE user SET email='"+email+"' WHERE email='"+user.email+"' AND iduser="+user.iduser;
    console.log(updatemail);
    return new Promise((resolve, reject) => {
        try {
           // console.log(str);
            DBConnection.query(
                updatemail, 
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
                        reject(err)
                    }
                    //let user = rows[0];
                    //console.log(rows)
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let updatePassword = (password,user) => {
    console.log(password);
    console.log(user);
    const updatePass = "UPDATE user SET password='"+password+"' WHERE password='"+user.password+"' AND iduser="+user.iduser;
    console.log(updatePass);
    return new Promise((resolve, reject) => {
        try {
           // console.log(str);
            DBConnection.query(
                updatePass, 
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
                        reject(err)
                    }
                    //let user = rows[0];
                    //console.log(rows)
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