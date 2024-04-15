const http = require("http");
const path = require("path");
const { mimeTypes } = require("./utilities/mime");
const { staticFile } = require("./utilities/static_file");
const PORT = 3500;

http
  .createServer((req, res) => {
    try {
      const url = req.url;
      console.log(url);
      console.log("server work");

      switch (url) {
        case "/":
          // res.end("<h1>Main page new</h1>");
          staticFile(res, "/html/main_page.html", ".html");
          break;
        default:
          const extname = String(path.extname(url)).toLocaleLowerCase();
          if (extname in mimeTypes) staticFile(res, url, extname);
      }
    } catch (e) {
      // log.error(e);
      res.statusCode = 404;
      res.end("<h1>sam error 404</h1>");
      return `sam error 404 ${e}`;
    }

    // const url = req.url;
    // console.log(url);
    // console.log("server work");
    //
    // switch (url) {
    //   case "/":
    //     staticFile(res, "/html/main_page.html", ".html");
    //     break;
    //   default:
    //     const extname = String(path.extname(url)).toLocaleLowerCase();
    //     if (extname in mimeTypes) staticFile(res, url, extname);
    //     else {
    //       res.statusCode = 404;
    //       res.end();
    //     }
    // }
  })
  .listen(PORT || process.env.PORT);
