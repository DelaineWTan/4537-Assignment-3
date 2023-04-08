const apiUserDataModel = require("./apiUserDataModel.js");

handleErr = async (err, req, res, next) => {
  console.log(req.username)
  if (req.username) {
    await apiUserDataModel.create({
      userId: req.username,
      timestamp: new Date(),
      endpoint: req.originalUrl,
      status: res.statusCode,
    });
  }
  if (!err.code) {
    console.log(err.message)
    res.status(500).json({name: err.constructor.name, message: err.message});
  } else {
    console.log(err.message)
    res.status(err.code).json({name: err.name, message: err.message});
  }
};

module.exports = { handleErr };
