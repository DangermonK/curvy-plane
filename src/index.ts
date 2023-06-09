

import { Plane } from "./utils/Plane";
import { PointList } from "./utils/PointList";
import { data } from "./utils/Data";
import { Timer } from "./utils/Timer";
import { Vector } from "./utils/Vector";
import "../style.css";

const keyIcon = require('../keys.svg');

class Game {

	private plane: Plane;
	private line: PointList;
	private currentLine: number = 0;
	private data: Array<Array<Vector>>;

	private updateFallback: Function;

	private tutorialIcon: any = null;

	private tutorial = {
		up: false,
		down: false,
		left: false,
		right: false
	}

	constructor(data: Array<Array<Vector>>) {

		this.plane = new Plane();
		this.data = data;

		this.plane.setClickListener(this.start.bind(this));
	}

	start() {
		document.body.style.overflow = 'hidden';
		document.getElementsByClassName('c-notfound')[0]?.classList.add('cp-fade-out');
		window.scrollTo({top: 0, behavior: 'smooth'});

		setTimeout(() => {
			this.tutorialIcon = document.createElement('img');
			this.tutorialIcon.src = keyIcon;
			this.tutorialIcon.classList.add('key-svg', 'cp-element');
			document.body.appendChild(this.tutorialIcon);

			window.addEventListener('keyup', this.trackUpKey.bind(this));
			this.plane.setClickListener(this.stop.bind(this));

			this.updateFallback = this.introUpdate;

			requestAnimationFrame(this.update.bind(this));
		}, 1000);
	}

	stop() {
		document.body.style.overflow = null;
		document.getElementsByClassName('c-notfound')[0]?.classList.remove('cp-fade-out');
		for(const el of Array.from(document.getElementsByClassName('cp-element'))) {
			el.remove();
		}
		this.update = () => {};
	}

	trackUpKey(event: KeyboardEvent) {
		switch (event.code) {
			case 'ArrowLeft':
				this.tutorial.left = true;
				break;
			case 'ArrowRight':
				this.tutorial.right = true;
				break;
			case 'ArrowUp':
				this.tutorial.up = true;
				break;
			case 'ArrowDown':
				this.tutorial.down = true;
				break;
		}
	}

	gameUpdate() {
		this.line.checkCollision(this.plane.position, 30, () => {
			this.currentLine = (this.currentLine+1) % this.data.length;
			this.line = new PointList(this.data[this.currentLine]);
		});
	}

	emptyUpdate() {

	}

	introUpdate() {

		if(this.tutorial.left && this.tutorial.right && this.tutorial.up && this.tutorial.down) {
			setTimeout(() => {
				this.line = new PointList(this.data[this.currentLine]);
				this.updateFallback = this.gameUpdate;
				this.tutorialIcon.remove();
			}, 2000);
			this.updateFallback = this.emptyUpdate;
			setTimeout(() => {this.tutorialIcon.classList.add('fade-out');}, 1000);
		}

	}

	update() {
		Timer.tick();
		this.plane.update();

		this.updateFallback();

		requestAnimationFrame(this.update.bind(this));
	}

}

if(!('ontouchstart' in window))
	new Game(data);
