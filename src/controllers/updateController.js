import updateService from "../services/updateService";

let updateFName = async (req,res)=>{
    try {
        await updateService.updateFName(req.body.fname,req.user).then(async (rows) => {
        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let updateLName = async (req,res)=>{
    try {
        await updateService.updateLName(req.body.lname,req.user).then(async (rows) => {
        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let updateEmail = async (req,res)=>{
    try {
        await updateService.updateEmail(req.body.email,req.user).then(async (rows) => {
        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let updatePassword = async (req,res)=>{
    try {
        await updateService.updatePassword(req.body.password,req.user).then(async (rows) => {
        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

module.exports ={
    updateLName : updateLName,
    updateFName: updateFName,
    updatePassword: updatePassword,
    updateEmail: updateEmail,
};