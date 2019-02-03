import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const SINGLE_INVOICE_QUERY = gql`
	query SINGLE_INVOICE_QUERY($id: ID!) {
		invoice(where: {id: $id}) {
			user
			vessel
			charterStartDate
			charterEndDate
			totalPrice
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
						return <p>Single Invoice</p>
					}
				}
			</Query>
		);
	}
}

export default SingleInvoice