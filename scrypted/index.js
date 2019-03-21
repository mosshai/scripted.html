const fs = require('fs');
const axios = require('axios');
const https = require('https');
var ip = process.argv[2];
const path = require('path');

const Sections = {
    'Core Reference': [
        'ScryptedDevice',
        'ScryptedDeviceType',
    ],
    'Event Reference': [
        'EventListener',
        'EventListenerRegister',
    ],
    'Device Reference': [
        'DeviceManager',
        'DeviceProvider',
        'DeviceManifest',
        'Device',
    ]
};

const TypeRename = {
    ScryptedThingType: 'ScryptedDeviceType',
};

const TypeMap = {
    Class: 'string',
    ClassSet: 'string[]',
    ScryptedInterface: 'ScryptedDevice',

    // todo: clean this up with strong types
    Set: 'string[]',
    List: 'string[]',
    Map: 'object',

    Boolean: 'boolean',
    ByteBuffer: 'Buffer',
    Object: 'object',
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
};

(async function () {
    var response = await axios.get(`https://${ip}:9443/types`, {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    var json = response.data;
    var copy = {};

    // rename into preferred type names, then create sections
    for (var name in json) {
        var entry = json[name];
        if (TypeRename[name]) {
            copy[TypeRename[name]] = entry;
        }
        else {
            copy[name] = entry;
        }
    }
    json = copy;

    // dump the user editable files
    for (var iface in json) {
        var filename = path.join(__dirname, `../source/includes/scrypted/_${iface}.md.erb`);
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, '');
        }
    }

    var data = {
    };
    var remaining = Object.assign({}, json);

    for (var section in Sections) {
        data[section] = {};
        for (var type of Sections[section]) {
            data[section][type] = json[type];
            delete remaining[type];
        }
    }
    data['Interface Reference'] = remaining;

    function mapStrippedType(type) {
        var mapped = TypeMap[type] || TypeRename[type];
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
        var mapped = TypeMap[type] || TypeRename[type];
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
    nunjucks.configure(__dirname, { autoescape: false });
    var template = fs.readFileSync(path.join(__dirname,'./index.html.md.j2')).toString();
    var output = nunjucks.renderString(template, {
        data,
        mapSupers,
        methodArguments,
        mapMethodArguments,
        linkifyType,
        mapType,
    });

    fs.writeFileSync(path.join(__dirname, '../source/index.html.md.erb'), output);
    fs.writeFileSync(path.join(__dirname, '../source/includes/scrypted/generated/_sdk.erb'), fs.readFileSync(path.join(__dirname, 'sdk.d.ts')));
    fs.writeFileSync(path.join(__dirname, '../source/includes/scrypted/generated/_sdk.media.erb'), fs.readFileSync(path.join(__dirname, 'sdk.media.d.ts')));

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
