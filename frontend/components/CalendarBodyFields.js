import React from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Query } from 'react-apollo';
import CalendarVesselRow from './CalendarVesselRow';

const MONTH_INVOICES_QUERY = gql`
	query MONTH_INVOICES_QUERY($yearMonth: String) {
		invoices(where: {charterStartDate_contains: $yearMonth}, orderBy: charterStartDate_ASC) {
		id
		vessel {
			vesselName
		}
		charterStartDate
		charterEndDate
	  }
	}
`;

class CalendarBodyFields extends React.Component {

	state = {
		vessels: {}
	}

	componentDidMount = () => {
		const vessels = {};
		this.props.vessels.map(vessel => 
			vessels[vessel.vesselName] = []
		);
		this.setState({ vessels }); 
	}
	
	addInvoiceToVessel = (data) => {
		const vessels = this.state.vessels;
		const invoices = data.invoices;
		invoices.map(invoice => 
			vessels[invoice.vesselName].push(invoice)
		);
		this.setState({ vessels }); 
	}

	render() {
		const vessels = this.state.vessels;
		console.log(vessels);
		const { month, moment } = this.props;
		const yearMonthString = moment.year() + '-' + moment.month();
		// console.log(yearMonthString);

		return(
			<Query 
				query={MONTH_INVOICES_QUERY}
				variables={{yearMonth: yearMonthString}}
			>
				{({data, error, loading}) => {
				if(loading) return <tbody><tr><td>Loading...</td></tr></tbody>
				if(error) return <tbody><tr><td>Error: {error.message}</td></tr></tbody>
				return <tbody>
					
					</tbody>
				}}
			</Query>
		);
	}
}

export default CalendarBodyFields


			
				