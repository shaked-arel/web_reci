import DBConnection from "./../configs/connectDB";

let findRecipeByName = (str) => {
    const findRecipeByname = "SELECT id,name FROM recipe WHERE ( name LIKE '% "+str+" %' OR name LIKE '% "+str+"' OR name LIKE '"+str+" %' OR name LIKE '"+str+"' )";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findRecipeByname,
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

let findRecipeByIngredients = (prod,UsedNotUsed) => {
    let used_not_used = "not";
    if (UsedNotUsed.localeCompare("on") == 0) {
        used_not_used = ""
    }
    const findRecipeByIng = "SELECT id,name FROM recipe WHERE (id "+used_not_used+" IN (SELECT distinct idrecipe FROM product_in_recipe WHERE( idproduct IN (SELECT idproduct FROM product WHERE( food LIKE '% " + prod + " %' OR food LIKE '% " + prod + "' OR food LIKE '" + prod + " %' OR food LIKE '" + prod + "')))))LIMIT 30";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findRecipeByIng,
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

let getMyFavorites = (id) => {
    const findMyFavorites = "SELECT id,name FROM recipe,rate_by_user WHERE (recipe.id=rate_by_user.idrecipe AND iduser = "+id+" AND rate=5) ;";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findMyFavorites,
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

let getRecommended = () => {
    const findRecommended = "SELECT id,name FROM rate_by_user, recipe WHERE rate_by_user.idrecipe = recipe.id group by(idrecipe) HAVING avg(rate) > 4";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findRecommended,
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

let findByNutr = (nutritional, a) => {
    let value;

    if (nutritional.localeCompare("calories") == 0) {
        value = a[0]
    }
    if (nutritional.localeCompare("fat") == 0) {
        value = a[1]
    }
    if (nutritional.localeCompare("sat-fat") == 0) {
        nutritional="sat_fat"
        value = a[2]
    }
    if (nutritional.localeCompare("protein") == 0) {
        value = a[3]
    }
    if (nutritional.localeCompare("fiber") == 0) {
        value = a[4]
    }
    if (nutritional.localeCompare("carbs") == 0) {
        value = a[5]
    }

    const findNut = "SELECT idrecipe,name, energy FROM (SELECT idrecipe, sum("+nutritional+"*amount) as energy FROM product_in_recipe,product WHERE( product.idproduct= product_in_recipe.idproduct) GROUP BY(idrecipe) HAVING(energy< "+value+")LIMIT 50) AS rc,recipe WHERE (rc.idrecipe=recipe.id)";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findNut,
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

let findTop10 = (nutrition, lowOrHigh) => {
   let desc = "";
    if (lowOrHigh.localeCompare("on") == 0) {
        desc = "DESC"
    }
    if(nutrition.localeCompare("sat-fat")==0){
        nutrition="sat_fat"
    }
    const getTop10 ="SELECT a.idrecipe,b.name,a.energy FROM (SELECT idrecipe , sum("+nutrition+"*amount) as energy FROM product_in_recipe,product WHERE(product.idproduct= product_in_recipe.idproduct) GROUP BY(idrecipe) )a, recipe b Where a.idrecipe = b.id Order BY energy "+desc+" LIMIT 10";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                getTop10,
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

let getRecipeById = (idrec) => {
    const RecipeById = "SELECT * FROM recipe WHERE( id ="+idrec+")";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                RecipeById,
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

let setRate = (iduser, idrec, rate) => {
    const updateRate = "INSERT INTO rate_by_user VALUES("+iduser+", "+idrec+", "+rate+") ON DUPLICATE KEY UPDATE rate="+rate;
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updateRate,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve();
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let getRecipeRate = (idrec) => {
    const updateRate = "SELECT AVG(rate) as rating FROM rate_by_user WHERE(idrecipe="+idrec+")";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updateRate,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(JSON.stringify(rows));
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let deleteRate = (iduser,idrec) => {
    const delRate = "DELETE FROM rate_by_user WHERE(idrecipe="+idrec+" AND iduser="+iduser+")";
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                delRate,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(JSON.stringify(rows));
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};


module.exports = {
    findRecipeByName: findRecipeByName,
    findRecipeByIngredients: findRecipeByIngredients,
    getMyFavorites: getMyFavorites,
    getRecommended: getRecommended,
    findByNutr: findByNutr,
    findTop10: findTop10,
    getRecipeById: getRecipeById,
    setRate: setRate,
    getRecipeRate: getRecipeRate,
    deleteRate: deleteRate,
};