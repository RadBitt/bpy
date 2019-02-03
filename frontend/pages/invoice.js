import React from 'react';
import SingleInvoice from '../components/SingleInvoice';

class Invoice extends React.Component {
	render() {
		return(
			<div className="container">
				<SingleInvoice id={this.props.query.id} />
			</div>
		);
	}
}

export default Invoice