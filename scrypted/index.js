const fs = require('fs');
// var swig  = require('swig');
// var template = swig.compileFile('./index.html.md.j2');
var template = fs.readFileSync('./index.html.md.j2').toString();
var json = JSON.parse(fs.readFileSync('./model.json'));

for (var iface in json) {
    var filename = `../source/includes/scrypted/_${iface}.md.erb`;
    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, '');
    }
}

function linkifyType(type) {
    if (!json[type]) {
        return type;
    }

    return `<a href='#${type.toLowerCase()}'>${type}</a>`;
}

const nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: false });
var output = nunjucks.renderString(template, {
    classes: json,
    methodArguments: function(args) {
        return args.map(arg => `${arg.name}: ${linkifyType(arg.type)}`);
    },
    linkifyType,
});

fs.writeFileSync('../source/index.html.md.erb', output);
