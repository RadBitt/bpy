import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const SINGLE_QUOTE_QUERY = gql`
	query SINGLE_QUOTE_QUERY($id: ID!) {
		quote(where: {id: $id}) {
			user
			vessel
			charterStartDate
			charterEndDate
			totalPrice
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
						return <p>Single Quote</p>
					}
				}
			</Query>
		);
	}
}

export default SingleQuote