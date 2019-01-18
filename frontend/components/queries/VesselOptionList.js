import React from 'react';
import { Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';

const ALL_VESSELS_QUERY = gql`
	query ALL_VESSELS_QUERY {
		vessels {
		id
		vesselName
	  }
	}
`;

class VesselOptionList extends React.Component {

	render() {
		return(
			<Query query={ALL_VESSELS_QUERY}>
				{({data, error, loading}) => {
					if(loading) return <p>Loading...</p>
					if(error) return <p>Error: {error.message}</p>
					return <select 
						className={this.props.className}
				    	id={this.props.id}
				    	name={this.props.vesselName}
				    	required
				    	value={this.props.value}
				    	onChange={this.props.onChange}
				    >
						{data.vessels.map(vessel => 
							<option key={vessel.id} value={vessel.id}>{vessel.vesselName}</option>
						)}
					</select>
				}}
			</Query>
		);
	}

}

export default VesselOptionList;