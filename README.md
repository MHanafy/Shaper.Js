# Shaper
A JS library to draw shapes on a canvas, supports a myriad of shapes.

Usage is straight forward, Initalize the canvas and execute commands against it.

```JavaScript
var canvas = Shaper("canvasId");
var shape = "heptagon";
var measures = {"side length": 20};
canvas.draw(shape, measures);
```

Shaper has helper functions to find out about supported key words
```JavaScript
var keyWords = canvas.keyWords;
```

This library is just for fun, can be used to teach kids about shapes, or extended to draw interesting combined shapes.

Also, explore the sample web app, which utilizes RegEx to render shapes based on a natural language string.

Enjoy!