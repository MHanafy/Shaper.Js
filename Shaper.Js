//This is a simple JS library for drawing basic shapes on canvases
//The code shows how to use a Canvas for drawing, and some interesting math involved in drawing basic shapes

var Shaper = function (canvasId) {

    var that = {};
    var canvas = document.getElementById(canvasId);
    var owner = canvas.parentElement;
    //Expand the canvas to fill parent div.
    canvas.height = owner.clientHeight;
    canvas.width = owner.clientWidth;

    var ctx2D = canvas.getContext("2d");

    var supportedShapes = ["isosceles triangle",
        "square",
        "scalene triangle",
        "parallelogram",
        "equilateral triangle",
        "pentagon",
        "rectangle",
        "hexagon",
        "heptagon",
        "octagon",
        "circle",
        "oval"];

    var keyWords = ["Draw", "With", "radius", "side length", "width", "height"];

    that.reset = function() {
        ctx2D.setTransform(1, 0, 0, 1, 0, 0);
        ctx2D.fillStyle = '#f7fcff';
        ctx2D.fillRect(0, 0, canvas.width, canvas.height);
        ctx2D.fillStyle = "black";
    };

    that.error = function(error) {
        that.reset();
        ctx2D.font = "12px Arial";
        ctx2D.fillText(error, 10, 50);
    }

    that.drawRectangle = function (measures) {
        if (!measures.width || !measures.height) {
            that.error("You must specify the width and height of the oval!");
            return;
        }

        var width = measures.width;
        var height = measures.height;
        that.reset();
        //Drawing at the center
        ctx2D.translate((canvas.width - width) / 2, (canvas.height - height) / 2);
        ctx2D.strokeRect(0, 0, width, height);
    }

    that.drawAgon = function(type, measures) {

        if (!measures["side length"]) {
            that.error("You must specify the side length of the " + type + "!");
            return;
        }
        var sides;
        switch (type) {
        case "square":
            sides = 4;
            break;
        case "pentagon":
            sides = 5;
            break;
        case "hexagon":
            sides = 6;
            break;
        case "heptagon":
            sides = 7;
            break;
        case "octagon":
            sides = 8;
            break;
        default:
            sides = 4;
        }

        //Calculation references
        // https://www.mathsisfun.com/geometry/interior-angles-polygons.html
        // https://rechneronline.de/pi/heptagon.php
        // https://stackoverflow.com/questions/22977372/js-canvas-draw-line-at-a-specified-angle
        // https://en.wikipedia.org/wiki/Pentagon

        var sideLength = measures["side length"];
        var height = sideLength / (2 * Math.tan(Math.PI / 2 / sides));

        that.reset();
        var x = 0, y = 0;
        var internalAngle = ((sides - 2) * 180) / sides;
        var angle = 180 - internalAngle;
        var angleRadian = angle * (Math.PI / 180);
        var cAngle = angleRadian;
        ctx2D.beginPath();
        //Drawing at the center
        ctx2D.translate((canvas.width + height) / 2, (canvas.height - height) / 2);
        ctx2D.moveTo(0, 0);
        for (var i = 1; i <= sides; i++) {
            x += sideLength * Math.cos(cAngle);
            y += sideLength * Math.sin(cAngle);
            ctx2D.lineTo(x, y);
            cAngle += angleRadian;
        }
        ctx2D.stroke();
    };

    that.drawParallelogram = function(measures, angle) {
        if (!measures.width || !measures.height) {
            that.error("You must specify the width and height of the parallelogram!");
            return;
        }
        if (!angle) angle = 30;
        var angleRadian = angle * (Math.PI / 180);
        var width = measures.width;
        var height = measures.height;
        var diff = Math.tan(angleRadian) * width;

        that.reset();
        ctx2D.beginPath();
        //Drawing at the center
        ctx2D.translate((canvas.width - width) / 2 + diff/2, (canvas.height - height) / 2);
        ctx2D.moveTo(0, 0);
        ctx2D.lineTo(width, 0);
        ctx2D.lineTo(width - diff, height);
        ctx2D.lineTo(0 - diff, height);
        ctx2D.lineTo(0, 0);
        ctx2D.stroke();
    };

    that.drawTriangle = function (type, measures) {

        if (!measures.width || !measures.height) {
            that.error("You must specify the width and height of the triangle!");
            return;
        }

        var width = measures.width;
        var height = measures.height;

        that.reset();

        var pointA, pointB, pointC;
        switch (type) {
            //equilateral: three equal sides, isosceles: two equal sides
            //Both are drawn in the same way since we don't need to calculate sides.
            case "equilateral":
            case "isosceles":
                //Ignore the height, otherwise might not be equilateral
                pointA = { x: width / 2, y: 0 };
                pointB = { x: 0, y: height };
                pointC = { x: width, y: height };
                break;
        default:
            //no equal sides - "scalene"
            pointA = { x: 0, y: 0 };
            pointB = { x: 0, y: height };
            pointC = { x: width, y: height };
        }

        ctx2D.beginPath();
        //Drawing at the center
        ctx2D.translate((canvas.width - width)/2, (canvas.height - height) /2);
        ctx2D.moveTo(pointA.x, pointA.y);
        ctx2D.lineTo(pointB.x, pointB.y);
        ctx2D.lineTo(pointC.x, pointC.y);
        ctx2D.lineTo(pointA.x, pointA.y);
        ctx2D.stroke();
    }

    //Below Ellipse functions are copied from https://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
    var drawEllipse = function (ctx, x, y, w, h) {
        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

        ctx.stroke();
    }

    var drawEllipseByCenter = function (ctx, cx, cy, w, h) {
        drawEllipse(ctx, cx - w / 2.0, cy - h / 2.0, w, h);
    }

    that.drawOval = function (measures) {

        if (!measures.width || !measures.height) {
            that.error("You must specify the width and height of the oval!");
            return;
        }

        that.reset();
        drawEllipseByCenter(ctx2D, canvas.width / 2, canvas.height / 2, measures.width, measures.height);
    }

    that.drawCircle = function (measures) {

        if (!measures.radius) {
            that.error("You must specify the radius of the circle!");
            return;
        }

        var radius = measures.radius;
        that.reset();
        ctx2D.beginPath();
        //Drawing at the center
        ctx2D.arc(canvas.width / 2, canvas.height / 2, radius/2, 0, Math.PI * 2, true);
        ctx2D.stroke();
    }

    that.keyWords = function () {
        return keyWords.concat(supportedShapes);
    }();

    that.draw = function (shape, measures) {
        if (supportedShapes.indexOf(shape) === -1) {
            that.error("Unsupported Shape: " + shape);
            return;
        }
        switch (shape) {
            case "isosceles triangle":
            case "scalene triangle":
            case "equilateral triangle":
                that.drawTriangle(shape.substr(0, shape.indexOf("triangle") -1), measures);
                break;
            case "circle":
                that.drawCircle(measures);
                break;
            case "oval":
                that.drawOval(measures);
                break;
            case "square":
            case "pentagon":
            case "hexagon":
            case "heptagon":
            case "octagon":
                that.drawAgon(shape, measures);
                break;
            case "rectangle":
                that.drawRectangle(measures);
                break;
            case "parallelogram":
                that.drawParallelogram(measures);
                break;
            default:
                that.error("Sorry, Feature isn't yet implemented! shape = " + shape);
        }
    }

    return that;
};