import React from 'react';
import moment from 'moment';

class CalendarHeaderFields extends React.Component {
	render() {
		const { month, dateObj, dates } = this.props
		const calendarDays = []; 
		let dateString = '';
		let dateId = '';

		for(let i = dates.start; i <= dates.end; i++) {
			dateString = dateObj.format('D');
			dateId = dateObj.format('M-D-YYYY');
			calendarDays.push(<th key={dateId} id={dateId}>{dateString}</th>);
			dateObj.add(1, 'day');
		}

		return(
			<thead className="thead thead-dark">
				<tr>
					<th>{month}</th>
					{calendarDays}
				</tr>
			</thead>
		);
	}
}

export default CalendarHeaderFields
