import React from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Query } from 'react-apollo';
import CalendarYearsSelect from './CalendarYearsSelect';
import CalendarMonthsSelect from './CalendarMonthsSelect';
import CalendarHeaderFields from './CalendarHeaderFields';
import CalendarBodyFields from './CalendarBodyFields';
import getMDR from './helpers';

const ALL_VESSELS_QUERY = gql`
	query ALL_VESSELS_QUERY {
		vessels(orderBy: vesselName_ASC) {
		id
		vesselName
	  }
	}
`;

class Calendar extends React.Component {
	
	state = {
		moment: moment([2019, 1]),
	}

	handleMonthChange = e => {
		const { value } = e.target;
		const momentObj = this.state.moment;
		momentObj.month(value);
		this.setState({ moment: momentObj });
	}

	handleYearChange = e => {
		const { value } = e.target;
		const momentObj = this.state.moment;
		momentObj.year(value);
		this.setState({ moment: momentObj });
	}

	render() {

		const dateObj = moment(this.state.moment);
		const dates = getMDR(dateObj.year(), dateObj.month());

		return(
				<Query query={ALL_VESSELS_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Error: {error.message}</p>
						return <div>
						<h2>Calendar</h2>
						<div className="row">
							<div className="col-sm"></div>
							<div className="col-sm">
							<CalendarYearsSelect 
								year={this.state.moment.year()}
								handleYearChange={this.handleYearChange}
							/>
							<CalendarMonthsSelect 
								month={this.state.moment.month()}
								handleMonthChange={this.handleMonthChange}
							/>
							</div>
							<div className="col-sm"></div>
						</div>
						<table className="table">
							<CalendarHeaderFields 
								month={this.state.moment.format('MMMM')}
								dateObj={dateObj}
								dates={dates}
							/>
							<CalendarBodyFields 
								vessels={data.vessels}
								moment={this.state.moment}
							/>
						</table>
						</div>
					}}
				</Query>
		);
	}
}

export default Calendar;