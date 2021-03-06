import React from 'react';
import SingleQuote from '../components/SingleQuote';
import SearchUsersResults from '../components/SearchUsersResults';
import SearchUsersForm from '../components/SearchUsersForm';
import Link from 'next/link';

class Quote extends React.Component {

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
				<SingleQuote id={this.props.query.id} />
				<h5>Finalize this quote by adding a client below. 
				Once you choose a client, you will be directed to create a final invoice. 
				The information here will be carried on to it.</h5>
				{searchSwitch}
			</div>
		);
	}
}

export default Quote