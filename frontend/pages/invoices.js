import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import formatMoney from '../lib/formatMoney'; 

const ALL_INVOICES_QUERY = gql`
	query ALL_INVOICES_QUERY {
		invoices {
		id
		user {
			firstName
			lastName
		}
		vessel {
			vesselName
		}
		charterStartDate
		charterEndDate
	    totalPrice
	  }
	}
`;

class Invoices extends React.Component {
	render() {
		return (
			<div className="container">
				<Query query={ALL_INVOICES_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<h2>Invoices</h2>
						<ul className="list-inline">
							<li><Link href="/searchInvoices"><a>Search for an invoice</a></Link></li>
						</ul>
						<table className="table table-striped">
							<thead className="thead-dark">
								<tr>
									<th>+</th>
									<th>Client</th>
									<th>Vessel</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Total Price</th>
								</tr>
							</thead>
							<tbody>
							{data.invoices.map(invoice => 
								<tr 
								invoice={invoice} 
								key={invoice.id}>
								<td><Link href={{
									pathname: '/invoice',
									query: {id: invoice.id}
								}}><a>+</a></Link></td>
								<td>{invoice.user.firstName} {invoice.user.lastName}</td>
								<td>{invoice.vessel.vesselName}</td>
								<td>{invoice.charterStartDate}</td>
								<td>{invoice.charterEndDate}</td>
								<td>{formatMoney(invoice.totalPrice)}</td>
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

export default Invoices