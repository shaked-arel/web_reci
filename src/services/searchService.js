import DBConnection from "./../configs/connectDB";

let findRecipeByName = (str) => {
    const findRecipeByname = "SELECT id,name FROM recipe WHERE ( name LIKE '% " + str + " %' OR name LIKE '% " + str + "')LIMIT 7";
    console.log(findRecipeByname);
    return new Promise((resolve, reject) => {
        try {
            // console.log(str);
            DBConnection.query(
                findRecipeByname,
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

let findRecipeByIngredients = (used, not_used) => {
    const findRecipeByIng = "SELECT id,name FROM recipe WHERE (id IN (SELECT distinct idrecipe FROM product_in_recipe WHERE( idproduct IN (SELECT idproduct FROM product WHERE( food LIKE '% " + used + " %' OR food LIKE '% " + used + "' OR food LIKE '" + used + " %' OR food LIKE '" + used + "')))))";
    console.log(findRecipeByIng);
    return new Promise((resolve, reject) => {
        try {
            // console.log(str);
            DBConnection.query(
                findRecipeByIng,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    const findMyFavorites = "SELECT id,name FROM recipe WHERE(id IN(SELECT idrecipe FROM rate_by_user WHERE( iduser=" + id + " AND rate=5)))";
    console.log(findMyFavorites);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findMyFavorites,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    const findRecommended = "SELECT id,name FROM recipe WHERE( id IN (SELECT idrecipe FROM rate_by_user group by(idrecipe) HAVING avg(rate) > 4));";
    console.log(findRecommended);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findRecommended,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    console.log(typeof (nutritional));
    console.log("in service after printing nutr");
    // console.log(typeof(nutritional.localeCompare(nutritional)));
    let value;
    if (nutritional.localeCompare("calories") == 0) {
        value = a[0]
    }
    if (nutritional.localeCompare("fat") == 0) {
        value = a[1]
    }
    if (nutritional.localeCompare("sat_fat") == 0) {
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
    const findNut = "SELECT id,name FROM recipe WHERE(id IN (SELECT * FROM(SELECT idrecipe FROM product_in_recipe,product WHERE( product.idproduct= product_in_recipe.idproduct) GROUP BY(idrecipe) HAVING(sum(" + nutritional + "*amount)< " + value + ")LIMIT 50) AS rc))";
    console.log(findNut);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findNut,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    console.log(nutrition);

    let desc = "";
    if (lowOrHigh.localeCompare("on") == 0) {
        desc = "DESC"
    }
    if(nutrition.localeCompare("sat-fat")==0){
        nutrition="sat_fat"
    }
    const getTop10 = "SELECT id,name FROM recipe WHERE (id IN( SELECT * FROM(SELECT idrecipe FROM product_in_recipe,product WHERE( product.idproduct= product_in_recipe.idproduct) GROUP BY(idrecipe) ORDER BY sum(" + nutrition + "*amount) "+desc+" LIMIT 10)AS rc))";

    console.log(getTop10);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                getTop10,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    console.log(RecipeById);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                RecipeById,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    console.log(updateRate);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updateRate,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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

let getRecipeRate = (idrec) => {
    const updateRate = "SELECT AVG(rate) as rating FROM rate_by_user WHERE(idrecipe="+idrec+")";
    console.log(updateRate);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                updateRate,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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
    console.log(delRate);
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                delRate,
                function (err, rows) {
                    if (err) {
                        console.log(" in error")
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