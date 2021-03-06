(function() {
    var path = require("path");
    var express = require("express");

    var app = express();

    app.use("/teachers/library", express.static(path.join(__dirname, "..", "public")));

    var port = process.argv[2] ? process.argv[2] : 80;

    app.listen(port);
    console.log("Listening on port '" + port + "'...");
})();