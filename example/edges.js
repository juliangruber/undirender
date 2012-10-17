var createGraph = require('../');

var g = createGraph([
    a : [ 'b' ],
    b : [ 'c', 'd' ],
    d : [ 'e', 'f' ],
]);

console.log(g);
