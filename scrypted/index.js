const fs = require('fs');
var swig  = require('swig');
var template = swig.compileFile('./index.html.md.j2');
var json = JSON.parse(fs.readFileSync('./model.json'));

var output = template({
    classes: json,
});

fs.writeFileSync('../source/index.html.md', output);