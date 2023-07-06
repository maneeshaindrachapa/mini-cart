const config = require("../../config.json");
const dbConfig = require("../../my-sql-connection");

exports.getTotalRevenueMonth = function (req, res, next) {
    let startDate = req.body.start+" 00:00:00";
    let endDate = req.body.end+" 23:59:59";
    let query_0 = "SELECT name_item,quantity,items.price from TRANSACTIONS,ITEMS WHERE TRANSACTIONS.item_id=ITEMS.id AND TRANSACTIONS.timestamp BETWEEN ? AND ?";
    dbConfig.query(query_0, [startDate, endDate], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows !=null) {
                return res.status(200).send(rows);
            }
        }
    });
};

exports.getTotalRevenue = function (req, res, next) {
    let query_0 = "SELECT items.price*transactions.quantity AS total_price from TRANSACTIONS,ITEMS WHERE TRANSACTIONS.item_id=ITEMS.id";
    dbConfig.query(query_0, [], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows !=null) {
                return res.status(200).send(rows);
            }
        }
    });
};

exports.getMonthlyUsers = function (req, res, next) {
    let startDate = req.body.start+" 00:00:00";
    let endDate = req.body.end+" 23:59:59";
    let query_0 = "SELECT COUNT(id) as monthly_users from USERS WHERE created_date BETWEEN ? AND ?";
    dbConfig.query(query_0, [startDate, endDate], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows !=null) {
                return res.status(200).send(rows);
            }
        }
    });
};

exports.getTotalUsers = function (req, res, next) {
    let query_0 = "SELECT COUNT(id) AS total_users from USERS";
    dbConfig.query(query_0, [], (err, rows) => {
        if (err) {
            console.log(err);
            return res
                .status(401)
                .send({ success: false, message: "Error Connecting to Server !" });
        } else {
            if (rows !=null) {
                return res.status(200).send(rows);
            }
        }
    });
};

exports.getTotalTransactions = function (req, res, next) {
    let page = req.query.page;
    page = Number(page);
    let size = req.query.size;
    size = Number(size);
    let sort = req.query.sort;
    let direction = req.query.direction;

    var lowerLimit = (page) * size;
    var upperLimit = (page + 1) * size;

    let query_0 = "SELECT transactions.id, timestamp, invoice_id, items.name_item, transactions.quantity, transactions.price FROM transactions JOIN items ON items.id = transactions.item_id ORDER BY transactions.id "+ direction + " LIMIT "+ lowerLimit+","+upperLimit;
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