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

info_time = parseInt(localStorage.getItem("infoTime"));
ent_time = parseInt(localStorage.getItem("entertainmentTime"));
if (info_time === null) {
	info_time = 1;
}
if (ent_time === null) {
	ent_time = 1;
}

let total_time = info_time + ent_time;
let info_fraction = info_time / total_time;
let ent_fraction = ent_time / total_time;

draw_split(contxt, Math.PI / 2 + (info_fraction * 2 * Math.Pi), (ent_fraction * 2 * Math.Pi), education_fill_color, false);
draw_split(contxt, (ent_fraction * 2 * Math.Pi), Math.PI / 2 + (info_fraction * 2 * Math.Pi), brainrot_fill_color, false);



/**
     * Listen for messages from the content script
     * (Used to recieve chart statistics)
     */
browser.runtime.onMessage.addListener((message) => {
	if (message.command === "chartStats") {

		console.log(`Info Time: ${message.infoTime}`);
		console.log(`Entertainment Time: ${message.entertainmentTime}`);

		localStorage.setItem("infoTime", message.infoTime);
		localStorage.setItem("entertainmentTime", message.entertainmentTime);
	}
  });