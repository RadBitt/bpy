import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import InvoiceTableHead from './tableStateless/InvoiceTableHead';
import formatMoney from '../lib/formatMoney'; 

const SEARCH_INVOICES_QUERY = gql`
	query SEARCH_INVOICES_QUERY($searchTerm: String!) {
		invoices(where: {OR: 
			[
				{user: {firstName_contains: $searchTerm}}, 
				{user: {lastName_contains: $searchTerm}},
				{user: {phone_contains: $searchTerm}}, 
				{vessel: {vesselName_contains: $searchTerm}},
			]
		}){
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

class SearchInvoicesResults extends React.Component {
	render() {
		return (
			<div>
				<Query 
					query={SEARCH_INVOICES_QUERY}
					variables={{
						searchTerm: this.props.searchTerm
					}}
				>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<p>The invoice(s} below matched your input. <button onClick={this.props.resetSearch}>Search Again</button></p>

						<table className="table table-striped">
							<thead className="thead-dark">
								<InvoiceTableHead />
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

export default SearchInvoicesResults