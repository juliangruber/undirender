#!/usr/bin/env node

var undirender = require('..');

if (process.argv.length < 3) {
    return console.error([
        'Usage: undirender alist',
        'Example: undirender x-y y-z z-x'
    ].join('\n'));
}

var alist = process.argv.slice(2).map(function (edge) {
    return edge.split('-');
});

console.log(undirender(80, 20, alist));
