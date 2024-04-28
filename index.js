const http = require("http");
const path = require("path");
const { mimeTypes } = require("./utilities/mime");
const { staticFile } = require("./utilities/static_file");
// const PORT = `https://namari-nodejs.vercel.app/` || 3500
// const PORT = 3500;
// const PORT = `https://namari-nodejs.vercel.app`;
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

// npm i -g nodemon if note install
// nodemon .\index.js               ---- run server

http
  .createServer((req, res) => {
    const url = req.url;
    console.log(url);
    console.log("server work");

    switch (url) {
      case "/":
          console.log('/html/main_page.html')
          console.log(process.env)
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
  .listen(PORT, HOSTNAME
  //     , () => {
  //     console.log(`Server running on port:${PORT}/`)
  // }
  )
