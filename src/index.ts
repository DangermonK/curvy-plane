

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
	const vArr = [];
	for(const v of arr) {
		vArr.push(new Vector(v.x + 400, v.y + 100));
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

