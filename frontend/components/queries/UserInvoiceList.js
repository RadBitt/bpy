import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Error from '../ErrorMessage';
import formatMoney from '../../lib/formatMoney'; 

const USER_INVOICES_QUERY = gql`
	query USER_INVOICES_QUERY($id: ID) {
		invoices(where: {user: {id: $id}}) {
			id
			vessel {
				vesselName
			}
			charterStartDate
			charterEndDate
			totalPrice
			user {
				firstName
				lastName
			}
		}
	}
`;


class UserInvoiceList extends React.Component {
	render() {
		return(
			<Query
				query={USER_INVOICES_QUERY}
				variables={{
					id: this.props.id,
				}}>
				{
					({error, loading, data}) => {
						if(error) return <Error error={error} />;
						if(loading) return <p>Loading...</p>;
						if(!data.invoices) return <p>No invoices found for {this.props.id}</p>
						return <div>
						<table className="table table-striped invoices-table">
							<thead className="thead-dark">
								<tr>
									<th>Invoice ID</th>
									<th>Vessel</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Total Price</th>
									<th>Edit</th>
								</tr>
							</thead>
							<tbody>
							{data.invoices.map(invoice => 
								<tr 
								invoices={invoice} 
								key={invoice.id}>
								<td><Link href={{
									pathname: '/invoice',
									query: {id: invoice.id}
								}}><a>{invoice.id}</a></Link></td>
								<td>{invoice.vessel.vesselName}</td>
								<td>{invoice.charterStartDate}</td>
								<td>{invoice.charterEndDate}</td>
								<td>{formatMoney(invoice.totalPrice)}</td>
								<td><Link href={{
									pathname: 'invoice', query: {id: invoice.id}}}><a>view</a></Link></td>
								</tr>
							)}
							</tbody>
						</table>
						</div>
					}
				}
			</Query>
		);
	}
}

export default UserInvoiceList