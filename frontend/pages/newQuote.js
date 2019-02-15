import React from 'react';
import CreateQuote from '../components/CreateQuote';
import moment from 'moment';

class NewQuote extends React.Component {
	render() {
		let vesselId, date, quoteCondition, charterStartDate, charterEndDate;
		if(this.props.query.vessel && this.props.query.date) {
			vesselId = this.props.query.vessel;
			date= this.props.query.date;
			charterStartDate = moment().dayOfYear(date);
			charterEndDate = moment().dayOfYear(date);
			quoteCondition = <CreateQuote vesselId={vesselId} startDate={charterStartDate._d} endDate={charterEndDate._d}/>;
		} else 
		quoteCondition = <CreateQuote vesselId='' startDate={moment()._d} endDate={moment()._d} />;
		return (
			<div className="container">
				{quoteCondition}
			</div>
		);
	}
}

export default NewQuote;