var React = require('react');
var ReactDOM = require('react-dom');
var { BrowserRouter, Switch, Route } = require('react-router-dom');

React.createClass = require('create-react-class');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

//get widgets
var Menu = require('./components/menu');
var Footer = require('./components/footer');

//get pages
var Home = require('./pages/home');
var Articles = require('./pages/articles');
var ArticleDetail = require('./pages/ArticleDetail');
var PageNotFound = require('./pages/PageNotFound');

var App = React.createClass({
	render(){
		return (
			<div>
				<Menu />
				<div className="container body-content">
					<Switch>
					  <Route exact path='/articles/:id' component={ArticleDetail}/>
					  <Route exact path='/articles' component={Articles}/>
					  <Route exact path='/' component={Home}/>
					  <Route path='*' component={PageNotFound}/>
					</Switch>
					<hr />
					<Footer />
				</div>
			</div>
		);
	}
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
 ,
  document.getElementById('app')
);

