import { IVector, Vector } from "./Vector";

export interface IPoint {
	hit: boolean;
	position: Vector;
}

export class SVGRenderer {

	private readonly _svgElement: SVGElement;
	private readonly _svgPolylineElement: SVGPolylineElement;
	private readonly _dashedSvgPolylineElement: SVGPolylineElement;

	private readonly _points: Array<string>;

	constructor(points: Array<IVector>) {

		const startVector = Vector.subtract(new Vector(points[0].x, points[0].y), new Vector(points[1].x, points[1].y)).normalized;
		const scale = 5;
		const p1 = (points[0].x + startVector.normal.x * scale) + ',' + (points[0].y + startVector.normal.y * scale);
		const p2 = (points[0].x - startVector.normal.x * scale) + ',' + (points[0].y - startVector.normal.y * scale);

		this._points = points.map(p => p.x + ',' + p.y);

		this._svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		const startLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
		startLine.classList.add('dashed');
		startLine.setAttribute('points', p1 + ' ' + p2);

		this._svgPolylineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
		this._svgPolylineElement.classList.add('stroke');

		this._dashedSvgPolylineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
		this._dashedSvgPolylineElement.classList.add('dashed');
		this._dashedSvgPolylineElement.setAttribute('points', this.getPointString());

		this._svgElement.appendChild(this._dashedSvgPolylineElement);
		this._svgElement.appendChild(this._svgPolylineElement);
		this._svgElement.appendChild(startLine);

		document.body.appendChild(this._svgElement);

	}

	failedTrack(): Promise<null> {
		this._svgPolylineElement.classList.add('failed', 'fade-out');
		return new Promise(res => {
			setTimeout(() => {
				this._svgPolylineElement.classList.remove('failed', 'fade-out');
				res(null);
			}, 400);
		});
	}

	wonTrack(): Promise<null> {
		this._svgPolylineElement.classList.add('win');
		return new Promise(res => {
			setTimeout(() => {
				this._svgElement.classList.add('fade-out');
				setTimeout(() => {
					this._svgElement.classList.remove('fade-out');
					this._svgPolylineElement.classList.remove('win');
					res(null);
				}, 1000);
			}, 500);
		});
	}

	remove() {
		this._svgElement.remove();
	}

	interpolateLine(to: number): void {
		this._svgPolylineElement.setAttribute('points', this.getPointString(to));
	}

	private getPointString(cut: number = this._points.length): string {
		return this._points.slice(0, Math.min(this._points.length, cut)).join(' ');
	}

}

export class PointList {

	private readonly _list: Array<IPoint>;
	private _current: number = 0;
	private _solved: boolean = false;

	private _svgRenderer: SVGRenderer;

	constructor(list: Array<Vector>) {
		this._list = list.map(v => {
			return {
				hit: false,
				position: v
			}
		});

		this._svgRenderer = new SVGRenderer(list);
	}

	remove() {
		this._svgRenderer.remove();
	}

	reset() {
		this._solved = false;
		this._current = 0;
		this._svgRenderer.interpolateLine(0);
		for(const point of this._list) {
			point.hit = false;
		}
	}

	private checkIntersectionAt(index: number, vector: Vector, radius: number) {
		return Vector.subtract(vector, this._list[index].position).magnitude < radius;
	}

	checkCollision(vector: Vector, radius: number = 20, win: Function = () => {}) {
		if(this._solved)
			return;

		if(this.checkIntersectionAt(this._current, vector, radius)) {
			this._list[this._current].hit = true;

			if(this._current < this._list.length - 1) {
				if (this.checkIntersectionAt(this._current + 1, vector, radius)) {
					this._current++;
					this._svgRenderer.interpolateLine(this._current+1);
				}
			} else {
				this._solved = true;
				this._svgRenderer.wonTrack().then(() => {
					win();
				});
			}
		} else if(this._list[0].hit) {
			this._solved = true;
			this._svgRenderer.failedTrack().then(this.reset.bind(this));
		}
	}

}
