var undirender = require('../');

var s = undirender(80, 20, [
    [ 'a', 'b' ],
    [ 'a', 'e' ],
    [ 'b', 'c' ],
    [ 'b', 'd' ],
    [ 'c', 'e' ],
    [ 'd', 'e' ],
    [ 'd', 'g' ],
    [ 'g', 'h' ],
    [ 'h', 'e' ]
]);
console.log(s);
