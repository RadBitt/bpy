import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const SINGLE_QUOTE_QUERY = gql`
	query SINGLE_QUOTE_QUERY($id: ID!) {
		quote(where: {id: $id}) {
			id
			tempName
			tempEmail
			charterStartDate
			charterEndDate
			totalPrice
			vessel {
				vesselName
			}
		}
	}
`;


class SingleQuote extends React.Component {
	render() {
		return(
			<Query
				query={SINGLE_QUOTE_QUERY}
				variables={{
					id: this.props.id,
				}}
			>
				{
					({error, loading, data}) => {
						if(error) return <Error error={error} />;
						if(loading) return <p>Loading...</p>;
						if(!data.quote) return <p>No quote found for {this.props.id}</p>
						return <div>
							<h2>Quote: {data.quote.id}</h2>
							<table className="table table-striped quotes-table">
							<thead className="thead-dark">
								<tr>
									<th>Quote Name</th>
									<th>Quote Email</th>
									<th>Quote Phone</th>
									<th>Vessel Name</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Total Price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{data.quote.tempName}</td>
									<td>{data.quote.tempEmail}</td>
									<td>{data.quote.tempPhone}</td>
									<td>{data.quote.vessel.vesselName}</td>
									<td>{data.quote.charterStartDate}</td>
									<td>{data.quote.charterEndDate}</td>
									<td>{data.quote.totalPrice}</td>
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

export default SingleQuote