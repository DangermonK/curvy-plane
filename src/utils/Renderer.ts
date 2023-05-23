



export class Renderer {

	private readonly _canvas: HTMLCanvasElement;
	private readonly _graphics: CanvasRenderingContext2D;

	constructor() {
		this._canvas = document.createElement('canvas');
		this._canvas.classList.add('cp-svg');
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;

		this._graphics = this._canvas.getContext('2d');

		document.body.appendChild(this._canvas);
	}



}
