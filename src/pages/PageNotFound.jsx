var React = require('react');

var PageNotFound = React.createClass({
	render(){
		return (
			<div>
				<h1>Oops!</h1>
				<p>You've been lost. Please go away form page.</p>
			</div>
		);
	}
});

module.exports = PageNotFound;