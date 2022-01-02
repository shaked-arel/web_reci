import searchService from "../services/searchService";

let rename = (recipe) => {
    recipe = recipe.replace(/\(/g, "");
    recipe = recipe.replace(/\)/g, "");
    recipe = recipe.replace(/&/g, "");
    recipe = recipe.replace(/;/g, "");
    return recipe;
}

let findRecipeByName = async (req, res) => {
    try {
        await searchService.findRecipeByName(req.body.contain).then(async (rows) => {

            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let findRecipeByIngredients = async (req, res) => {
    let usedNotUsed = "";
    if (typeof (req.body.UsedNotUsed) === 'undefined') {
        usedNotUsed = "off";
    } else {
        usedNotUsed = "on";
    }
       try {
        await searchService.findRecipeByIngredients(req.body.ing,usedNotUsed).then(async (rows) => {
            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}
let getMyFavorites = async (req, res) => {
    try {
        await searchService.getMyFavorites(req.user.iduser).then(async (rows) => {
            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let getRecommended = async (req, res) => {
    try {
        await searchService.getRecommended().then(async (rows) => {
            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let findByNutr = async (req, res) => {
    try {
        await searchService.findByNutr(req.body.nutritional, req.body.a).then(async (rows) => {
            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let findTop10 = async (req, res) => {
     let lowOrhigh = "";
    if (typeof (req.body.lowhigh) === 'undefined') {
        lowOrhigh = "off";
    } else {
        lowOrhigh = "on";
    }
    try {
        await searchService.findTop10(req.body.nutrition, lowOrhigh).then(async (rows) => {
            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let idrec;
let rate;

let getRecipeById = async (req, res) => {
    /*idrec = req.body.recipeId;
    try {
        await searchService.getRecipeById(req.body.recipeId).then(async (rows) => {
            await searchService.getRecipeRate(idrec).then(async (rateRec) => {
                rate = JSON.parse(rateRec);
            })
            let info = JSON.stringify(rows);
            let recInfo = JSON.parse(info);
            let recipeInfo = {
                id: recInfo[0].id,
                name: recInfo[0].name,
                description: recInfo[0].description.replace(/"|'/g,""),
                ing: recInfo[0].ingredients_raw_str.replace(/@/g, ","),
                serving: recInfo[0].servings,
                size: recInfo[0].serving_size,
                steps: recInfo[0].steps.replace(/"|'/g,""),
                rate: rate[0].rating,
            }
            console.log("here")
            return res.render("recipePage.ejs", {
                recipeInfo: recipeInfo
            });
        });

    } catch (err) {
        console.log("problam")
        let ans = JSON.stringify("there is no recipe with this id");
         return res.send(ans);
        req.flash("errors", err);
        return res.redirect("/login");

    }*/

    idrec = req.body.recipeId;
    try {
        await searchService.getRecipeById(req.body.recipeId).then(async (rows) => {
            await searchService.getRecipeRate(idrec).then(async (rateRec) => {
                rate = JSON.parse(rateRec);
            })
            let info = JSON.stringify(rows);
            let recInfo = JSON.parse(info);
            let recipeInfo = {
                id: recInfo[0].id,
                name: recInfo[0].name,
                description: recInfo[0].description.replace(/"|'/g,""),
                ing: recInfo[0].ingredients_raw_str.replace(/@/g, ","),
                serving: recInfo[0].servings,
                size: recInfo[0].serving_size,
                steps: recInfo[0].steps.replace(/"|'/g,""),
                rate: rate[0].rating,
            }
            return res.render("recipePage.ejs", {
                recipeInfo: recipeInfo
            })

        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/home");
    }
}

let setRate = async (req, res) => {
    try {
        await searchService.setRate(req.user.iduser, idrec, req.body.rate).then(async (rows) => {

            return res.redirect("/home");

        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let deleteRate = async (req, res) => {
    try {
        await searchService.deleteRate(req.user.iduser, idrec).then(async (rows) => {
            return res.redirect("/home");
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
    getRecipeById: getRecipeById,
    setRate: setRate,
    deleteRate: deleteRate,
};