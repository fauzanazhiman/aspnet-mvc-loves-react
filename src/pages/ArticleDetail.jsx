var React = require('react');
var PageNotFound = require('./PageNotFound');
var {Helmet} = require('react-helmet');

var ArticleDetail = React.createClass({
	getInitialState(){
		//initial state
		return {
			isLoaded : false,
			isError : false,
			articleData : null
		};
	},
	
	decodeContent(str){
		return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
	},
	
	createContentHtml() {
		return {__html: this.decodeContent(this.state.articleData.Content)};
	},
	
	componentDidMount(){
		//get article data from API
		fetch("/api/v1/getarticle/" + this.props.match.params.id)
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
					{this.renderHead("Loading...")}
					<h1>Loading...</h1>
					<p>Loading...</p>
				</main>
			);
		}else if(this.state.isError){
			return (
				<main>
					{this.renderHead("Oops!")}
					<h1>Oops</h1>
					<p>We can't retreive the articles data from server. Please try again later.. :(</p>
				</main>
			);			
		}else if(this.state.articleData == null){
			return <PageNotFound />;
		}else{
			return (
				<main>
					{this.renderHead(this.state.articleData.Title)}
					<h1>{this.state.articleData.Title}</h1>
					<p dangerouslySetInnerHTML={this.createContentHtml()}></p>
				</main>			
			);
		}
	}
});

module.exports = ArticleDetail;