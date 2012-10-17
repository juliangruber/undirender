module.exports = function (p0_, p1_) {
    var results = [];
    
    function at (x, y, c) {
        results.push([ x, y, c ]);
    }
    var p0, p1;
    
    if (p0_[1] < p1_[1]) {
        p0 = p0_, p1 = p1_;
    }
    else {
        p0 = p1_, p1 = p0_;
    }
    
    if (Math.floor(p0[1]) === Math.floor(p1[1])) {
        // horizontal
        var xn = Math.min(p0[0], p1[0]);
        var xp = Math.max(p0[0], p1[0]);
        for (var x = xn; x <= xp; x++) {
            at(x, p0[1], '—');
        }
        return results;
    }
    
    if (Math.floor(p0[0]) === Math.floor(p1[0])) {
        // vertical
        var yn = Math.min(p0[1], p1[1]);
        var yp = Math.max(p0[1], p1[1]);
        
        for (var y = yn; y <= yp; y++) {
            at(p0[0], y, '|');
        }
        return results;
    }
    
    var m = (p1[1] - p0[1]) / (p1[0] - p0[0]);
    var b = p0[1] - m * p0[0];
    
    for (var y = p0[1]; y < p1[1]; y++) {
        // y = m * x + b
        // x = (y - b) / m
        var chars =
            m > 1 ? [ '|', '\\' ] :
            m > 0.5 ? [ '\\', '_' ] :
            m > 0 ? [ '\\', '_' ] :
            
            m < -1 ? [ '|', '/' ] :
            m < -0.5 ? [ '/', '¯' ] :
            m < 0 ? [ '/', '¯' ] :
            [ '_', '_' ]
        ;
        
        if (Math.abs(m) > 1) {
            var xp = Math.floor((y - 1 - b) / m);
            var xn = Math.floor((y - b) / m);
            at(xn, y, xp === xn ? chars[0] : chars[1]);
        }
        else if (m < 0) {
            var xp = Math.floor((y - 1 - b) / m);
            var xn = Math.floor((y - b) / m);
            
            at(xn, y, chars[0]);
            for (var x = xn + 1; x < xp; x++) {
                at(x, y, chars[1]);
            }
        }
        else {
            var xp = Math.floor((y - b) / m);
            var xn = Math.floor((y + 1 - b) / m);
            
            at(xp, y, chars[0]);
            for (var x = xp + 1; x < xn; x++) {
                at(x, y, chars[1]);
            }
        }
    }
    
    return results;
};
