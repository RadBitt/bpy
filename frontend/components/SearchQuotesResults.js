import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import QuoteTableHead from './tableStateless/QuoteTableHead';

const SEARCH_QUOTES_QUERY = gql`
	query SEARCH_QUOTES_QUERY($searchTerm: String!) {
		quotes(where: {OR: 
			[
				{tempName_contains: $searchTerm}, 
				{tempEmail_contains: $searchTerm},
				{tempPhone_contains: $searchTerm},
			]
		}){
		id
		tempName
		tempEmail
		tempPhone
		vessel {
			vesselName
		}
		charterStartDate
		charterEndDate
	    totalPrice
	  }
	}
`;

class SearchQuotesResults extends React.Component {
	render() {
		return (
			<div>
				<Query 
					query={SEARCH_QUOTES_QUERY}
					variables={{
						searchTerm: this.props.searchTerm
					}}
				>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<p>The quote(s} below matched your input. <button onClick={this.props.resetSearch}>Search Again</button></p>

						<table className="table table-striped">
							<thead className="thead-dark">
								<QuoteTableHead />
 							</thead>
							<tbody>
							{data.quotes.map(quote => 
								<tr 
								quote={quote} 
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
									<td>{quote.totalPrice}</td>
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

export default SearchQuotesResults