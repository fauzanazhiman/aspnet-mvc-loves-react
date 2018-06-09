var React = require('react');
React.createClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

var App = React.createClass({
	render: () => {
		return (
			<h1>
				Halo dunia!
			</h1>			
		);
	}
});

ReactDOM.render(
	<App></App>
 ,
  document.getElementById('app')
);

