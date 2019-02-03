import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney'; 

const SINGLE_USER_QUERY = gql`
	query SINGLE_USER_QUERY($id: ID) {
		user(where: {id: $id}) {
			id
			firstName
			lastName
			phone
			email
			address1
			address2
			city
			state
			zip
		}
	}
`;


class SingleUser extends React.Component {
	render() {
		return(
			<Query
				query={SINGLE_USER_QUERY}
				variables={{
					id: this.props.id,
				}}
			>
				{
					({error, loading, data}) => {
						if(error) return <Error error={error} />;
						if(loading) return <p>Loading...</p>;
						if(!data.user) return <p>No user found for {this.props.id}</p>
						return <div>
						<table className="table table-striped invoices-table">
							<thead className="thead-dark">
								<tr>
									<th>Client Name</th>
									<th>Phone</th>
									<th>Email</th>
									<th>Address Ln1</th>
									<th>Address Ln2</th>
									<th>City</th>
									<th>State</th>
									<th>Zip</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{data.user.firstName} {data.user.lastName}</td>
									<td>{data.user.phone}</td>
									<td>{data.user.email}</td>
									<td>{data.user.address1}</td>
									<td>{data.user.address2}</td>
									<td>{data.user.city}</td>
									<td>{data.user.state}</td>
									<td>{data.user.zip}</td>
								</tr>
							</tbody>
						</table>
						</div>
					}
				}
			</Query>
		);
	}
}

export default SingleUser