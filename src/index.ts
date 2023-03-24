

import { Plane } from "./utils/Plane";
import { IVector, Vector } from "./utils/Vector";
import { IPoint, PointList, SVGRenderer } from "./utils/PointList";
import { data } from "./utils/Data";
import { Timer } from "./utils/Timer";


let pCloud = new PointList(genCloud(data[0]));
let current = 0;
function genCloud(arr: Array<IVector>) {
	const vArr = [];
	for(const v of arr) {
		vArr.push(new Vector(v.x + 300, v.y));
	}
	return vArr;
}

const plane = new Plane();



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

