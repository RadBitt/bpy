import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';

const ALL_USERS_QUERY = gql`
	query ALL_USERS_QUERY {
		users {
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

class Users extends React.Component {
	render() {
		return (
			<div className="container">
				<Query query={ALL_USERS_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<h2>Clients</h2>
						<p><Link href="/newUser"><a>Create a new client</a></Link></p>
						<table className="table table-striped users-table">
							<thead className="thead-dark">
								<tr>
									<th>+</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Phone</th>
									<th>Email</th>
									<th>City</th>
									<th>State</th>
									<th>Zip</th>
								</tr>
							</thead>
							<tbody>
							{data.users.map(user => 
								<tr 
								users={user} 
								key={user.id}>
								<td><Link href={{
									pathname: '/user',
									query: {id: user.id}
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

export default Users