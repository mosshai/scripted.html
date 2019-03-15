const fs = require('fs');
const axios = require('axios');
const https = require('https');
var ip = process.argv[2];
const path = require('path');

(async function () {
    var response = await axios.get(`https://${ip}:9443/types`, {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    var json = response.data;
    // var json = JSON.parse(fs.readFileSync('./model.json'));

    for (var iface in json) {
        var filename = path.join(__dirname, `../source/includes/scrypted/_${iface}.md.erb`);
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, '');
        }
    }

    const TypeMap = {
        Set: 'string[]',
        List: 'string[]',
        Class: 'string',
        Boolean: 'boolean',
        ByteBuffer: 'Buffer',
        Object: 'object',
        Map: 'object',
        String: 'string',
        float: 'number',
        Float: 'number',
        int: 'number',
        Integer: 'number',
        int: 'number',
        long: 'number',
        double: 'number',
        Double: 'number',
        JavaScriptObject: 'function',
        Future: 'MediaObject',
    }


    function mapStrippedType(type) {
        var mapped = TypeMap[type];
        if (mapped) {
            return mapped;
        }
        return type;
    }

    function mapType(type) {
        var baseType = type.replace('[]', '');
        if (type === baseType)
            return mapStrippedType(type);
        return `${mapStrippedType(baseType)}[]`;
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

    function mapSupers(supers) {
        return supers.join(', ');
    }

    function massageArg(arg) {
        if (arg.type == 'JavaScriptObject') {
            var interfaceType = json[arg.name];
            var method = interfaceType.methods[0];
            return `callback: (${mapMethodArguments(method.arguments).join(', ')}) => void`;
        }
        return `${arg.name}: ${mapType(arg.type)}`;
    }

    function methodArguments(args) {
        return args.map(arg => `${arg.name}: ${linkifyType(arg.type)}`);
    }

    function mapMethodArguments(args) {
        return args.map(arg => `${massageArg(arg)}`);
    }

    const nunjucks = require('nunjucks');
    nunjucks.configure({ autoescape: false });
    var template = fs.readFileSync(path.join(__dirname,'./index.html.md.j2')).toString();
    var output = nunjucks.renderString(template, {
        classes: json,
        mapSupers,
        methodArguments,
        mapMethodArguments,
        linkifyType,
        mapType,
    });

    fs.writeFileSync(path.join(__dirname, '../source/index.html.md.erb'), output);

    var template = fs.readFileSync(path.join(__dirname, './index.d.ts.j2')).toString();
    var output = nunjucks.renderString(template, {
        classes: json,
        mapSupers,
        methodArguments,
        mapMethodArguments,
        linkifyType,
        mapType,
    });
    fs.writeFileSync(path.join(__dirname, '../../scripts/scrypted-deploy/index.d.ts'), output);
})()
