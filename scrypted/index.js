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

const TypeMap = {
    Boolean: 'boolean',
    ByteBuffer: 'Buffer',
    Object: 'object',
    Map: 'object',
    String: 'string',
    int: 'number',
    long: 'number',
    JavaScriptObject: 'function',
}

function linkifyStrippedType(type) {
    var mapped = TypeMap[type];
    if (mapped) {
        return mapped;
    }

    if (!json[type]) {
        return type;
    }

    return `<a href='#${type.toLowerCase()}'>${type}</a>`;
}

function linkifyType(type) {
    var baseType = type.replace('[]', '');
    if (type === baseType)
        return linkifyStrippedType(type);
    return `${linkifyStrippedType(baseType)}[]`;
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
