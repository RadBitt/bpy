import React from 'react';
import { Query } from 'react-apollo';
import QuoteTableHead from '../components/tableStateless/QuoteTableHead';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import formatMoney from '../lib/formatMoney'; 

const ALL_QUOTES_QUERY = gql`
	query ALL_QUOTES_QUERY {
		quotes {
		id
		tempName
		tempEmail
		vessel {
			vesselName
		}
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
				<Query query={ALL_QUOTES_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<h2>Quotes</h2>
						<ul className="list-inline">
							<li><Link href="/newQuote"><a>Create a new quote</a></Link></li>
							<li><Link href="/searchQuotes"><a>Search for a quote</a></Link></li>
						</ul>
						<table className="table table-striped quotes-table">
							<thead className="thead-dark">
								<QuoteTableHead />
							</thead>
							<tbody>
							{data.quotes.map(quote => 
								<tr 
								quotes={quote} 
								key={quote.id}>
								<td><Link href={{
									pathname: '/quote',
									query: {id: quote.id}
								}}><a>+</a></Link></td>
								<td>{quote.tempName}</td>
								<td>{quote.tempEmail}</td>
								<td>{quote.tempPhone}</td>
								<td>{quote.vessel.vesselName}</td>
								<td>{quote.charterStartDate}</td>
								<td>{quote.charterEndDate}</td>
								<td>{formatMoney(quote.totalPrice)}</td>
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

export default Quotes