const canvas = document.getElementById("main-canvas");
const contxt = canvas.getContext("2d");
const brainrot_fill_color = "rgb(136, 32, 32)"
const education_fill_color = "rgb(76, 198, 76)"
const node_fill_color = "rgb(100,100,100)"
const edge_color = "rgb(0,0,0)"

function background_circle(ctx) {
	ctx.beginPath();
	ctx.moveTo(100,100);
	ctx.arc(100, 100, 100, 0, 2 * Math.PI);
	ctx.fillStyle = node_fill_color;
	ctx.fill();
}

function draw_split(ctx, angle_start, angle_end, color, draw_stroke) {
	ctx.beginPath();
	ctx.moveTo(100,100);
	ctx.arc(100, 100, 97, angle_start, angle_end);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

contxt.clearRect(0, 0, canvas.width, canvas.height);
background_circle(contxt);
draw_split(contxt, Math.PI / 2, 2 * Math.PI, education_fill_color, false);
draw_split(contxt, 0, Math.PI / 2, brainrot_fill_color, false);