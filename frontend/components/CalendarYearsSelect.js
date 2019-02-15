import React from 'react';
import moment from 'moment';

class CalendarYearsSelect extends React.Component {

	startYear = 2010;
	upToYear = this.props.year + 3;

	render() {

		let options = [];

		for (let i = this.startYear; i < this.upToYear; i++) {
			options.push(<option key={i} id={i} value={i}>{i}</option>);
		}

		return(
			<select
				className='selectElement'
				defaultValue={this.props.year}
				onChange={this.props.handleYearChange}
			>
				{options}
			</select>
		);
	}
}

export default CalendarYearsSelect;