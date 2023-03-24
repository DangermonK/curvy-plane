
export class Timer {

	private static _dt: number =0;
	private static _lU: number =0;

	private constructor() {

	}

	static get deltaTime() {
		return this._dt;
	}

	static tick() {
		const now = Date.now();
		this._dt = 0.001*(now - this._lU);
		this._lU = now;
	}

}
