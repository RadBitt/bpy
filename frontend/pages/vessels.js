import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import Link from 'next/link';
import formatMoney from '../lib/formatMoney'; 

const ALL_VESSELS_QUERY = gql`
	query ALL_VESSELS_QUERY {
		vessels {
		id
		vesselName
		weekNightPrice
		weekendNightPrice
	  }
	}
`;

class Vessels extends React.Component {
	render() {
		return (
			<div className="container">
				<p>Hey! This is a list of vessels. <Link href="/newVessel"><a>Add a new vessel</a></Link></p>
				<Query query={ALL_VESSELS_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <table className="table table-striped invoices-table">
							<thead className="thead-dark">
								<tr>
									<th>Vessel ID</th>
									<th>Vessel Name</th>
									<th>Week Night Price</th>
									<th>Weekend Night Price</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
							{data.vessels.map(vessel => 
								<tr 
								vessel={vessel} 
								key={vessel.id}>
								<td><Link href={{
									pathname: '/vessel',
									query: {id: vessel.id}
								}}><a>{vessel.id}</a></Link></td>
								<td>{vessel.vesselName}</td>
								<td>{vessel.weekNightPrice}</td>
								<td>{vessel.weekendNightPrice}</td>
								<td><Link href={{
									pathname: 'update', query: {id: vessel.id}}}><a>edit</a></Link></td>
								<td><Link href={{pathname: 'update', query: {id: vessel.id}}}><a>delete</a></Link></td>
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

export default Vessels;