const { mimeTypes } = require("./mime");
const fs = require("fs");
module.exports.staticFile = function (res, filePath, ext) {
  res.setHeader("Content-Type", mimeTypes[ext]);
  fs.readFile("/public" + filePath, (error, data) => {
    if (error) {
      res.statusCode = 404;
      res.end();
      // statusCode404(res);
    }
    res.end(data);
  });
};
