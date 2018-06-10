var React = require('react');
var { Link } = require('react-router-dom');

var Menu = React.createClass({
	render(){
		return (
			<div className="navbar navbar-inverse navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand">My Application</a>
					</div>
					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/articles">Articles</Link></li>
						</ul>
					</div>
				</div>
			</div>		
		);
	}
});

module.exports = Menu;