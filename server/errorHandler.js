
handleErr = (err, req, res, next) => {
  if (!err.code) {
    res.status(500).json({name: err.constructor.name, message: err.message});
  } else {
    res.status(err.code).json({name: err.name, message: err.message});
  }
};

module.exports = { handleErr };
