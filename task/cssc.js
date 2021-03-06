(function() {
    var optimist = require("optimist")
        .usage("Usage:\n  compile_less [--pretty] <css_name>\n\n" +
        "\tcss_name\t:\tName of less/css (e.g. 'main')\n" +
        "\tout_dir\t\t:\tOutput directory relative to cwd"
        )
        .boolean("pretty")
        .describe("pretty", "Do not minify (no '.min' will be added)")
        ;

    var argv = optimist.argv;
    if (argv._.length != 2) {
        optimist.showHelp();
        process.exit(1);
    }
    var path = require("path");
    var fs = require("fs");

    var inputCssName = argv._[0];
    var outputDirectoryName = argv._[1];
    var outputCssName = inputCssName + (argv["pretty"] ? ".css" : ".min.css");
    var inputLessName = inputCssName + ".less.css";
    var outputFilePath = path.join(outputDirectoryName, outputCssName);

    var lessBasePath = path.join(__dirname, "..", "less");

    var ENCODING = "utf8";

    var less = require("less");

    fs.readFile(path.join(lessBasePath, inputLessName), ENCODING, function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        less.render(data,
            {
                filename: inputLessName,
                paths: [lessBasePath],
                compress: !argv["pretty"]
            },
            function(err, data) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                fs.writeFile(outputFilePath, data.css, ENCODING, function(err) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    }
                    process.exit(0);
                });
            }
        );
    });
})();