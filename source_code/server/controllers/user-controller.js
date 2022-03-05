const config = require("../../config");
const dbConfig = require("../../my-sql-connection");
const jwt = require('jsonwebtoken');

// login functionality
exports.login = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let query_ = "SELECT * from user where email=?";
  let confirmed = "";

  dbConfig.query(query_, [email], (err, rows) => {
    if (err) {
      console.log("Error Connecting to Server !");
      return res
        .status(401)
        .send({ success: false, message: "Error Connecting to Server!" });
    } else {
      try {
        if (rows != null) {
          if (password == rows[0]["password"]) {
            const token = jwt.sign(
              {
                user_id: rows[0]["userID"],
                email: rows[0]["email"],
                firstname: rows[0]["firstname"],
                lastname: rows[0]["lastname"]
              },
              config.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );
            return res.status(200).send({
              success: true,
              message: "Login Successful!",
              token: token
            });
          } else {
            console.log("Invalid Credentials!");
            return res
              .status(401)
              .send({ success: false, message: "Invalid Credentials!" });
          }
        } else {
          console.log("Invalid Credentials!");
          return res
            .status(401)
            .send({ success: false, message: "Invalid Credentials!" });
        }
      } catch (e) {
        console.log(e);
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credentials!" });
      }
    }
  });
};

exports.register=function(req,res,next){
    return res
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let address = req.body.address;

};

let query_ = "INSERT INTO user(email,password,firstname,lastname,birthday,address,confirmedAccountKey,profPicURL,coverPicURL) values(?,?,?,?,?,?,?,?,?)";
dbConfig.query(query_, [email, password, firstname, lastname, birthday_sql, address, randomNoCreated, profileURL, coverURL], (err, rows) => {
    if (err) {
        console.log(err);
        return res.status(401).send({ success: false, message: "Error Connecting to the Server!" });
    } else {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(404).send({ success: false, message: "Error connecting to Mail Server!" });
        }
