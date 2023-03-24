

export interface IVector {

	x?: number;
	y?: number;

}

export class Vector {

	private _x: number = 0;
	private _y: number = 0;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	set copy(v: IVector) {
		this._x = v.x || this._x;
		this._y = v.y || this._y;
	}

	set x(x: number) {
		this._x = x;
	}

	set y(y: number) {
		this._y = y;
	}

	get x(): number {
		return this._x;
	}

	get y(): number {
		return this._y;
	}

	add(x: number, y: number): void {
		this._x += x;
		this._y += y;
	}

	get magnitude(): number {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	}

	get normalized(): Vector {
		const stretch = 1 / (this.magnitude || 1);
		return new Vector(this._x * stretch, this._y * stretch);
	}

	get normal(): Vector {
		return new Vector(-this._y, this._x);
	}

	static scale(v: Vector, factor: number) {
		const stretch = factor / (v.magnitude || 1);
		return new Vector(v._x * stretch, v._y * stretch);
	}

	static add(v1: Vector, v2: Vector): Vector {
		return new Vector(v1._x + v2._x, v1._y + v2._y);
	}

	static subtract(v1: Vector, v2: Vector): Vector {
		return new Vector(v1._x - v2._x, v1._y - v2._y);
	}

}
