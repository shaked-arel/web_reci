import express from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
import searchController from "../controllers/searchController";
import updateController from "../controllers/updateController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";

initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/" ,(req, res)=>{
        return res.render("homepage.ejs" ,{
            errors: req.flash("errors")
        });
    });
    router.get("/login",loginController.getLoginPage);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/recipePage", (req, res)=>{
        return res.render("recipePage.ejs")});

    router.get("/register", registerController.getRegisterPage);
    router.post("/register", auth.validateRegister ,registerController.createNewUser);
    router.post("/searchByName", searchController.findRecipeByName);
    router.post("/searchByIng",searchController.findRecipeByIngredients);
    router.get("/getFavorites", searchController.getMyFavorites);
    router.get("/getRecommended",searchController.getRecommended);
    router.post("/searchByNut", searchController.findByNutr);
    router.post("/getTop10", searchController.findTop10);
    router.post("/getRecipe",searchController.getRecipeById);
    router.post("/updatefname",updateController.updateFName);
    router.post("/updatelname",updateController.updateLName);
    router.post("/updateEmail",updateController.updateEmail);
    router.post("/updatePassword",updateController.updatePassword);
    router.post('/getRate', searchController.setRate);
    router.get("/log-out",loginController.postLogOut);
    router.get("/deleteRate",searchController.deleteRate);
    router.get("/home",(req,res)=>{
        return res.render("home.ejs",{
            user: req.user
        });
    })
    return app.use("/", router);
};

module.exports = initWebRoutes;