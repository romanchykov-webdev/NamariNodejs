const http = require("http");
const path = require("path");
const { mimeTypes } = require("./utilities/mime");
const { staticFile } = require("./utilities/static_file");
const PORT = 3500;

http
  .createServer((req, res) => {
    const url = req.url;
    console.log(url);
    console.log("server work");

    switch (url) {
      case "/":
        staticFile(res, "/html/main_page.html", ".html");
        break;
      default:
        const extname = String(path.extname(url)).toLocaleLowerCase();
        if (extname in mimeTypes) staticFile(res, url, extname);
        else {
          res.statusCode = 404;
          res.end("<h1>Status Code 404 sam error</h1>");
        }
    }
  })
  .listen(PORT || process.env.PORT);
