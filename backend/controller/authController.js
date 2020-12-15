const { addNewUser } = require("../model/authModel");

exports.signup = async (req, res) => {
  try {
    const result = await addNewUser(req.body);
    res.json({
      status: "success",
      message: "Signed up successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = (req, res) => {};
