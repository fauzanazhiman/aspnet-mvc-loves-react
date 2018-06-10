var React = require('react');
var {Link} = require('react-router-dom');
var {Helmet} = require('react-helmet');

var Articles = React.createClass({
	getInitialState(){
		//initial state
		return {
			isLoaded : false,
			isError : false,
			articleData : []
		};
	},
	
	componentDidMount(){
		//get article data from API
		fetch("/api/v1/getarticles")
			.then(res => res.json())
			.then(
			(result) => {
				this.setState({
					isLoaded: true,
					articleData: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					isError: true
				});
			}
		)
	},
	
	renderHead(title){
		return (
			<Helmet>
                <title>{title}</title>
            </Helmet>
		);
	},
	
	render(){
		if(!this.state.isLoaded){
			return (
				<main>
					{this.renderHead("Articles")}
					<h1>Articles</h1>
					<p>Loading...</p>
				</main>
			);
		}else if(this.state.isError){
			return (
				<main>
					{this.renderHead("Articles")}
					<h1>Articles</h1>
					<p>We can't retreive the articles data from server. Please try again later.. :(</p>
				</main>
			);			
		}else{
			return (
				<main>
					{this.renderHead("Articles")}
					<h1>Articles</h1>
					<ul>
						{this.state.articleData.map((_data, _index) => (
							<li key={_index}><Link to={"/articles/" + (_index + 1)}>{_data.Title}</Link></li>
						))}
					</ul>
				</main>
			);			
		}
	}
});

module.exports = Articles;