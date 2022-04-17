const config = require("../../config");
const dbConfig = require("../../my-sql-connection");
const jwt = require("jsonwebtoken");

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
                lastname: rows[0]["lastname"],
              },
              config.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );
            return res.status(200).send({
              success: true,
              message: "Login Successful!",
              token: token,
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

exports.register = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let address = req.body.address;

  let query_0 = "SELECT * FROM USER WHERE email=?";
  let query_1 =
    "INSERT INTO USER (email, password, first_name, last_name, address) VALUES(?,?,?,?,?)";

  dbConfig.query(query_0, [email], (err, rows) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .send({ success: false, message: "Error Connecting to Server !" });
    } else {
      try {
        if (rows != null) {
          if (rows > 0) {
            return res.status(401).send({
              success: false,
              message: "Email already taken by another user !",
            });
          } else {
            dbConfig.query(
              query_1,
              [email, password, firstname, lastname, address],
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
                    message: "user registered successfully",
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

exports.forgetPassword = function (req, res, next) {
  // email - get from req
  // random gen 6 digit no
  // insert in to user table - col -generateforgetpasswordCode
  // validate forgetpassword code
  let email = req.body.email;
  let query_0 = "SELECT * FROM USER WHERE email=?";
  let query_1 = "UPDATE USER SET forget_password_code=?,validate_forget_password_code=false WHERE email=?";
  let forget_password_code = Math.floor(100000 + Math.random() * 900000);
  dbConfig.query(query_0, [email], (err, rows) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .send({ success: false, message: "Error Connecting to Server !" });
    } else if (rows != null) {
      if (rows == 0) {
        return res.status(404).send({
          success: false,
          message: "Email Not Found !",
        });
      } else {
        dbConfig.query(query_1, [forget_password_code,email], (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(401).send({
              success: false,
              message: "Error Connecting to Server !",
            });
          } else {
            return res.status(201).send({
              success: true,
              code: forget_password_code,
              message: "forget password successfully generated",
            });
          }
        });
      }
    }
  });
};
exports.validatePassword = function (req, res, next) {
  
}

