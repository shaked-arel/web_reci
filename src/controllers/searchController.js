import searchService from "../services/searchService";

let rename = (recipe) => {
    console.log(recipe);
    console.log(recipe[0]);
    recipe = recipe.replace(/\(/g, "");
    recipe = recipe.replace(/\)/g, "");
    recipe = recipe.replace(/&/g, "");
    recipe = recipe.replace(/;/g, "");
   /* for(var i=0; i<Object.keys(recipe).length;i++){
        recipe[i].replace(/\(/g, "");
        recipe[i].replace(/\)/g, "");
    }*/
    console.log("----------------------")
    console.log(recipe);
    return recipe;  
}

let findRecipeByName = async (req, res) => {
    try {
        await searchService.findRecipeByName(req.body.contain).then(async (rows) => {
            //  console.log(rows);
            //console.log(typeof(rows));
            let ans = JSON.stringify(rows);
            return res.send(rename(ans));
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
    //searchService.findRecipeByName(req.body.contain)
}

let findRecipeByIngredients = async (req, res) => {
    console.log("in controller");
    let usedNotUsed = "";
    if (typeof (req.body.UsedNotUsed) === 'undefined') {
        usedNotUsed = "off";
    } else {
        console.log("on");
        usedNotUsed = "on";
    }
    console.log(req.body.ing);
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
    //  console.log("in controller");
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
    //  console.log("in controller");
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
    //  console.log("in controller");
    console.log(req.body);
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
    //  console.log("in controller");
    console.log(req.body.lowhigh);
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
            console.log(recipeInfo);
            return res.render("recipePage.ejs", {
                recipeInfo: recipeInfo
            })
        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let setRate = async (req, res) => {
    console.log(req.body.rate);
    console.log(req.user.iduser)
    try {
        await searchService.setRate(req.user.iduser, idrec, req.body.rate).then(async (rows) => {
            req.flash(JSON.stringify(rows));
            return res.redirect("/home");


        });
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let deleteRate = async (req, res) => {
    //console.log(req.body.rate);
    console.log(req.user.iduser)
    try {
        await searchService.deleteRate(req.user.iduser, idrec).then(async (rows) => {
            req.flash(JSON.stringify(rows));
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