var SVGIcons = {
"seat-s-logo.svg": {
 draw: function(ctx){
ctx.save();
ctx.miterLimit=4;
// Don't override fillStyle and strokeStyle - use whatever is already set
ctx.beginPath();
ctx.moveTo(0,11.7);
ctx.bezierCurveTo(0.0,10.6,0.1,7.7,0.2,6.0);
ctx.bezierCurveTo(0.2,3.9,0.6,2.6,1.5,1.8);
ctx.bezierCurveTo(2.6,0.7,4.0,0.5,7.2,0.3);
ctx.bezierCurveTo(14.6,-0.2,22.1,-0.1,31.6,0.6);
ctx.bezierCurveTo(32.5,0.7,32.9,0.9,33.1,1.0);
ctx.bezierCurveTo(33.5,1.3,33.6,1.7,33.7,3.5);
ctx.bezierCurveTo(33.8,4.5,33.9,7.2,34.0,8.7);
ctx.bezierCurveTo(30.7,8.5,25.2,8.2,20.3,8.2);
ctx.bezierCurveTo(15.5,8.1,11.2,8.2,10.7,8.3);
ctx.bezierCurveTo(9.6,8.4,9.1,8.9,9.0,9.2);
ctx.lineTo(34,14.1);
ctx.lineTo(34,18);
ctx.lineTo(0,11.7);
ctx.closePath();
ctx.fill("evenodd");
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0,14);
ctx.lineTo(34,20.5);
ctx.bezierCurveTo(34.0,21.4,33.9,24.5,33.8,26.2);
ctx.bezierCurveTo(33.8,28.2,33.4,29.5,32.5,30.3);
ctx.bezierCurveTo(31.4,31.3,30.0,31.6,26.8,31.7);
ctx.bezierCurveTo(19.4,32.2,11.9,32.1,2.4,31.4);
ctx.bezierCurveTo(1.5,31.3,1.1,31.2,0.9,31.0);
ctx.bezierCurveTo(0.5,30.7,0.4,30.4,0.3,28.7);
ctx.bezierCurveTo(0.2,27.5,0.1,24.1,0.0,23.0);
ctx.bezierCurveTo(4.4,23.3,11.1,23.5,16.6,23.5);
ctx.bezierCurveTo(18.0,23.5,21.6,23.6,22.5,23.6);
ctx.bezierCurveTo(23.3,23.6,24.3,23.4,24.8,22.5);
ctx.lineTo(0,18.2);
ctx.lineTo(0,14);
ctx.closePath();
ctx.fill("evenodd");
ctx.stroke();
ctx.restore();
}
}
}