export const style = '<style>\n' +
	'            .plane {\n' +
	'                position: fixed;\n' +
	'                background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/1016px-Plane_icon_nose_up.svg.png");\n' +
	'                background-size: contain;\n' +
	'\n' +
	'                transform: rotate(90deg);\n' +
	'\n' +
	'                z-index: 10000;\n' +
	'            }\n' +
	'\n' +
	'            @keyframes fadeIn {\n' +
	'                0% { opacity: 0; }\n' +
	'                100% { opacity: 1; }\n' +
	'            }\n' +
	'\n' +
	'            .cp-svg {\n' +
	'                animation: fadeIn 1s;\n' +
	'\n' +
	'                transition: 5s;\n' +
	'                opacity: 1;\n' +
	'\n' +
	'                width: 100vw;\n' +
	'                height: 100vh;\n' +
	'\n' +
	'                position: fixed;\n' +
	'                top: 0;\n' +
	'                left: 0;\n' +
	'\n' +
	'                pointer-events: none;\n' +
	'            }\n' +
	'\n' +
	'            .cp-svg polyline {\n' +
	'                stroke: #a6a7a6;\n' +
	'                fill: none;\n' +
	'            }\n' +
	'\n' +
	'            .cp-svg polyline.stroke {\n' +
	'                stroke-width: 3px;\n' +
	'                stroke: #c06;\n' +
	'                stroke-linecap: round;\n' +
	'            }\n' +
	'\n' +
	'            .cp-svg polyline.stroke.failed {\n' +
	'                stroke: #f00;\n' +
	'                stroke-width: 6px;\n' +
	'            }\n' +
	'\n' +
	'            .cp-svg polyline.stroke.win {\n' +
	'                stroke: #ffcc17;\n' +
	'                transition: 0.5s;\n' +
	'            }\n' +
	'\n' +
	'            .cp-svg polyline.dashed {\n' +
	'                stroke-dasharray: 10 10;\n' +
	'                stroke-width: 2px;\n' +
	'            }\n' +
	'\n' +
	'            .fade-out {\n' +
	'                opacity: 0;\n' +
	'                transition-delay: .6s;\n' +
	'                transition: 0.4s;\n' +
	'            }\n' +
	'\n' +
	'            .blur {\n' +
	'                filter: blur(5px);\n' +
	'            }\n' +
	'\n' +
	'        </style>'

