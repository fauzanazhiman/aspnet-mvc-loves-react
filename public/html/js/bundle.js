webpackJsonp([0],{

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
React.createClass = __webpack_require__(9);
var ReactDOM = __webpack_require__(19);

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(
			'h1',
			null,
			'Halo dunia!'
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ })

},[410]);