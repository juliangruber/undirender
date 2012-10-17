var fort = require('fort');

module.exports = function (edges) {
    var graph = edges.reduce(function (acc, edge) {
        var a = edge[0], b = edge[1];
        if (!acc[a]) acc[a] = [];
        if (!acc[b]) acc[b] = [];
        
        acc[a].push(b);
        acc[b].push(a);
        
        return acc;
    }, {});
    
    var points = {};
    
    Object.keys(graph).sort().forEach(function (node) {
        var keys = Object.keys(points);
        
        if (keys.length === 0) {
            points[node] = [ 0, 0 ];
            return;
        }
        
        var radius = 10;
        var candidates = [];
        
        keys.forEach(function (key) {
            var pt = points[key];
            
            for (var th = 0; th < 360; th += 30) {
                var angle = 2 * Math.PI * th / 360;
                var x = pt[0] + Math.sin(angle) * radius;
                var y = pt[1] + Math.cos(angle) * radius;
                
                var unique = keys.every(function (k) {
                    return Math.sqrt(
                        Math.pow(x - points[k][0], 2)
                        + Math.pow(y - points[k][1], 2)
                    ) > 0.001;
                });
                if (unique) candidates.push([ x, y ]);
            }
        });
        
        var best = fort.min(candidates, function (c) {
            var pts = graph[node].map(function (key) {
                return points[key];
            }).filter(Boolean);
            
            if (pts.length === 0) return -1;
            
            return pts.reduce(function (sum, pt) {
                var x = Math.sqrt(
                    Math.pow(pt[0] - c[0], 2)
                    + Math.pow(pt[1] - c[1], 2)
                );
                return sum + x;
            }, 0);
        }, {});
        points[node] = best;
    });
    
    return points;
};
