import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import formatMoney from '../lib/formatMoney'; 

const ALL_INVOICES_QUERY = gql`
	query ALL_INVOICES_QUERY {
		invoices {
		id
		clientName
		charterStartDate
		charterEndDate
	    vesselName
	    totalPrice
	  }
	}
`;

class Invoices extends React.Component {
	render() {
		return (
			<div className="container">
				<p>Hey! This is a list of invoices. <Link href="/newInvoice"><a>Create a new invoice</a></Link></p>
				<Query query={ALL_INVOICES_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <table className="table table-striped invoices-table">
							<thead className="thead-dark">
								<tr>
									<th>Invoice ID</th>
									<th>Client Name</th>
									<th>Vessel Name</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Total Price</th>
									<th>Edit</th>
									<th>Delete</th>
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
								<td>{invoice.clientName}</td>
								<td>{invoice.vesselName}</td>
								<td>{invoice.charterStartDate}</td>
								<td>{invoice.charterEndDate}</td>
								<td>{formatMoney(invoice.totalPrice)}</td>
								<td><Link href={{
									pathname: 'update', query: {id: invoice.id}}}><a>edit</a></Link></td>
								<td><Link href={{pathname: 'update', query: {id: invoice.id}}}><a>delete</a></Link></td>
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

export default Invoices