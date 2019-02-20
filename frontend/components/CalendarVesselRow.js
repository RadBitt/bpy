import React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Query } from 'react-apollo';
import moment from 'moment';
// import CalendarVesselDay from './CalendarVesselDay';

const MONTH_INVOICES_QUERY = gql`
	query MONTH_INVOICES_QUERY($yearString: String, $vesselId: ID) {
		invoices(where: {vessel: {id: $vesselId}, charterYear_contains: $yearString}, orderBy: charterStartDate_ASC) {
		id
		user {
			firstName
			lastName
		}
		vessel {
			vesselName
		}
		charterStartDate
		charterEndDate
	  }
	}
`;

class CalendarVesselRow extends React.Component {

	render() {

		const { month, dateObj, dates, vessel } = this.props
		const vesselName = vessel.vesselName;
		const calendarDays = []; 
		const invoices = [];
		let x, x2, y, lastInvoiceID, weekendClass;
		let g = 1;
		let dateString = '';
		let dateId = '';
		const yearString = dateObj.year();
		const groupedCharterClass = 'grouped-charter-invoice'

		// console.log(yearMonthString);
		// console.log(dateObj.date());

		return(
			<Query 
				query={MONTH_INVOICES_QUERY}
				variables={{yearString: yearString,
							vesselId: vessel.id}}
			>
				{({data, error, loading}) => {
					// console.log(data);
					// console.log(vessel.id);
					// console.log(yearMonthString);
					if(loading) return <tbody><tr><td>Loading...</td></tr></tbody>
					if(error) return <tbody><tr><td>Error: {error.message}</td></tr></tbody>
					else {	
						// arrange in array, 
						//indexed as day of the year
						for(let i = 0; i < data.invoices.length; i++){
							if (data.invoices[i].charterStartDate) {
								x = moment(data.invoices[i].charterStartDate).dayOfYear();
								x2 = moment(data.invoices[i].charterEndDate).dayOfYear();
								invoices[x] = data.invoices[i];
								if ((y = x2 - x) > 0) {
									for (let d = 1; d <= y; d++) {
										invoices[x+d] = data.invoices[i];
									}
								}
							}
						}
						// push to calendar days array, 
						//checking against indexed array above, 
						//and group same charters
						for(let i = dates.start; i <= dates.end; i++) {
							if (moment().dayOfYear(i).weekday() == 6 || moment().dayOfYear(i).weekday() == 0)
								weekendClass = 'weekend-day-blank';
							else
								weekendClass = 'week-day-blank';
							if (invoices[i]) {
								let string1 = invoices[i].user.firstName.substring(0,1)
								let string2 = invoices[i].user.lastName.substring(0,1)
								let initials = string1 + '. ' + string2 +'.';
								if (lastInvoiceID && lastInvoiceID.id == invoices[i].id) {
									calendarDays.pop();
									calendarDays.push(<td colSpan={g+1} className={groupedCharterClass} key={vesselName + '-' + i} id={vesselName + '-' + i}><Link href={{
										pathname: '/invoice',
										query: {id: invoices[i].id}
									}}><a>{initials}</a></Link></td>);
									g++;
								}
								else {
									calendarDays.push(<td className={groupedCharterClass} key={vesselName + '-' + i} id={vesselName + '-' + i}><Link href={{
										pathname: '/invoice',
										query: {id: invoices[i].id}
									}}><a>{initials}</a></Link></td>);
									g=1; 
								}
								lastInvoiceID = invoices[i];
							}
							else
								calendarDays.push(<td className={weekendClass} key={vesselName + '-' + i} id={vesselName + '-' + i}><Link href={{
										pathname: '/newQuote',
										query: {date: i, vessel: vessel.id}
									}}><a> - </a></Link></td>);
						}
						return <tr>
							<td>{vesselName}</td>
							{calendarDays}
						</tr>
					}
				}}
			</Query>
			
		);
	}
}

export default CalendarVesselRow