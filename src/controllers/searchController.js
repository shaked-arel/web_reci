import searchService from "../services/searchService";

let findRecipeByName = async (req, res) => {
    try {
        //console.log(req.body.contain)
        await searchService.findRecipeByName(req.body.contain).then(async (rows) => {
            // console.log(rows);

        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
    //searchService.findRecipeByName(req.body.contain)
}

let findRecipeByIngredients = async (req, res) => {
    console.log("in controller");
    try {
        await searchService.findRecipeByIngredients(req.body.used, req.body.notUsed).then(async (rows) => {
            // console.log(rows);

        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}
let getMyFavorites = async (req, res) => {
    //  console.log("in controller");
    try {
        await searchService.getMyFavorites(req.user.iduser).then(async (rows) => {
            console.log(rows);

        });
        return res.redirect("/home");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let getRecommended = async (req, res) => {
    //  console.log("in controller");
    try {
        await searchService.getRecommended().then(async (rows) => {
            return res.send(JSON.stringify(rows));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let findByNutr = async (req, res) => {
    //  console.log("in controller");
    console.log(req.body);
    try {
        await searchService.findByNutr(req.body.nutritional, req.body.a).then(async (rows) => {
            return res.send(JSON.stringify(rows));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let findTop10 = async (req, res) => {
    //  console.log("in controller");
    console.log(req.body.lowhigh);
    let lowOrhigh = "";
    if(typeof(req.body.lowhigh)==='undefined'){
        lowOrhigh="off";
    }
    else{
        lowOrhigh="on";
    }
    try {
        await searchService.findTop10(req.body.nutrition, lowOrhigh).then(async (rows) => {
            return res.send(JSON.stringify(rows));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

module.exports = {
    findRecipeByName: findRecipeByName,
    findRecipeByIngredients: findRecipeByIngredients,
    getMyFavorites: getMyFavorites,
    getRecommended: getRecommended,
    findByNutr: findByNutr,
    findTop10: findTop10,
};