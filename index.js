var points = require('./lib/points');
var drawLine = require('./lib/line');
var surrender = require('surrender');

exports = module.exports = function (width, height, alist) {
    if (typeof width === 'object') {
        alist = width;
        width = 80;
        height = 24;
    }
    var pts = points(alist);
    
    var screen = [];
    for (var i = 0; i < height; i++) {
        screen.push(Array(width + 1).join(' ').split(''));
    }
    
    var transform = createTransform(width, height, pts);
    
    Object.keys(pts).forEach(function (key) {
        var pt = pts[key];
        var xy = transform(pt);
        screen[xy[1]][xy[0]] = key;
    });
    
    alist.forEach(function (edge) {
        var a = edge[0], b = edge[1];
        var ta = transform(pts[a]);
        var tb = transform(pts[b]);
        
        drawLine(ta, tb).forEach(function (c) {
            var x = c[0], y = c[1];
            if (screen[y][x] === ' ') {
                screen[c[1]][c[0]] = c[2];
            }
        });
    });
    
    return screen.map(function (row) {
        return row.join('');
    }).join('\n');
};

exports.points = points;

function createTransform (width, height, nodes) {
    var pts = Object.keys(nodes).map(function (key) {
        return nodes[key];
    });
    
    var xs = pts.map(function (pt) { return pt[0] });
    var ys = pts.map(function (pt) { return pt[1] });
    
    var min = {
        x : Math.min.apply(null, xs),
        y : Math.min.apply(null, ys)
    };
    var max = {
        x : Math.max.apply(null, xs),
        y : Math.max.apply(null, ys)
    };
    
    var h = max.y - min.y + 1;
    var w = max.x - min.x + 1;
    
    return function (pt) {
        var x = (pt[0] - min.x) / w;
        var y = (pt[1] - min.y) / h
        return [ Math.floor(x * width), Math.floor(y * height) ];
    };
} 
