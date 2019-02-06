import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const SINGLE_INVOICE_QUERY = gql`
	query SINGLE_INVOICE_QUERY($id: ID!) {
		invoice(where: {id: $id}) {
			id
			charterStartDate
			charterEndDate
			totalPrice
			user {
				firstName
				lastName
			}
			vessel {
				vesselName
			}
		}
	}
`;


class SingleInvoice extends React.Component {
	render() {
		return(
			<Query
				query={SINGLE_INVOICE_QUERY}
				variables={{
					id: this.props.id,
				}}
			>
				{
					({error, loading, data}) => {
						if(error) return <Error error={error} />;
						if(loading) return <p>Loading...</p>;
						if(!data.invoice) return <p>No invoice found for {this.props.id}</p>
						return <div>
							<h2>Invoice: {data.invoice.id}</h2>
							<table className="table table-striped invoices-table">
							<thead className="thead-dark">
								<tr>
									<th>Client</th>
									<th>Vessel</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Total Price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{data.invoice.user.firstName} {data.invoice.user.lastName}</td>
									<td>{data.invoice.vessel.vesselName}</td>
									<td>{data.invoice.charterStartDate}</td>
									<td>{data.invoice.charterEndDate}</td>
									<td>{data.invoice.totalPrice}</td>
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

export default SingleInvoice