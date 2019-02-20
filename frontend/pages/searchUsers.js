import React from 'react';
import SearchUsersResults from '../components/SearchUsersResults';
import SearchUsersForm from '../components/SearchUsersForm';
import Link from 'next/link';

class SearchUsers extends React.Component {

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

		let searchSwitch = <SearchUsersForm handleSubmit={this.handleSubmit}/>

		if (this.state.search) 
			searchSwitch = <SearchUsersResults
								id={this.props.query.id} 
								searchTerm={this.state.searchTerm}
								resetSearch={this.resetSearch}
							/>

		return(
			<div className="container">
				<h2>Search Clients</h2>
				{searchSwitch}
			</div>
		);
	}
}

export default SearchUsers