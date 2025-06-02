const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

const port = process.env.PORT || 8082;

// app.use(express.static("webtechass3/server/webtechass3"));
console.log(__dirname);

// app.get("/*", (req, res) =>
//   res.sendFile(
//     "/Users/pranavgangurde/USC/webtech/assignmentstuff/pranavv1251.github.io/WebtechAss3/webtechass3/server/webtechass3/browser/index.html"
//   )
// );

app.use(
  express.static("webtechass3/browser", { etag: false, lastModified: false })
);

app.all("*", (req, res) => {
  res
    .status(200)
    .sendFile("/", {
      root: "webtechass3/browser",
      etag: false,
      lastModified: false,
    });
});

app.listen(port, () => console.log(`App running on: http://localhost:${port}`));
