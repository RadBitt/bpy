import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import UserTableHead from './tableStateless/UserTableHead';

const SEARCH_USERS_QUERY = gql`
	query SEARCH_USERS_QUERY($searchTerm: String!) {
		users(where: {OR: 
			[
				{firstName_contains: $searchTerm}, 
				{lastName_contains: $searchTerm},
				{phone_contains: $searchTerm},
				{email_contains: $searchTerm}
			]
		}) 
		{
		id
		firstName
		lastName
		phone
		email
		city
		state
		zip
	  }
	}
`;

class SearchUsersResults extends React.Component {
	render() {
		return (
			<div>
				<Query 
					query={SEARCH_USERS_QUERY}
					variables={{
						searchTerm: this.props.searchTerm
					}}
				>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<p>The client(s} below matched your input. <button onClick={this.props.resetSearch}>Search Again</button></p>

						<table className="table table-striped">
							<thead className="thead-dark">
								<UserTableHead />
 							</thead>
							<tbody>
							{data.users.map(user => 
								<tr 
								user={user} 
								key={user.id}>
								<td><Link href={{
									pathname: '/newInvoiceFromQuote',
									query: {id: user.id, quote: this.props.id}
								}}><a>+</a></Link></td>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.phone}</td>
									<td>{user.email}</td>
									<td>{user.city}</td>
									<td>{user.state}</td>
									<td>{user.zip}</td>
								</tr>
							)}
							</tbody>
						</table>
						</div>
					}}
				</Query>
			</div>
		);
	}
}

export default SearchUsersResults