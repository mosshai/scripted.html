const fs = require('fs');
const axios = require('axios');
const https = require('https');
var ip = process.argv[2];
const path = require('path');

const Sections = {
    'Core Reference': [
        'ScryptedDevice',
        'SystemManager',
        'ScryptedDeviceType',
        'EventListener',
        'EventListenerRegister',
        'SystemDeviceState',
        'Logger',
    ],
    'Device Provider Reference': [
        'DeviceManager',
        'DeviceProvider',
        'DeviceManifest',
        'Device',
        'Refresh',
        'DeviceState',
    ],
    'Media Reference': [
        'MediaManager',
        'MediaObject',
    ],
    "Webhook and Push Reference": [
        "EndpointManager",
        "HttpRequestHandler",
        "PushHandler",
        "HttpRequest",
        "HttpResponse",
        "HttpResponseOptions",
    ],
    "Android Intent Reference": [
        "Android",
    ],
    // 'Z-Wave Reference': [
    //     'ZwaveManager',
    //     'ZwaveNotification',
    //     'ZwaveNotificationType',
    //     'ZwaveValueId',
    // ],
    // 'Sensor API Reference': [
    //     'Thermometer',
    //     'BinarySensor',
    //     'EntrySensor',
    //     'IntrusionSensor',
    //     'AudioSensor',
    //     'MotionSensor',
    //     'OccupancySensor',
    //     'EntryHandleSensor',
    //     'FloodSensor',
    //     'HumiditySensor',
    //     'UltravioletSensor',
    //     'LuminanceSensor',
    // ],
};

const TypeRename = {
    ScryptedThingType: 'ScryptedDeviceType',
};

const TypeMap = {
    ZwaveNotifications: 'ZwaveNotification[]',
    Class: 'string',
    ClassSet: 'string[]',
    StringSet: 'string[]',
    StringMap: 'any',
    ScryptedInterface: 'ScryptedDevice|null',
    Interfaces: "ScryptedInterface",
    SystemStateMap: "{[id: string]: {[property: string]: SystemDeviceState}}",

    // todo: clean this up with strong types
    Set: 'string[]',
    List: 'string[]',
    Map: 'object',
    JsonObject: 'any',

    Boolean: 'boolean',
    ByteBuffer: 'Buffer',
    Object: 'any',
    String: 'string',
    float: 'number',
    Float: 'number',
    int: 'number',
    Integer: 'number',
    int: 'number',
    long: 'number',
    double: 'number',
    Double: 'number',
    Any: 'any',
    URL: 'string',
};

const FunctionalInterfaces = [
    'EventListener',
];

const PromiseVoidExempt = [
    'EventListenerRegister',
    'Logger',
    'HttpResponse',
];

