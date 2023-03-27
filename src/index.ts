

import { Plane } from "./utils/Plane";
import { IVector, Vector } from "./utils/Vector";
import { PointList } from "./utils/PointList";
import { style } from "./utils/Style";
import { data } from "./utils/Data";
import { Timer } from "./utils/Timer";

document.head.innerHTML += style;

let current = 0;
let pCloud = new PointList(genCloud(data[current]));

const plane = new Plane();

function genCloud(arr: Array<IVector>) {

	const hSpan = {min: Infinity, max: 0, len: 0};
	const vSpan = {min: Infinity, max: 0, len: 0};

	arr.forEach(value => {
		if(value.x < hSpan.min) hSpan.min = value.x;
		if(value.y < vSpan.min) vSpan.min = value.y;

		if(value.x > hSpan.max) hSpan.max = value.x;
		if(value.y > vSpan.max) vSpan.max = value.y;
	});
	hSpan.len = hSpan.max - hSpan.min;
	vSpan.len = vSpan.max - vSpan.min;

	const vArr = [];
	for(const v of arr) {
		vArr.push(new Vector(v.x - hSpan.min + (window.innerWidth - hSpan.len) * 0.5, v.y - vSpan.min + (window.innerHeight - vSpan.len) * 0.5));
	}
	return vArr;
}

function update() {
	Timer.tick();
	plane.update();

	pCloud.checkCollision(plane.position, 25, () => {
		pCloud.remove();
		current = (current+1) % data.length;
		pCloud = new PointList(genCloud(data[current]));
	});

	requestAnimationFrame(update);
}
requestAnimationFrame(update);

