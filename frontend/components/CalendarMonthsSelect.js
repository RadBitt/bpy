import React from 'react';
import moment from 'moment';

class CalendarMonthsSelect extends React.Component {

	monthNames = [
		"January", 
		"February", 
		"March", 
		"April", 
		"May", 
		"June", 
		"July", 
		"August", 
		"September", 
		"October", 
		"November", 
		"December" 
	];

	render() {

		let options = [];
		const monthNames = this.monthNames;

		for (let i = 0; i < this.monthNames.length; i++) {
			options.push(<option key={monthNames[i]} id={i} value={i}>{monthNames[i]}</option>);
		}

		return(
			<select
				className='selectElement'
				defaultValue={this.props.month}
				onChange={this.props.handleMonthChange}
			>
				{options}
			</select>
		);
	}
}

export default CalendarMonthsSelect;