const connection = require('../database/');

module.exports = {
  index(req, res) {
    res.json({ scrunner: "TOP" });
  },
};
