import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import formatMoney from '../lib/formatMoney'; 

const ALL_QUOTES_QUERY = gql`
	query ALL_QUOTES_QUERY {
		quotes {
		id
		clientName
		vesselId
		charterStartDate
		charterEndDate
	    totalPrice
	  }
	}
`;

class Quotes extends React.Component {
	render() {
		return (
			<div className="container">
				<p>Hey! This is a list of Quotes. <Link href="/newQuote"><a>Create a new quote</a></Link></p>
				<Query query={ALL_QUOTES_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <table className="table table-striped quotes-table">
							<thead className="thead-dark">
								<tr>
									<th>Quote ID</th>
									<th>Client Name</th>
									<th>Vessel Id</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Total Price</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
							{data.quotes.map(quote => 
								<tr 
								Quotes={quote} 
								key={quote.id}>
								<td><Link href={{
									pathname: '/quote',
									query: {id: quote.id}
								}}><a>{quote.id}</a></Link></td>
								<td>{quote.clientName}</td>
								<td>{quote.vesselId}</td>
								<td>{quote.charterStartDate}</td>
								<td>{quote.charterEndDate}</td>
								<td>{formatMoney(quote.totalPrice)}</td>
								<td><Link href={{
									pathname: 'update', query: {id: quote.id}}}><a>edit</a></Link></td>
								<td><Link href={{pathname: 'update', query: {id: quote.id}}}><a>delete</a></Link></td>
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

export default Quotes