import React from 'react';
import SearchInvoicesResults from '../components/SearchInvoicesResults';
import SearchInvoicesForm from '../components/SearchInvoicesForm';
import Link from 'next/link';

class SearchInvoices extends React.Component {

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

		let searchSwitch = <SearchInvoicesForm handleSubmit={this.handleSubmit}/>

		if (this.state.search) 
			searchSwitch = <SearchInvoicesResults
								id={this.props.query.id} 
								searchTerm={this.state.searchTerm}
								resetSearch={this.resetSearch}
							/>

		return(
			<div className="container">
				<h2>Search Invoices</h2>
				{searchSwitch}
			</div>
		);
	}
}

export default SearchInvoices