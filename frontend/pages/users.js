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
				<p>Hey! This is a list of clients. <Link href="/newUser"><a>Create a new client</a></Link></p>
				<Query query={ALL_USERS_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <table className="table table-striped users-table">
							<thead className="thead-dark">
								<tr>
									<th>Client ID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Emaile</th>
									<th>City</th>
									<th>State</th>
									<th>Zip</th>
									<th>Edit</th>
									<th>Delete</th>
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
								}}><a>{user.id}</a></Link></td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
								<td>{user.city}</td>
								<td>{user.state}</td>
								<td>{user.zip}</td>
								<td><Link href={{
									pathname: 'update', query: {id: user.id}}}><a>edit</a></Link></td>
								<td><Link href={{pathname: 'update', query: {id: user.id}}}><a>delete</a></Link></td>
								</tr>
							)}
							</tbody>
						</table>
					}}
				</Query>
			</div>
		);
	}
}

export default Users