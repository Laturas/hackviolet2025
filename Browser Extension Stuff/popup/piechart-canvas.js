const canvas = document.getElementById("main-canvas");
const contxt = canvas.getContext("2d");
const brainrot_fill_color = "rgb(160, 0, 0)"
const education_fill_color = "rgb(96, 154, 255)"
const node_fill_color = "rgb(100,100,100)"
const edge_color = "rgb(0,0,0)"

function get_times() {
	fetch("http://127.0.0.1:8000/", {
	  method: "GET",
	  headers: {
		"Content-type": "application/json; charset=UTF-8"
	  }
	}).then((response) => {
	  response.json().then((json_response) => {
		localStorage.setItem("infoTime", json_response.info);
		localStorage.setItem("entertainmentTime", json_response.entertain);
		console.log(json_response);
  
		info_time = parseInt(localStorage.getItem("infoTime"));
		ent_time = parseInt(localStorage.getItem("entertainmentTime"));
  
		chrome.tabs.sendMessage(tabs[0].id, {
		  command: "chartStats",
		  infoTime: response["info"],
		  entertainmentTime: response["entertainment"]
		});
	  });
	});
}
get_times()

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
//contxt.fillStyle = "rgb(255,50,50)";

if (info_time != info_time) {
	info_time = 1;
}
if (ent_time != ent_time) {
	ent_time = 1;
}

let total_time = info_time + ent_time;
let info_fraction = info_time / total_time;
let ent_fraction = ent_time / total_time;

// 0 -> 2pi * fraction
draw_split(contxt, 0, (info_fraction * 2 * Math.PI), education_fill_color, false);
draw_split(contxt, (info_fraction * 2 * Math.PI), 2*Math.PI, brainrot_fill_color, false);
//contxt.fillText(info_time, 100, 100);
//contxt.fillText(ent_time, 100, 50);



