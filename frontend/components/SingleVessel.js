import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

const SINGLE_VESSEL_QUERY = gql`
	query SINGLE_VESSEL_QUERY($id: ID!) {
		vessel(where: {id: $id}) {
			vesselName
			weekNightPrice
			weekendNightPrice
		}
	}
`;


class SingleVessel extends React.Component {
	render() {
		return(
			<Query
				query={SINGLE_VESSEL_QUERY}
				variables={{
					id: this.props.id,
				}}
			>
				{
					({error, loading, data}) => {
						if(error) return <Error error={error} />;
						if(loading) return <p>Loading...</p>;
						if(!data.vessel) return <p>No vessel found for {this.props.id}</p>
						return <p>Single Vessel</p>
					}
				}
			</Query>
		);
	}
}