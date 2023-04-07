
handleErr = (err, req, res, next) => {
  if (!err.code) {
    console.log(err.message)
    res.status(500).json({name: err.constructor.name, message: err.message});
  } else {
    console.log(err.message)
    res.status(err.code).json({name: err.name, message: err.message});
  }
};

module.exports = { handleErr };
