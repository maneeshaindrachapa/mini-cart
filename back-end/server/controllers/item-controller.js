const config = require("../../config.json");
const dbConfig = require("../../my-sql-connection");

exports.addItem = function (req, res, next) {
    let itemName = req.body.name;
    let description = req.body.description;
    let units = req.body.unit;
    let volume = req.body.volume;
    let url = req.body.image_url;

    let query_0 = "SELECT * FROM ITEMS WHERE name_item=?";
    let query_1 =
        "INSERT INTO ITEMS (name_item, description, unit, volume,image_url) VALUES(?,?,?,?,?)";
    let query_2 = "UPDATE ITEMS SET description=?,unit=?,volume=?,url=? WHERE name_item=?";

    dbConfig.query(query_0, [itemName], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            try {
                if (rows != null) {
                    if (rows > 0) {
                        dbConfig.query(query_2, [description, units, volume, itemName, url], (err, rows => {
                            if (err) {
                                console.log(err);
                                return res
                                    .status(401)
                                    .send({ success: false, message: "Error Connecting to Server !" });
                            } else {
                                return res
                                    .status(204)
                                    .send({ success: true, message: "Item details updated successfully" });
                            }
                        }))
                    } else {
                        dbConfig.query(
                            query_1,
                            [itemName, description, units, volume, url],
                            (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(401).send({
                                        success: false,
                                        message: "Error Connecting to Server !",
                                    });
                                } else {
                                    return res.status(201).send({
                                        success: true,
                                        message: "Item added successfully",
                                    });
                                }
                            }
                        );
                    }
                }
            } catch (e) {
                console.log(e);
                return res
                    .status(401)
                    .send({ success: false, message: "Error Connecting to Server!" });
            }
        }
    });
};

exports.getItemByItemID = function (req, res, next) {
    let id = req.params.id;
    let query_0 = "SELECT * FROM ITEMS WHERE id=?";

    dbConfig.query(query_0, [id], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows != null) {
                return res.status(200).send({ id: rows[0].id,
                    name: rows[0].name_item,
                    unit: rows[0].unit,
                    description: rows[0].description,
                    volume: rows[0].volume,
                    accountId: rows[0].account_id,
                    active: rows[0].active,
                    image_url: rows[0].image_url, });
            }
        }
    });
};

exports.getAllItems = function (req, res, next) {
    let page = req.query.page;
    page = Number(page);
    let size = req.query.size;
    size = Number(size);
    let sort = req.query.sort;
    let direction = req.query.direction;

    var lowerLimit = (page) * size;
    var upperLimit = (page + 1) * size;


    let query_0 = "SELECT * FROM ITEMS ORDER BY id " + direction + " limit " + lowerLimit + "," + upperLimit + ";";
    dbConfig.query(query_0, [], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows != null) {
                return res.status(200).send({ rows });
            }
        }
    });
};

exports.deleteItem = function (req, res, next) {
    let id = req.params.id;
    let query_0 = "DELETE FROM ITEMS WHERE id=?";
    dbConfig.query(query_0, [id], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            return res.status(200).send({ success: true, message: "Successfully deleted" });
        }
    });
};

exports.updateItem = function(req,res,next){
    let itemName = req.body.name;
    let description = req.body.description;
    let units = req.body.unit;
    let volume = req.body.volume;
    let url = req.body.image_url;
    let id = req.body.id;
    id = id.toString();
    let query_0 = "UPDATE ITEMS SET name_item=?,description=?,unit=?,volume=?,image_url=? WHERE id=?";
    dbConfig.query(query_0, [itemName,description,units,volume,url,id], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows >0) {
                return res.status(200).send({ id: rows[0].id,
                    name: rows[0].name_item,
                    unit: rows[0].unit,
                    description: rows[0].description,
                    volume: rows[0].volume,
                    accountId: rows[0].account_id,
                    active: rows[0].active,
                    image_url: rows[0].image_url, });
            }
        }
    });
};