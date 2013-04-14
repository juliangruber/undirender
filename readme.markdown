# undirender

render undirected graphs in the terminal

# example

``` js
var undirender = require('undirender');

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
```

***

```
$ node example/edges.js
                                               a¯¯                              
                                           /¯¯¯|                                
                   h¯                   /¯¯    |                                
                /¯¯  \_              /¯¯       |                                
             /¯¯       \_        /¯¯¯          |                                
          /¯¯            \_   /¯¯              |                                
        /¯                 e____               |                                
     /¯¯                  /     \____          |                                
  /¯¯                    /           \____     |                                
g__                     /                 \____|                                
   \__                 /                       |_____                           
      \__             /                        |     \____                      
         \__         /                         |          \____                 
            \__     /                          |               \____            
               \___/                           |                    \_____      
                  \d________                   |                          c¯¯¯¯¯
                            \________          |                 /¯¯¯¯¯¯¯¯      
                                     \________ |       /¯¯¯¯¯¯¯¯¯               
                                               b                                
                                                                                
```

Or use the CLI:

```
$ undirender a-b a-e b-c b-d c-e d-e d-g g-h h-e
```

# methods

```
var undirender = require('undirender')
```

## undirender(width, height, alist)

Given the [adjacency list](https://en.wikipedia.org/wiki/Adjacency_list) `alist`
that describes an undirected graph, return a string of `width` rows by `height`
columns that renders the graph in a fixed-width font.

# install

For the library, With [npm](https://npmjs.org) do:

```
npm install undirender
```

For the cli, do:

```
npm install -g undirender
```

# license

MIT
