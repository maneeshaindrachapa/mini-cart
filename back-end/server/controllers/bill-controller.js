const config = require("../../config.json");
const dbConfig = require("../../my-sql-connection");
const fs = require('fs');
const path = require('path');

exports.downloadImage = function (req, res, next) {
  const fileData = (req.body.fileData.split(","))[1];
  const name = req.body.name;

  // Save the file to the 'img' folder
  const parentDirectoryPath = path.resolve(__dirname, '..');
  const folderPath = path.join(parentDirectoryPath, 'bills');
  const fileName = name;
  const filePath = path.join(folderPath, fileName);

  // Decode the base64 data and save it to the file
  const decodedData = Buffer.from(fileData, 'base64');
  fs.writeFileSync(filePath, decodedData);
  return res.status(200).send({
    success: true,
    message: "Bill saved successfully"
  });
};

exports.updateItems = function (req, res, next) {
  let billeditems = req.body.items;
  let invoiceID = req.body.invoiceID;

  console.log(billeditems);
  let query = "UPDATE ITEMS SET unit=? WHERE id=?"
  let query1 = "INSERT INTO  transactions(invoice_id,item_id,quantity,price) VALUES(?,?,?,?)";

  for (let i = 0; i < billeditems.length; i++) {
    let unit = billeditems[i].unit - billeditems[i].volume;
    let price = billeditems[i].price * billeditems[i].volume;
    dbConfig.query(query, [unit, billeditems[i].id], function (error, results, fields) {
      if (error) {
        return dbConfig.rollback(function () {
          return res
            .status(401)
            .send({ success: false });
        });
      }
    });
    dbConfig.query(query1, [invoiceID,billeditems[i].id,billeditems[i].volume,price ], function (error, results, fields) {
      if (error) {
        return dbConfig.rollback(function () {
          return res
            .status(401)
            .send({ success: false });
        });
      }
    });
  }
  return res.status(200);
};