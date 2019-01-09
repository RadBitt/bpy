import React from 'react';
import moment from 'moment';
import getMDR from './helpers';

class Calendar extends React.Component {
	
	state = {
		moment: moment([2019, 1]),
		vessels: {},
		charters: [],
		classes: [],
	}

	render() {
		const dateObj = moment(this.state.moment);
		const dates = getMDR(dateObj.year(), dateObj.month());
		const calendarDays = []; 
		let dateString = '';
		let dateId = '';

		for(let i = dates.start; i <= dates.end; i++) {
			dateString = dateObj.format('D');
			dateId = dateObj.format('M-D-YYYY');
			calendarDays.push(<th id={dateId}>{dateString}</th>);
			dateObj.add(1, 'day');
		}

		return(
			<table className="table">
				<thead className="thead thead-dark">
					<tr>
					<th>{this.state.moment.format('MMMM')}</th>
					{calendarDays}
					</tr>
				</thead>
				<tbody>
					
				</tbody>
				
			</table>
		);
	}
}

export default Calendar;