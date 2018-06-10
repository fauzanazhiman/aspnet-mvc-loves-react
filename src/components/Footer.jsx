var React = require('react');

var Footer = React.createClass({
	getCurrentYear(){
		var d = new Date();
		return d.getFullYear();
	},
	
	render(){
		return (
			<footer>
				<p>Copyright {this.getCurrentYear()} - My ASP.NET Application</p>
			</footer>
		);
	}
});

module.exports = Footer;