(async function () {
    var response = await axios.get(`https://${ip}:9443/types`, {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    var json = response.data;
    var copy = {};

    // rename into preferred type names, then create sections
    // massage methods into properties where applicable
    for (var name in json) {
        var entry = json[name];
        if (TypeRename[name]) {
            copy[TypeRename[name]] = entry;
        }
        else {
            copy[name] = entry;
        }

        if (entry.methods) {
            var methods = entry.methods;
            delete entry.methods;
            entry.methods = [];
            for (var m of methods) {
                if (!m.property) {
                    if (m.type === 'void' && !m.types && !PromiseVoidExempt.includes(name)) {
                        m.types = ['Promise', 'void']
                    }

                    if (m.type !== 'void' && m.types?.[0] !== 'Promise') {
                        console.warn('possibly unsupported non-async return type on ', name, m.name, m.type);
                    }
                    entry.methods.push(m);
                    continue;
                }

                if (!entry.fields) {
                    entry.fields = [];
                }
                entry.fields.push(m);
                m.name = m.property;
            }
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
    data['Device Interface Reference'] = remaining;

    function mapStrippedType(type) {
        var mapped = TypeMap[type] || TypeRename[type];
        if (mapped) {
            return mapped;
        }
        return type;
    }

    function mapOneType(type) {
        var baseType = type.replace('[]', '');
        if (type === baseType)
            return mapStrippedType(type);
        return `${mapStrippedType(baseType)}[]`;
    }

    function mapType(typed) {
        var { type, types } = typed;
        if (!types) {
            return mapOneType(type);
        }

        if (types[0] == 'Promise') {
            types = types.slice(1);
            var promiseTypes = types.map(t => mapOneType(t)).join('|');
            return `Promise<${promiseTypes}>`;
        }
        else if (types[types.length - 1] == 'Promise') {
            types = types.slice(0, types.length - 1);
            var nonPromiseTypes = types.map(t => mapOneType(t)).join('|');
            var promiseTypes = `Promise<${nonPromiseTypes}>`;
            return `${nonPromiseTypes}|${promiseTypes}`;
        }
        else {
            return types.map(t => mapOneType(t)).join('|');
        }
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

    function linkifyOneType(type) {
        var baseType = type.replace('[]', '');
        if (type === baseType)
            return linkifyStrippedType(type);
        return `${linkifyStrippedType(baseType)}[]`;
    }

    function linkifyType(typed) {
        var { type, types } = typed;
        if (!types) {
            return linkifyOneType(type);
        }

        if (types[0] == 'Promise') {
            types = types.slice(1);
            var promiseTypes = types.map(t => linkifyOneType(t)).join('|');
            return `Promise\\<${promiseTypes}>`;
        }
        else if (types[types.length - 1] == 'Promise') {
            types = types.slice(0, types.length - 1);
            var nonPromiseTypes = types.map(t => linkifyOneType(t)).join('|');
            var promiseTypes = `Promise\\<${nonPromiseTypes}>`;
            return `${nonPromiseTypes}|${promiseTypes}`;
        }
        else {
            return types.map(t => linkifyOneType(t)).join('|');
        }
    }

    function mapSupers(supers) {
        return supers.join(', ');
    }

    function massageArg(arg) {
        if (FunctionalInterfaces.includes(arg.type)) {
            var interfaceType = json[arg.type];
            var method = interfaceType.methods[0];
            return `${arg.name}: (${mapMethodArguments(method.arguments).join(', ')}) => void`;
        }
        var optional = arg.optional ? '?' : '';
        return `${arg.name}${optional}: ${mapType(arg)}`;
    }

    function massageCallback(arg) {
        if (arg.type == 'JavaScriptObject') {
            return `${linkifyType({ type: arg.name })} callback`
        }
        return `${linkifyType(arg)} ${arg.name}`;
    }

    function methodArguments(args) {
        return args.map(arg => `${massageCallback(arg)}`);
    }

    function mapMethodArguments(args) {
        return args.map(arg => `${massageArg(arg)}`);
    }

    const nunjucks = require('nunjucks');
    nunjucks.configure(__dirname, { autoescape: false });
    var template = fs.readFileSync(path.join(__dirname, './index.html.md.j2')).toString();
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

    json['ScryptedDevice'].implementable = true;

    for (const f of ['index.d.ts', 'types.d.ts']) {
        var template = fs.readFileSync(path.join(__dirname, `./${f}.j2`)).toString();
        var output = nunjucks.renderString(template, {
            classes: json,
            mapSupers,
            methodArguments,
            mapMethodArguments,
            linkifyType,
            mapType,
        });
        fs.writeFileSync(path.join(__dirname, `../../plugins/scrypted-sdk/${f}`), output);
    }

    for (const f of ['index.generated.js', 'types.generated.js']) {
        var template = fs.readFileSync(path.join(__dirname, `./${f}.j2`)).toString();
        var output = nunjucks.renderString(template, {
            state: json['DeviceState'],
            classes: json,
        });
        fs.writeFileSync(path.join(__dirname, `../../plugins/scrypted-sdk/${f}`), output);
    }
})()
