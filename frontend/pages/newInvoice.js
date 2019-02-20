import React from 'react';
import SingleUser from '../components/SingleUser';
import CreateInvoice from '../components/CreateInvoice';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'; 
import moment from 'moment';

const ALL_INVOICES_QUERY = gql`
	query ALL_INVOICES_QUERY($futureDates: String!) {
		invoices(where: {
			OR: [{charterStartDate_gte: $futureDates}]
		}){
			id
			vessel {
				id
				vesselName
			}
			charterStartDate
			charterEndDate
	  }
	}
`;

class NewInvoice extends React.Component {

	render() {

		let i, x, x2, y, d, vesselId, someStartDate, someEndDate, results;
		let vesselsObj = {}

		return (
			<Query 
				query={ALL_INVOICES_QUERY}
				variables={{
					futureDates: moment()._d,
				}}
			>
			{({data, error, loading}) => {
				if(loading) return <p>Loading...</p>
				if(error) return <p>Error: {error.message}</p>
				else {
					results = data.invoices;
					for (i = 0; i < results.length; i++) {
						if (results[i].charterStartDate) {
							someStartDate = moment(results[i].charterStartDate);
							someEndDate = moment(results[i].charterEndDate);
							x = someStartDate.dayOfYear();
							x2 = someEndDate.dayOfYear();
							if ((y = x2 - x) > 0) {
								for (let d = 0; d <= y; d++) {
									vesselId = results[i].vessel.id
									if (!vesselsObj[vesselId])
										vesselsObj[vesselId] = [];
									if (d == 0) {
										vesselsObj[vesselId].push(new Date(someStartDate._d));
										someStartDate.add(1, 'd');
									}
									else {
										vesselsObj[vesselId].push(new Date(someStartDate._d));
										someStartDate.add(1, 'd');
									}
								}
							} else {
								vesselsObj[vesselId].push(new Date(someStartDate._d));
							}
						}
					}
					return <div className="container">
					<SingleUser id={this.props.query.id} />
					<CreateInvoice 
						id={this.props.query.id}
						vesselsObj={vesselsObj}
					/>
				</div>
				}
			}}
			</Query>
			
		);
	}
}

export default NewInvoice;