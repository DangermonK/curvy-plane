import { IVector, Vector } from "./Vector";
import { Timer } from "./Timer";

export class Movable {

	private readonly _position: Vector;
	private readonly _velocity: Vector;

	private _speed: number;
	private readonly _angularSpeed: number;

	private _angle: number = 0;
	private _angularVelocity: number = 0;
	private _angularAcceleration: number = 0;

	constructor(x = 0, y = 0, speed = 2, angularSpeed = 1) {
		this._position = new Vector(x, y);
		this._velocity = new Vector(0, 0).normalized;
		this._speed = speed;
		this._angularSpeed = angularSpeed;
	}

	setAngularVelocity(v: number): void {
		this._angularAcceleration = v;
	}

	setSpeed(v: number): void {
		this._speed = v;
	}

	update() {
		this._angularVelocity += (this._angularAcceleration - this._angularVelocity) * 0.2;
		this._angle += this._angularVelocity * this._angularSpeed * Timer.deltaTime;	// todo: add delta time
		this._velocity.copy = new Vector(Math.cos(this._angle * Math.PI / 180), Math.sin(this._angle * Math.PI / 180)).normalized;

		this._position.add(this._velocity.x * this._speed * Timer.deltaTime, this._velocity.y * this._speed * Timer.deltaTime);	// todo: add delta time
	}

	get position(): Vector {
		return this._position;
	}

	get angle(): number {
		return this._angle;
	}

}

export class Plane extends Movable {

	private readonly _element: HTMLElement;
	private readonly _shadow: HTMLElement;

	private _altitude: number = 40;
	private _radius: number = 20;

	private _boundingBox: IVector = new Vector(0, 0);

	constructor() {
		super(window.innerWidth * 0.5, window.innerHeight * 0.5, 150, 100);

		this._element = document.createElement('div');
		this._element.classList.add('plane');

		this._shadow = document.createElement('div');
		this._shadow.classList.add('plane', 'blur');

		document.body.appendChild(this._shadow);
		document.body.appendChild(this._element);

		window.addEventListener('keydown', this.handleKeyDown.bind(this));
		window.addEventListener('keyup', this.handleKeyUp.bind(this));

		this.updateTransform();
	}

	private handleKeyDown(event: KeyboardEvent) {
		switch (event.code) {
			case 'ArrowLeft':
				this.setAngularVelocity(-1);
				break;
			case 'ArrowRight':
				this.setAngularVelocity(1);
				break;
		}
	}

	private handleKeyUp(event: KeyboardEvent) {
		switch (event.code) {
			case 'ArrowLeft':
				this.setAngularVelocity(0);
				break;
			case 'ArrowRight':
				this.setAngularVelocity(0);
				break;
		}
	}

	private updatePositioning() {
		this._element.style.top = this.position.y + 'px';
		this._element.style.left = this.position.x + 'px';
		this._element.style.rotate = this.angle + 'deg';

		this._shadow.style.top = (this.position.y + this._altitude) + 'px';
		this._shadow.style.left = (this.position.x + this._altitude * 0.25) + 'px';
		this._shadow.style.rotate = this.angle + 'deg';
	}

	private updateTransform() {
		this._element.style.width = (this._radius * 2 + this._altitude * 0.25) + 'px';
		this._element.style.height = (this._radius * 2 + this._altitude * 0.25) + 'px';
		this._element.style.margin = -(this._radius + this._altitude * 0.125) + 'px';

		this._shadow.style.width = (this._radius * 2) + 'px';
		this._shadow.style.height = (this._radius * 2) + 'px';
		this._shadow.style.margin = -this._radius + 'px';
	}

	private calculateBoundingBox() {
		const mL = Math.min(this._element.offsetLeft, this._shadow.offsetLeft);
		const mT = Math.min(this._element.offsetTop, this._shadow.offsetTop);
		const mR = Math.max(this._element.offsetLeft + this._element.offsetWidth, this._shadow.offsetLeft + this._shadow.offsetWidth);
		const mB = Math.max(this._element.offsetTop + this._element.offsetHeight, this._shadow.offsetTop + this._shadow.offsetHeight);

		this._boundingBox.x = mR - mL;
		this._boundingBox.y = mB - mT;
	}

	update() {
		super.update();

		this.position.x = this.position.x < 0 ? this.position.x = window.innerWidth : this.position.x > window.innerWidth ? 0 : this.position.x;
		this.position.y = this.position.y < 0 ? this.position.y = window.innerHeight : this.position.y > window.innerHeight ? 0 : this.position.y;

		this.updatePositioning();
	}

}
