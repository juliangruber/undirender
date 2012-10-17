var points = require('./lib/points');
var edges = require('./lib/edges');

exports = module.exports = function (width, height, alist) {
    if (typeof width === 'object') {
        alist = width;
        width = 80;
        height = 24;
    }
    var pts = points(alist);
    var es = edges(alist);
    
    var screen = [];
    for (var i = 0; i < height; i++) {
        screen.push(Array(width + 1).join(' ').split(''));
    }
    
    var transform = createTransform(pts);
    
    Object.keys(pts).forEach(function (key) {
        var pt = pts[key];
        var xy = transform(pt);
        var x = Math.floor(xy[0] * width);
        var y = Math.floor(xy[1] * height);
        screen[y][x] = key;
    });
    
    return screen.map(function (row) {
        return row.join('');
    }).join('\n');
};

exports.points = points;
exports.edges = edges;

function createTransform (nodes) {
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
        return [
            (pt[0] - min.x) / w,
            (pt[1] - min.y) / h
        ];
    };
} 
