import React from 'react'

class SearchUsersForm extends React.Component {

	render() {
		return(
			<form onSubmit={this.props.handleSubmit}>
				<div className="form-group">
				    <label htmlFor="tempName">Search by one of the following: First Name, Last Name, Phone Number, or Email</label>
				    <input 
					    type="text" 
					    className="form-control" 
					    id="searchInput"
					    name="searchInput"			
					    required
				    />
			 	</div>
			 	<input type="submit" value="Search" />
			</form>
		);
	}

}

export default SearchUsersForm;