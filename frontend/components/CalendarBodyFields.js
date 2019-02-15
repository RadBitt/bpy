import React from 'react';
import CalendarVesselRow from './CalendarVesselRow';

class CalendarBodyFields extends React.Component {

	state = {
		vessels: {},
		// invoices: {}
	}

	// Maybe I dont need. 
	componentDidMount = () => {
		const vessels = {};
		this.props.vessels.map(vessel => 
			vessels[vessel.vesselName] = []
		);
		this.setState({ vessels }); 
	}
	
	// addInvoicesToState = (data) => {
	// 	const invoices = data.invoices;
	// 	invoices.map(invoice => 
	// 		vessels[invoice.vesselName].push(invoice)
	// 	);
	// 	this.setState({ invoices }); 
	// }

	render() {
		return(
			<tbody>
				{this.props.vessels.map(vessel => 
					<CalendarVesselRow 
						key={vessel.vesselName}
						vessel={vessel}
						dateObj={this.props.dateObj}
						dates={this.props.dates}
					/>
				)}
			</tbody>
		);
	}
}

export default CalendarBodyFields


			
				