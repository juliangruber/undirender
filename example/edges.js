var createGraph = require('../');

var g = createGraph([
    [ 'a', 'b' ],
    [ 'b', 'c' ],
    [ 'b', 'd' ],
    [ 'd', 'e' ],
    [ 'd', 'f' ]
]);

console.log(g);
