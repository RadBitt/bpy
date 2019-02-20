import React from 'react';
import SearchQuotesResults from '../components/SearchQuotesResults';
import SearchQuotesForm from '../components/SearchQuotesForm';
import Link from 'next/link';

class SearchQuotes extends React.Component {

	state = {
		search: false,
		searchTerm: ''
	}

	handleSubmit = (e) => {
		e.persist();
		console.log(e);
		this.setState({
			search: true,
			searchTerm: e.target.searchInput.value
		})
	}

	resetSearch = (e) => {
		e.preventDefault();
		this.setState({
			search: false,
			searchTerm: ''
		});
	}

	render() {

		let searchSwitch = <SearchQuotesForm handleSubmit={this.handleSubmit}/>

		if (this.state.search) 
			searchSwitch = <SearchQuotesResults
								id={this.props.query.id} 
								searchTerm={this.state.searchTerm}
								resetSearch={this.resetSearch}
							/>

		return(
			<div className="container">
				<h2>Search Quotes</h2>
				{searchSwitch}
			</div>
		);
	}
}

export default SearchQuotes