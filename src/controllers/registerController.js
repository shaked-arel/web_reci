import { validationResult } from "express-validator";
import registerService from "../services/registerService";
let getRegisterPage = (req, res) => {
    return res.render("register.ejs", {
        errors: req.flash("errors")
    });
};
let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //create a new user
    let newUser = {
        id: req.body.userid,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    try {
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};
module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
}